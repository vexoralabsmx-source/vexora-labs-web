export const siteConfig = {
  name: "Vexora Labs",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vexoralabs.shop",
  description: "Diseño, desarrollo y tecnología para convertir ideas en productos digitales.",
  logo: "/brand/vexora-logo.png",
  heroGif: "/videos/vexora-build.gif",
  heroWebm: process.env.NEXT_PUBLIC_VEXORA_HERO_WEBM_URL ?? "",
  heroMp4: process.env.NEXT_PUBLIC_VEXORA_HERO_MP4_URL ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@vexoralabs.shop",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "522203309762",
  socials: { instagram: "", tiktok: "", discord: "" },
} as const;
