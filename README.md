# Vexora Labs Web

Sitio Astro de Vexora Labs con sistema de afiliados sobre Supabase, PostgreSQL, RLS y notificaciones privadas a Discord.

No usa SellAuth. No hay webhook de SellAuth. Las ventas usan `invoice_id` interno y las comisiones solo se crean cuando un admin aprueba una orden desde `/admin`.

## 1. Instalacion

```bash
npm install
npm run dev
```

El proyecto usa Astro en modo server para poder ejecutar endpoints privados en `src/pages/api`.

## 2. Variables de entorno

Crea `.env` a partir de `.env.example`:

```bash
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DISCORD_AFFILIATE_WEBHOOK_URL=
PUBLIC_SITE_URL=https://vexoralabs.shop
PUBLIC_ADMIN_URL=https://vexoralabs.shop/admin
AFFILIATE_DEFAULT_COMMISSION_RATE=0.20
```

`DISCORD_AFFILIATE_WEBHOOK_URL` y `SUPABASE_SERVICE_ROLE_KEY` son privadas. Configuralas como variables server-side en Netlify o tu host. No las expongas como `PUBLIC_`.

## 3. Crear tablas y RPCs en Supabase

Abre Supabase SQL Editor y ejecuta completo:

```text
supabase/referrals.sql
```

Si ya habias ejecutado una version vieja del modulo de referidos, respalda o elimina las tablas incompatibles antes de correr el nuevo SQL. El esquema actual reemplaza el flujo antiguo de codigos de venta por `affiliate_orders` con `invoice_id` interno.

El SQL crea:

- `admin_users`
- `affiliate_profiles`
- `affiliate_referrals`
- `affiliate_orders`
- `affiliate_commissions`
- `affiliate_payouts`
- `affiliate_audit_logs`
- funciones RPC
- triggers
- indices
- Row Level Security

## 4. Crear el primer admin

Primero crea/inicia sesion con el usuario en Supabase Auth. Copia su `auth.users.id` y ejecuta:

```sql
insert into public.admin_users (user_id, role)
values ('USER_ID_AQUI', 'owner')
on conflict (user_id) do update set role = excluded.role;
```

Solo usuarios registrados en `admin_users` pueden aprobar ventas, rechazar ventas, pagar comisiones y crear payouts.

## 5. Configurar Discord Webhook

En Discord crea un Incoming Webhook para el canal de operaciones. Guarda la URL en:

```text
DISCORD_AFFILIATE_WEBHOOK_URL
```

El webhook solo se usa desde server-side en:

- `src/lib/discord.ts`
- `src/pages/api/affiliate/order-created.ts`
- `src/pages/api/admin/notify-order.ts`

Si Discord falla, la venta queda guardada y el frontend muestra warning.

## 6. Probar link de referido

1. Inicia sesion en `/cuenta`.
2. Copia tu link de afiliado:

```text
https://vexoralabs.shop/cuenta/?ref=CODIGO
```

3. Abre ese link en otro navegador o sesion.
4. Registra o inicia sesion con otro usuario.
5. El frontend llama `claim_referral_code(p_invite_code)`.
6. Supabase valida que no sea autorreferido y que el usuario no tenga otro afiliado.

## 7. Reportar una venta

Desde `/cuenta`, el afiliado llena:

- `invoice_id`
- cliente
- contacto
- servicio
- monto
- metodo de pago
- notas
- `proof_url` opcional

La RPC `create_affiliate_order` crea una orden con:

```text
status = pending_review
source = affiliate_report
```

No se crea comision en este paso.

## 8. Aprobar una venta

Desde `/admin`, pulsa `Aprobar` en una orden pendiente.

La RPC `approve_affiliate_order`:

- valida admin
- valida que la orden este pendiente
- crea `affiliate_commissions`
- suma saldo pendiente
- suma historico ganado
- cambia la orden a `approved`
- registra audit log

## 9. Rechazar una venta

Desde `/admin`, pulsa `Rechazar` y escribe el motivo.

La RPC `reject_affiliate_order`:

- cambia la orden a `rejected`
- guarda `rejection_reason`
- no crea comision
- registra audit log

## 10. Pagar comisiones

Hay dos opciones en `/admin`:

- Marcar una comision individual como pagada.
- Crear payout para un afiliado, lo que marca todas sus comisiones pendientes como pagadas.

Al pagar:

- baja `referral_balance_cents`
- no baja `lifetime_earned_cents`
- registra audit log

## 11. Evitar fraudes

Reglas ya aplicadas:

- No se permiten autorreferidos.
- Un referido solo puede pertenecer a un afiliado.
- `invoice_id` es unico.
- No hay comision hasta aprobacion admin.
- Afiliados no pueden aprobar, rechazar ni pagar.
- RLS limita lecturas por usuario.
- Mutaciones sensibles corren por RPC con validaciones.

Buenas practicas operativas:

- Verifica comprobante y contacto antes de aprobar.
- Revisa invoices duplicados o sospechosos.
- Usa notas admin para dejar contexto.
- Paga solo por canales que puedas auditar.

## 12. Deploy

El proyecto usa `@astrojs/netlify` y `output: "server"`.

No subas solo la carpeta `dist` con drag-and-drop. En modo server, Astro genera la app SSR y funciones de Netlify fuera de `dist`; si publicas solo `dist`, Netlify no tiene `index.html` ni la funcion SSR y devuelve 404.

Deploy recomendado:

1. Sube el proyecto completo a GitHub/GitLab/Bitbucket.
2. En Netlify crea el sitio desde ese repo.
3. Configura las variables de entorno publicas y privadas server-side.
4. Usa:

```text
Build command: npm run build
Publish directory: dist
```

Estos valores tambien quedan definidos en `netlify.toml`.

## 13. Si Discord no manda notificacion

Revisa:

- que `DISCORD_AFFILIATE_WEBHOOK_URL` exista en el entorno server-side
- que la URL sea de Incoming Webhook valida
- logs del endpoint `/api/affiliate/order-created`
- logs del endpoint `/api/admin/notify-order`
- permisos del canal de Discord

La orden no se revierte si Discord falla.

## Archivos principales

- `supabase/referrals.sql`
- `src/lib/supabase.ts`
- `src/lib/discord.ts`
- `src/pages/cuenta/index.astro`
- `src/pages/admin/index.astro`
- `src/pages/api/affiliate/order-created.ts`
- `src/pages/api/admin/notify-order.ts`
