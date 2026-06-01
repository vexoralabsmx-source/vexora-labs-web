-- Vexora Labs affiliate schema reset.
-- WARNING: This deletes the old affiliate module tables and their data.
-- Use this before supabase/referrals.sql only when replacing the previous schema.

drop table if exists public.affiliate_audit_logs cascade;
drop table if exists public.affiliate_payouts cascade;
drop table if exists public.affiliate_commissions cascade;
drop table if exists public.affiliate_orders cascade;
drop table if exists public.affiliate_sale_codes cascade;
drop table if exists public.affiliate_referrals cascade;
drop table if exists public.affiliate_profiles cascade;
drop table if exists public.admin_users cascade;

drop function if exists public.admin_dashboard_metrics() cascade;
drop function if exists public.approve_affiliate_order(uuid) cascade;
drop function if exists public.approve_sale_code(text, text, numeric) cascade;
drop function if exists public.claim_referral_code(text) cascade;
drop function if exists public.create_affiliate_order(text, text, text, text, text, text, integer, text, text, text, text) cascade;
drop function if exists public.create_manual_admin_order(text, text, text, text, text, text, integer, text, numeric, text, text, text) cascade;
drop function if exists public.create_payout_for_affiliate(uuid, text, text, text) cascade;
drop function if exists public.ensure_affiliate_profile() cascade;
drop function if exists public.ensure_affiliate_profile(uuid) cascade;
drop function if exists public.generate_invite_code(text) cascade;
drop function if exists public.generate_invite_code() cascade;
drop function if exists public.generate_invoice_id() cascade;
drop function if exists public.generate_sale_code(text, bigint, text, text, text) cascade;
drop function if exists public.generate_sale_code_token() cascade;
drop function if exists public.is_admin() cascade;
drop function if exists public.is_admin_email(text) cascade;
drop function if exists public.log_affiliate_audit(uuid, uuid, text, text, uuid, jsonb) cascade;
drop function if exists public.mark_commission_paid(uuid) cascade;
drop function if exists public.register_referral_purchase(uuid, text, bigint, text, numeric) cascade;

notify pgrst, 'reload schema';
