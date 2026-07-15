# Vexora Labs

Experiencia web cinematográfica para [vexoralabs.shop](https://vexoralabs.shop), construida con Next.js, TypeScript, Tailwind CSS, GSAP, Lenis y React Three Fiber.

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Comandos

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Variables de entorno

Copia `.env.example` a `.env.local`.

- `NEXT_PUBLIC_SITE_URL`: dominio canónico.
- `NEXT_PUBLIC_CONTACT_EMAIL`: correo público opcional.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp público opcional.
- `CONTACT_WEBHOOK_URL`: webhook privado utilizado por `/api/contact`.

Si `CONTACT_WEBHOOK_URL` no existe, el formulario responde con un error honesto y no simula un envío.

## Estructura

- `src/app`: rutas, metadata, sitemap, robots y API de contacto.
- `src/components/sections`: narrativa y secciones de la página.
- `src/components/ui`: partículas, cursor, botones y primitivas UI.
- `src/components/three`: núcleo 3D.
- `src/data`: servicios, proyectos, proceso, métricas y configuración.
- `src/hooks`: preferencias del dispositivo.
- `public/brand`: logo oficial.
- `public/videos`: GIF, WebM, MP4 y poster oficiales.

## Video del hero

El hero usa, en este orden:

1. `public/videos/vexora-build.webm`
2. `public/videos/vexora-build.mp4`
3. `public/videos/vexora-build.gif` como asset de respaldo

GSAP y ScrollTrigger convierten el progreso vertical en `currentTime`. La actualización usa `requestAnimationFrame`, interpolación y limpieza al desmontar.

Para reemplazar el asset, conserva el mismo encuadre y genera:

```bash
ffmpeg -i origen.gif -an -c:v libvpx-vp9 -crf 24 -b:v 0 public/videos/vexora-build.webm
ffmpeg -i origen.gif -an -movflags +faststart -pix_fmt yuv420p public/videos/vexora-build.mp4
ffmpeg -i origen.gif -vf "select=eq(n\,0)" -frames:v 1 public/videos/vexora-build-poster.webp
```

Para una secuencia, guarda WebP numerados en `public/frames/vexora/frame-0001.webp` y sustituye el hook de video por un canvas que pinte el frame según el progreso.

## Editar contenido

- Proyectos: `src/data/projects.ts`.
- Servicios: `src/data/services.ts`.
- Proceso: `src/data/process.ts`.
- Métricas verificables: `src/data/metrics.ts`.
- Enlaces y contacto: `src/data/site-config.ts` y `src/data/navigation.ts`.

No se incluyen testimonios, clientes ni resultados inventados.

## Rendimiento

- WebM prioritario y 3D cargado de forma dinámica.
- DPR limitado.
- Menos partículas en móvil y reduced motion.
- Canvas sin interacción con el puntero salvo el texto de partículas.
- Video, animaciones y listeners se limpian al desmontar.
- El sitio conserva contenido HTML cuando WebGL no está disponible.

Para reducir partículas cambia `particleCount` en `manifesto-section.tsx`. Para desactivar 3D sustituye `CoreCanvas` por el fallback HTML de `three-lab-section.tsx`.

## Pruebas manuales

- 320, 375, 430, 768, 1024, 1366, 1440 y 1920 px.
- Navegación con teclado y Escape.
- Menú móvil y anchors.
- `prefers-reduced-motion: reduce`.
- Touch y mouse.
- Video ausente.
- WebGL desactivado.
- Formulario con webhook configurado y sin configurar.
- Cambio de orientación.

En DevTools, activa reduced motion desde Rendering o desde el sistema operativo. Para simular móvil usa Device Toolbar y verifica que no exista scroll horizontal.

## Deploy

### Vercel

Importa el repositorio, configura las variables y publica. Next.js se detecta automáticamente.

### Netlify

Usa el adaptador oficial de Next.js, comando `npm run build` y configura las mismas variables en el panel.

Antes de publicar:

```bash
npm run lint
npx tsc --noEmit
npm run build
```
