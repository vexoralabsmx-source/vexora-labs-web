-- Quick recovery for missing public.admin_dashboard_metrics() in Supabase (PGRST202).
-- Prefer running supabase/referrals.sql. Use this only if the dashboard metrics
-- RPC was accidentally removed after installing the affiliate schema.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  );
$$;

drop function if exists public.admin_dashboard_metrics();
drop function if exists public.admin_dashboard_metrics(integer);
drop function if exists public.admin_dashboard_metrics(bigint);
drop function if exists public.admin_dashboard_metrics(text);

create or replace function public.admin_dashboard_metrics()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Only admin can read dashboard metrics';
  end if;

  return jsonb_build_object(
    'profiles_count', (select count(*) from public.affiliate_profiles),
    'balance_pending_cents', (select coalesce(sum(referral_balance_cents), 0) from public.affiliate_profiles),
    'orders_pending_count', (select count(*) from public.affiliate_orders where status = 'pending_review'),
    'commissions_pending_count', (select count(*) from public.affiliate_commissions where status = 'pending'),
    'commissions_pending_cents', (select coalesce(sum(commission_cents), 0) from public.affiliate_commissions where status = 'pending'),
    'orders_total_count', (select count(*) from public.affiliate_orders)
  );
end;
$$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.admin_dashboard_metrics() to authenticated;

notify pgrst, 'reload schema';

-- Add your first admin by auth user id:
-- insert into public.admin_users(user_id, role)
-- values ('USER_ID_AQUI', 'owner')
-- on conflict (user_id) do update set role = excluded.role;
