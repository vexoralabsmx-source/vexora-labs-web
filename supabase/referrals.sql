-- Vexora Labs affiliate system.
-- Run this file in the Supabase SQL editor.
-- This script is designed for the current affiliate schema. If you already have
-- old referral tables with incompatible columns, back them up before running.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'owner', 'staff')),
  created_at timestamptz not null default now()
);

create table if not exists public.affiliate_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  invite_code text unique not null check (invite_code ~ '^VEX-[A-Z0-9]{2,16}-[0-9]{4}$'),
  referral_balance_cents integer not null default 0 check (referral_balance_cents >= 0),
  lifetime_earned_cents integer not null default 0 check (lifetime_earned_cents >= 0),
  payout_email text,
  payout_method text,
  status text not null default 'active' check (status in ('active', 'suspended', 'banned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.affiliate_referrals (
  id uuid primary key default gen_random_uuid(),
  affiliate_user_id uuid not null references auth.users(id) on delete cascade,
  referred_user_id uuid not null references auth.users(id) on delete cascade unique,
  invite_code text not null,
  status text not null default 'registered' check (status in ('registered', 'converted')),
  created_at timestamptz not null default now(),
  converted_at timestamptz
);

create table if not exists public.affiliate_orders (
  id uuid primary key default gen_random_uuid(),
  affiliate_user_id uuid not null references auth.users(id) on delete cascade,
  referred_user_id uuid references auth.users(id) on delete set null,
  invite_code text not null,
  invoice_id text unique not null,
  customer_name text,
  customer_contact text,
  customer_email text,
  service_name text not null,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'MXN',
  commission_rate numeric(5,4) not null default 0.2000 check (commission_rate >= 0.0100 and commission_rate <= 0.5000),
  commission_cents integer not null check (commission_cents >= 0),
  status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected', 'cancelled')),
  source text not null default 'affiliate_report' check (source in ('affiliate_report', 'admin_manual', 'admin_adjustment')),
  payment_method text,
  proof_url text,
  admin_notes text,
  rejection_reason text,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  rejected_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  rejected_by uuid references auth.users(id) on delete set null
);

create table if not exists public.affiliate_commissions (
  id uuid primary key default gen_random_uuid(),
  affiliate_user_id uuid not null references auth.users(id) on delete cascade,
  referred_user_id uuid references auth.users(id) on delete set null,
  order_record_id uuid references public.affiliate_orders(id) on delete set null,
  invoice_id text not null,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'MXN',
  commission_rate numeric(5,4) not null default 0.2000 check (commission_rate >= 0.0100 and commission_rate <= 0.5000),
  commission_cents integer not null check (commission_cents >= 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  source text not null check (source in ('affiliate_order', 'admin_manual')),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  paid_by uuid references auth.users(id) on delete set null
);

create table if not exists public.affiliate_payouts (
  id uuid primary key default gen_random_uuid(),
  affiliate_user_id uuid not null references auth.users(id) on delete cascade,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'MXN',
  method text,
  payout_email text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled')),
  reference text,
  notes text,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  paid_by uuid references auth.users(id) on delete set null
);

create table if not exists public.affiliate_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id) on delete set null,
  target_user_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists affiliate_commissions_one_per_order
  on public.affiliate_commissions(order_record_id)
  where order_record_id is not null;

create unique index if not exists affiliate_commissions_one_active_invoice
  on public.affiliate_commissions(invoice_id)
  where status in ('pending', 'paid');

create index if not exists idx_affiliate_profiles_invite_code on public.affiliate_profiles(invite_code);
create index if not exists idx_affiliate_referrals_affiliate_created on public.affiliate_referrals(affiliate_user_id, created_at desc);
create index if not exists idx_affiliate_orders_affiliate_created on public.affiliate_orders(affiliate_user_id, created_at desc);
create index if not exists idx_affiliate_orders_status_created on public.affiliate_orders(status, created_at desc);
create index if not exists idx_affiliate_orders_invoice on public.affiliate_orders(invoice_id);
create index if not exists idx_affiliate_commissions_affiliate_created on public.affiliate_commissions(affiliate_user_id, created_at desc);
create index if not exists idx_affiliate_commissions_status_created on public.affiliate_commissions(status, created_at desc);
create index if not exists idx_affiliate_payouts_affiliate_created on public.affiliate_payouts(affiliate_user_id, created_at desc);
create index if not exists idx_affiliate_audit_logs_created on public.affiliate_audit_logs(created_at desc);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_affiliate_profiles_touch_updated on public.affiliate_profiles;
create trigger trg_affiliate_profiles_touch_updated
before update on public.affiliate_profiles
for each row execute function public.touch_updated_at();

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

create or replace function public.log_affiliate_audit(
  p_actor_user_id uuid,
  p_target_user_id uuid,
  p_action text,
  p_entity_type text,
  p_entity_id uuid,
  p_metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.affiliate_audit_logs (
    actor_user_id,
    target_user_id,
    action,
    entity_type,
    entity_id,
    metadata
  )
  values (
    p_actor_user_id,
    p_target_user_id,
    p_action,
    p_entity_type,
    p_entity_id,
    coalesce(p_metadata, '{}'::jsonb)
  );
end;
$$;

create or replace function public.generate_invite_code(p_seed text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_seed text := upper(regexp_replace(coalesce(p_seed, ''), '[^A-Za-z0-9]', '', 'g'));
  v_base text;
  v_code text;
begin
  v_base := left(nullif(v_seed, ''), 10);
  if v_base is null or length(v_base) < 2 then
    v_base := 'USER';
  end if;

  loop
    v_code := 'VEX-' || v_base || '-' || lpad((floor(random() * 10000))::int::text, 4, '0');
    exit when not exists (
      select 1
      from public.affiliate_profiles p
      where p.invite_code = v_code
    );
  end loop;

  return v_code;
end;
$$;

create or replace function public.generate_invoice_id()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_prefix text := 'VEX-' || to_char(now(), 'YYYYMMDD') || '-';
  v_next integer;
  v_invoice text;
begin
  loop
    select coalesce(max(nullif(regexp_replace(o.invoice_id, '^' || v_prefix || '([0-9]{4})$', '\1'), o.invoice_id)::integer), 0) + 1
    into v_next
    from public.affiliate_orders o
    where o.invoice_id like v_prefix || '%';

    v_invoice := v_prefix || lpad(v_next::text, 4, '0');

    exit when not exists (
      select 1
      from public.affiliate_orders o
      where o.invoice_id = v_invoice
    );
  end loop;

  return v_invoice;
exception
  when others then
    loop
      v_invoice := v_prefix || lpad((floor(random() * 10000))::int::text, 4, '0');
      exit when not exists (
        select 1
        from public.affiliate_orders o
        where o.invoice_id = v_invoice
      );
    end loop;
    return v_invoice;
end;
$$;

create or replace function public.ensure_affiliate_profile()
returns public.affiliate_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_seed text;
  v_profile public.affiliate_profiles;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  v_seed := coalesce(
    auth.jwt() -> 'user_metadata' ->> 'username',
    split_part(auth.jwt() ->> 'email', '@', 1),
    'USER'
  );

  insert into public.affiliate_profiles (user_id, invite_code)
  values (v_user_id, public.generate_invite_code(v_seed))
  on conflict (user_id) do nothing
  returning * into v_profile;

  if v_profile.user_id is not null then
    perform public.log_affiliate_audit(
      v_user_id,
      v_user_id,
      'affiliate_profile_created',
      'affiliate_profile',
      v_profile.user_id,
      jsonb_build_object('invite_code', v_profile.invite_code)
    );
  end if;

  select * into v_profile
  from public.affiliate_profiles p
  where p.user_id = v_user_id;

  return v_profile;
end;
$$;

create or replace function public.claim_referral_code(p_invite_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_me uuid := auth.uid();
  v_code text := upper(regexp_replace(coalesce(p_invite_code, ''), '[^A-Za-z0-9-]', '', 'g'));
  v_owner public.affiliate_profiles;
  v_existing public.affiliate_referrals;
  v_referral public.affiliate_referrals;
begin
  if v_me is null then
    raise exception 'Not authenticated';
  end if;

  if v_code = '' then
    raise exception 'Invite code is required';
  end if;

  perform public.ensure_affiliate_profile();

  select * into v_owner
  from public.affiliate_profiles p
  where p.invite_code = v_code
  limit 1;

  if v_owner.user_id is null then
    raise exception 'Invite code not found';
  end if;

  if v_owner.status <> 'active' then
    raise exception 'Affiliate profile is not active';
  end if;

  if v_owner.user_id = v_me then
    raise exception 'Self referral is not allowed';
  end if;

  select * into v_existing
  from public.affiliate_referrals r
  where r.referred_user_id = v_me
  limit 1;

  if v_existing.id is not null then
    if v_existing.affiliate_user_id = v_owner.user_id then
      return jsonb_build_object('success', true, 'message', 'Referral already assigned', 'referral_id', v_existing.id);
    end if;
    raise exception 'This user already has an affiliate assigned';
  end if;

  insert into public.affiliate_referrals (
    affiliate_user_id,
    referred_user_id,
    invite_code,
    status
  )
  values (
    v_owner.user_id,
    v_me,
    v_code,
    'registered'
  )
  returning * into v_referral;

  perform public.log_affiliate_audit(
    v_me,
    v_owner.user_id,
    'referral_claimed',
    'affiliate_referral',
    v_referral.id,
    jsonb_build_object('invite_code', v_code, 'referred_user_id', v_me)
  );

  return jsonb_build_object('success', true, 'message', 'Referral code applied', 'referral_id', v_referral.id);
end;
$$;

create or replace function public.create_affiliate_order(
  p_invite_code text,
  p_invoice_id text,
  p_customer_name text,
  p_customer_contact text,
  p_customer_email text,
  p_service_name text,
  p_amount_cents integer,
  p_currency text default 'MXN',
  p_payment_method text default null,
  p_proof_url text default null,
  p_notes text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid := auth.uid();
  v_code text := upper(regexp_replace(coalesce(p_invite_code, ''), '[^A-Za-z0-9-]', '', 'g'));
  v_invoice text := upper(regexp_replace(coalesce(p_invoice_id, ''), '[^A-Za-z0-9-]', '', 'g'));
  v_owner public.affiliate_profiles;
  v_rate numeric(5,4) := 0.2000;
  v_commission integer;
  v_order public.affiliate_orders;
begin
  if v_actor is null then
    raise exception 'Not authenticated';
  end if;

  if v_code = '' then
    raise exception 'Invite code is required';
  end if;

  if v_invoice = '' then
    v_invoice := public.generate_invoice_id();
  end if;

  if coalesce(trim(p_service_name), '') = '' then
    raise exception 'Service name is required';
  end if;

  if p_amount_cents is null or p_amount_cents <= 0 then
    raise exception 'amount_cents must be greater than 0';
  end if;

  select * into v_owner
  from public.affiliate_profiles p
  where p.invite_code = v_code
  limit 1;

  if v_owner.user_id is null then
    raise exception 'Invite code not found';
  end if;

  if v_owner.status <> 'active' then
    raise exception 'Affiliate profile is not active';
  end if;

  if v_owner.user_id <> v_actor and not public.is_admin() then
    raise exception 'Only the invite code owner or admin can create this order';
  end if;

  if exists (select 1 from public.affiliate_orders o where o.invoice_id = v_invoice) then
    raise exception 'invoice_id already exists';
  end if;

  v_commission := round(p_amount_cents::numeric * v_rate)::integer;

  insert into public.affiliate_orders (
    affiliate_user_id,
    invite_code,
    invoice_id,
    customer_name,
    customer_contact,
    customer_email,
    service_name,
    amount_cents,
    currency,
    commission_rate,
    commission_cents,
    status,
    source,
    payment_method,
    proof_url,
    admin_notes
  )
  values (
    v_owner.user_id,
    v_code,
    v_invoice,
    nullif(trim(coalesce(p_customer_name, '')), ''),
    nullif(trim(coalesce(p_customer_contact, '')), ''),
    nullif(trim(coalesce(p_customer_email, '')), ''),
    trim(p_service_name),
    p_amount_cents,
    upper(coalesce(nullif(trim(p_currency), ''), 'MXN')),
    v_rate,
    v_commission,
    'pending_review',
    'affiliate_report',
    nullif(trim(coalesce(p_payment_method, '')), ''),
    nullif(trim(coalesce(p_proof_url, '')), ''),
    nullif(trim(coalesce(p_notes, '')), '')
  )
  returning * into v_order;

  perform public.log_affiliate_audit(
    v_actor,
    v_owner.user_id,
    'affiliate_order_created',
    'affiliate_order',
    v_order.id,
    jsonb_build_object('invoice_id', v_order.invoice_id, 'source', v_order.source, 'status', v_order.status)
  );

  return jsonb_build_object('success', true, 'message', 'Order created and pending review', 'order_id', v_order.id, 'invoice_id', v_order.invoice_id);
end;
$$;

create or replace function public.create_manual_admin_order(
  p_invite_code text,
  p_invoice_id text,
  p_customer_name text,
  p_customer_contact text,
  p_customer_email text,
  p_service_name text,
  p_amount_cents integer,
  p_currency text default 'MXN',
  p_commission_rate numeric default 0.20,
  p_payment_method text default null,
  p_proof_url text default null,
  p_admin_notes text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid := auth.uid();
  v_code text := upper(regexp_replace(coalesce(p_invite_code, ''), '[^A-Za-z0-9-]', '', 'g'));
  v_invoice text := upper(regexp_replace(coalesce(p_invoice_id, ''), '[^A-Za-z0-9-]', '', 'g'));
  v_owner public.affiliate_profiles;
  v_rate numeric(5,4);
  v_commission integer;
  v_order public.affiliate_orders;
begin
  if v_actor is null or not public.is_admin() then
    raise exception 'Only admin can create manual affiliate orders';
  end if;

  if v_code = '' then
    raise exception 'Invite code is required';
  end if;

  if v_invoice = '' then
    v_invoice := public.generate_invoice_id();
  end if;

  if coalesce(trim(p_service_name), '') = '' then
    raise exception 'Service name is required';
  end if;

  if p_amount_cents is null or p_amount_cents <= 0 then
    raise exception 'amount_cents must be greater than 0';
  end if;

  v_rate := greatest(0.0100::numeric, least(coalesce(p_commission_rate, 0.20), 0.5000::numeric));

  select * into v_owner
  from public.affiliate_profiles p
  where p.invite_code = v_code
  limit 1;

  if v_owner.user_id is null then
    raise exception 'Invite code not found';
  end if;

  if exists (select 1 from public.affiliate_orders o where o.invoice_id = v_invoice) then
    raise exception 'invoice_id already exists';
  end if;

  v_commission := round(p_amount_cents::numeric * v_rate)::integer;

  insert into public.affiliate_orders (
    affiliate_user_id,
    invite_code,
    invoice_id,
    customer_name,
    customer_contact,
    customer_email,
    service_name,
    amount_cents,
    currency,
    commission_rate,
    commission_cents,
    status,
    source,
    payment_method,
    proof_url,
    admin_notes
  )
  values (
    v_owner.user_id,
    v_code,
    v_invoice,
    nullif(trim(coalesce(p_customer_name, '')), ''),
    nullif(trim(coalesce(p_customer_contact, '')), ''),
    nullif(trim(coalesce(p_customer_email, '')), ''),
    trim(p_service_name),
    p_amount_cents,
    upper(coalesce(nullif(trim(p_currency), ''), 'MXN')),
    v_rate,
    v_commission,
    'pending_review',
    'admin_manual',
    nullif(trim(coalesce(p_payment_method, '')), ''),
    nullif(trim(coalesce(p_proof_url, '')), ''),
    nullif(trim(coalesce(p_admin_notes, '')), '')
  )
  returning * into v_order;

  perform public.log_affiliate_audit(
    v_actor,
    v_owner.user_id,
    'affiliate_order_created',
    'affiliate_order',
    v_order.id,
    jsonb_build_object('invoice_id', v_order.invoice_id, 'source', v_order.source, 'status', v_order.status)
  );

  return jsonb_build_object('success', true, 'message', 'Manual order created and pending review', 'order_id', v_order.id, 'invoice_id', v_order.invoice_id);
end;
$$;

create or replace function public.approve_affiliate_order(p_order_record_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid := auth.uid();
  v_order public.affiliate_orders;
  v_commission public.affiliate_commissions;
  v_source text;
begin
  if v_actor is null or not public.is_admin() then
    raise exception 'Only admin can approve affiliate orders';
  end if;

  select * into v_order
  from public.affiliate_orders o
  where o.id = p_order_record_id
  for update;

  if v_order.id is null then
    raise exception 'Order not found';
  end if;

  if v_order.status <> 'pending_review' then
    raise exception 'Order is not pending review';
  end if;

  if exists (select 1 from public.affiliate_commissions c where c.order_record_id = v_order.id) then
    raise exception 'Commission already exists for this order';
  end if;

  v_source := case when v_order.source = 'admin_manual' then 'admin_manual' else 'affiliate_order' end;

  insert into public.affiliate_commissions (
    affiliate_user_id,
    referred_user_id,
    order_record_id,
    invoice_id,
    amount_cents,
    currency,
    commission_rate,
    commission_cents,
    status,
    source
  )
  values (
    v_order.affiliate_user_id,
    v_order.referred_user_id,
    v_order.id,
    v_order.invoice_id,
    v_order.amount_cents,
    v_order.currency,
    v_order.commission_rate,
    v_order.commission_cents,
    'pending',
    v_source
  )
  returning * into v_commission;

  update public.affiliate_profiles p
  set referral_balance_cents = p.referral_balance_cents + v_commission.commission_cents,
      lifetime_earned_cents = p.lifetime_earned_cents + v_commission.commission_cents
  where p.user_id = v_order.affiliate_user_id;

  update public.affiliate_orders o
  set status = 'approved',
      approved_at = now(),
      approved_by = v_actor
  where o.id = v_order.id;

  if v_order.referred_user_id is not null then
    update public.affiliate_referrals r
    set status = 'converted',
        converted_at = coalesce(r.converted_at, now())
    where r.affiliate_user_id = v_order.affiliate_user_id
      and r.referred_user_id = v_order.referred_user_id
      and r.status = 'registered';
  end if;

  perform public.log_affiliate_audit(
    v_actor,
    v_order.affiliate_user_id,
    'affiliate_order_approved',
    'affiliate_order',
    v_order.id,
    jsonb_build_object('invoice_id', v_order.invoice_id, 'commission_cents', v_commission.commission_cents)
  );

  perform public.log_affiliate_audit(
    v_actor,
    v_order.affiliate_user_id,
    'affiliate_commission_created',
    'affiliate_commission',
    v_commission.id,
    jsonb_build_object('invoice_id', v_commission.invoice_id, 'order_record_id', v_order.id)
  );

  return jsonb_build_object('success', true, 'message', 'Order approved and commission created', 'commission_id', v_commission.id, 'commission_cents', v_commission.commission_cents);
end;
$$;

create or replace function public.reject_affiliate_order(p_order_record_id uuid, p_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid := auth.uid();
  v_order public.affiliate_orders;
begin
  if v_actor is null or not public.is_admin() then
    raise exception 'Only admin can reject affiliate orders';
  end if;

  select * into v_order
  from public.affiliate_orders o
  where o.id = p_order_record_id
  for update;

  if v_order.id is null then
    raise exception 'Order not found';
  end if;

  if v_order.status <> 'pending_review' then
    raise exception 'Only pending orders can be rejected';
  end if;

  update public.affiliate_orders o
  set status = 'rejected',
      rejection_reason = nullif(trim(coalesce(p_reason, '')), ''),
      rejected_at = now(),
      rejected_by = v_actor
  where o.id = v_order.id;

  perform public.log_affiliate_audit(
    v_actor,
    v_order.affiliate_user_id,
    'affiliate_order_rejected',
    'affiliate_order',
    v_order.id,
    jsonb_build_object('invoice_id', v_order.invoice_id, 'reason', p_reason)
  );

  return jsonb_build_object('success', true, 'message', 'Order rejected', 'order_id', v_order.id);
end;
$$;

create or replace function public.mark_commission_paid(p_commission_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid := auth.uid();
  v_commission public.affiliate_commissions;
begin
  if v_actor is null or not public.is_admin() then
    raise exception 'Only admin can mark commissions as paid';
  end if;

  select * into v_commission
  from public.affiliate_commissions c
  where c.id = p_commission_id
  for update;

  if v_commission.id is null then
    raise exception 'Commission not found';
  end if;

  if v_commission.status <> 'pending' then
    raise exception 'Only pending commissions can be paid';
  end if;

  update public.affiliate_commissions c
  set status = 'paid',
      paid_at = now(),
      paid_by = v_actor
  where c.id = v_commission.id;

  update public.affiliate_profiles p
  set referral_balance_cents = greatest(0, p.referral_balance_cents - v_commission.commission_cents)
  where p.user_id = v_commission.affiliate_user_id;

  perform public.log_affiliate_audit(
    v_actor,
    v_commission.affiliate_user_id,
    'affiliate_commission_paid',
    'affiliate_commission',
    v_commission.id,
    jsonb_build_object('invoice_id', v_commission.invoice_id, 'commission_cents', v_commission.commission_cents)
  );

  return jsonb_build_object('success', true, 'message', 'Commission marked as paid', 'commission_id', v_commission.id);
end;
$$;

create or replace function public.create_payout_for_affiliate(
  p_affiliate_user_id uuid,
  p_method text default null,
  p_reference text default null,
  p_notes text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid := auth.uid();
  v_total integer;
  v_profile public.affiliate_profiles;
  v_payout public.affiliate_payouts;
begin
  if v_actor is null or not public.is_admin() then
    raise exception 'Only admin can create payouts';
  end if;

  select * into v_profile
  from public.affiliate_profiles p
  where p.user_id = p_affiliate_user_id
  for update;

  if v_profile.user_id is null then
    raise exception 'Affiliate profile not found';
  end if;

  select coalesce(sum(c.commission_cents), 0)::integer into v_total
  from public.affiliate_commissions c
  where c.affiliate_user_id = p_affiliate_user_id
    and c.status = 'pending';

  if v_total <= 0 then
    raise exception 'No pending commissions for this affiliate';
  end if;

  insert into public.affiliate_payouts (
    affiliate_user_id,
    amount_cents,
    currency,
    method,
    payout_email,
    status,
    reference,
    notes,
    paid_at,
    paid_by
  )
  values (
    p_affiliate_user_id,
    v_total,
    'MXN',
    nullif(trim(coalesce(p_method, v_profile.payout_method, '')), ''),
    v_profile.payout_email,
    'paid',
    nullif(trim(coalesce(p_reference, '')), ''),
    nullif(trim(coalesce(p_notes, '')), ''),
    now(),
    v_actor
  )
  returning * into v_payout;

  update public.affiliate_commissions c
  set status = 'paid',
      paid_at = now(),
      paid_by = v_actor
  where c.affiliate_user_id = p_affiliate_user_id
    and c.status = 'pending';

  update public.affiliate_profiles p
  set referral_balance_cents = greatest(0, p.referral_balance_cents - v_total)
  where p.user_id = p_affiliate_user_id;

  perform public.log_affiliate_audit(
    v_actor,
    p_affiliate_user_id,
    'affiliate_payout_created',
    'affiliate_payout',
    v_payout.id,
    jsonb_build_object('amount_cents', v_total, 'reference', p_reference)
  );

  return jsonb_build_object('success', true, 'message', 'Payout created and commissions paid', 'payout_id', v_payout.id, 'amount_cents', v_total);
end;
$$;

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

create or replace function public.handle_new_auth_user_affiliate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_seed text;
  v_profile public.affiliate_profiles;
begin
  v_seed := coalesce(
    new.raw_user_meta_data ->> 'username',
    split_part(new.email, '@', 1),
    'USER'
  );

  insert into public.affiliate_profiles (user_id, invite_code)
  values (new.id, public.generate_invite_code(v_seed))
  on conflict (user_id) do nothing
  returning * into v_profile;

  if v_profile.user_id is not null then
    perform public.log_affiliate_audit(
      new.id,
      new.id,
      'affiliate_profile_created',
      'affiliate_profile',
      v_profile.user_id,
      jsonb_build_object('invite_code', v_profile.invite_code)
    );
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_affiliate on auth.users;
create trigger on_auth_user_created_affiliate
after insert on auth.users
for each row execute function public.handle_new_auth_user_affiliate();

alter table public.admin_users enable row level security;
alter table public.affiliate_profiles enable row level security;
alter table public.affiliate_referrals enable row level security;
alter table public.affiliate_orders enable row level security;
alter table public.affiliate_commissions enable row level security;
alter table public.affiliate_payouts enable row level security;
alter table public.affiliate_audit_logs enable row level security;

drop policy if exists admin_users_select_admin on public.admin_users;
create policy admin_users_select_admin
on public.admin_users
for select
using (public.is_admin());

drop policy if exists affiliate_profiles_select_own_or_admin on public.affiliate_profiles;
create policy affiliate_profiles_select_own_or_admin
on public.affiliate_profiles
for select
using (auth.uid() = user_id or public.is_admin());

drop policy if exists affiliate_profiles_insert_own on public.affiliate_profiles;
create policy affiliate_profiles_insert_own
on public.affiliate_profiles
for insert
with check (auth.uid() = user_id);

drop policy if exists affiliate_profiles_update_own_payout on public.affiliate_profiles;
create policy affiliate_profiles_update_own_payout
on public.affiliate_profiles
for update
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists affiliate_referrals_select_scoped on public.affiliate_referrals;
create policy affiliate_referrals_select_scoped
on public.affiliate_referrals
for select
using (auth.uid() = affiliate_user_id or auth.uid() = referred_user_id or public.is_admin());

drop policy if exists affiliate_orders_select_scoped on public.affiliate_orders;
create policy affiliate_orders_select_scoped
on public.affiliate_orders
for select
using (auth.uid() = affiliate_user_id or auth.uid() = referred_user_id or public.is_admin());

drop policy if exists affiliate_commissions_select_scoped on public.affiliate_commissions;
create policy affiliate_commissions_select_scoped
on public.affiliate_commissions
for select
using (auth.uid() = affiliate_user_id or public.is_admin());

drop policy if exists affiliate_payouts_select_scoped on public.affiliate_payouts;
create policy affiliate_payouts_select_scoped
on public.affiliate_payouts
for select
using (auth.uid() = affiliate_user_id or public.is_admin());

drop policy if exists affiliate_audit_logs_select_admin on public.affiliate_audit_logs;
create policy affiliate_audit_logs_select_admin
on public.affiliate_audit_logs
for select
using (public.is_admin());

revoke all on public.admin_users from anon, authenticated;
revoke all on public.affiliate_profiles from anon, authenticated;
revoke all on public.affiliate_referrals from anon, authenticated;
revoke all on public.affiliate_orders from anon, authenticated;
revoke all on public.affiliate_commissions from anon, authenticated;
revoke all on public.affiliate_payouts from anon, authenticated;
revoke all on public.affiliate_audit_logs from anon, authenticated;

grant select on public.admin_users to authenticated;
grant select on public.affiliate_profiles to authenticated;
grant update (payout_email, payout_method) on public.affiliate_profiles to authenticated;
grant select on public.affiliate_referrals to authenticated;
grant select on public.affiliate_orders to authenticated;
grant select on public.affiliate_commissions to authenticated;
grant select on public.affiliate_payouts to authenticated;
grant select on public.affiliate_audit_logs to authenticated;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.generate_invite_code(text) to authenticated;
grant execute on function public.generate_invoice_id() to authenticated;
grant execute on function public.ensure_affiliate_profile() to authenticated;
grant execute on function public.claim_referral_code(text) to authenticated;
grant execute on function public.create_affiliate_order(text, text, text, text, text, text, integer, text, text, text, text) to authenticated;
grant execute on function public.create_manual_admin_order(text, text, text, text, text, text, integer, text, numeric, text, text, text) to authenticated;
grant execute on function public.approve_affiliate_order(uuid) to authenticated;
grant execute on function public.reject_affiliate_order(uuid, text) to authenticated;
grant execute on function public.mark_commission_paid(uuid) to authenticated;
grant execute on function public.create_payout_for_affiliate(uuid, text, text, text) to authenticated;
grant execute on function public.admin_dashboard_metrics() to authenticated;
