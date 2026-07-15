import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";

export function InteriorPage({ children }: { children: React.ReactNode }) {
  return <SmoothScrollProvider><a href="#contenido" className="skip-link">Saltar al contenido</a><CustomCursor/><Navbar/><main id="contenido" className="min-h-svh bg-[#030712]">{children}</main><Footer/></SmoothScrollProvider>;
}
