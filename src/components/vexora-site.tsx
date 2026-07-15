import { LoadingScreen } from "@/components/ui/loading-screen";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { ScrollBuildHero } from "@/components/sections/scroll-build-hero";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ParticleWordsSection } from "@/components/sections/particle-words-section";
import { ExplorePagesSection } from "@/components/sections/explore-pages-section";
import { ThreeLabSection } from "@/components/sections/three-lab-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { ContactSection } from "@/components/sections/contact-section";
export function VexoraSite(){
 return <SmoothScrollProvider><a href="#contenido" className="skip-link">Saltar al contenido</a><LoadingScreen/><CustomCursor/><Navbar/><main id="contenido"><h1 className="sr-only">Vexora Labs — Diseño, desarrollo y tecnología premium</h1><ScrollBuildHero/><ManifestoSection/><ServicesSection/><ExplorePagesSection/><ParticleWordsSection/><ThreeLabSection/><ProcessSection/><ProjectsSection/><CapabilitiesSection/><FinalCtaSection/><ContactSection/></main><Footer/></SmoothScrollProvider>;
}
