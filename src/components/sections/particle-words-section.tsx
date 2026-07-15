"use client";

import {useRef} from "react";
import {motion,useScroll,useTransform,type MotionValue} from "framer-motion";
import {DottedSurface} from "@/components/ui/dotted-surface";

const statements=[
 {kicker:"01 / Una idea",line:"No crece",serif:"solo por verse bien."},
 {kicker:"02 / La diferencia",line:"Crece cuando",serif:"todo conecta."},
 {kicker:"03 / El sistema",line:"Diseño × código",serif:"× estrategia."},
 {kicker:"04 / El resultado",line:"Se convierte en",serif:"algo vivo."},
] as const;
const windows=[[0,.05,.14,.24],[.16,.28,.42,.52],[.48,.58,.72,.82],[.76,.86,.95,1]] as const;

function Statement({index,progress}:{index:number;progress:MotionValue<number>}){
 const [start,enter,leave,end]=windows[index];
 const opacity=useTransform(progress,[start,enter,leave,end],[0,1,1,0]);
 const y=useTransform(progress,[start,(enter+leave)/2,end],[90,0,-90]);
 const scale=useTransform(progress,[start,(enter+leave)/2,end],[.92,1,.94]);
 const blur=useTransform(progress,[start,enter,leave,end],[12,0,0,12]);
 const filter=useTransform(blur,value=>`blur(${value}px)`);
 const item=statements[index];
 return <motion.div style={{opacity,y,scale,filter}} className="absolute inset-x-0 px-5 text-center"><p className="tech-label mb-7 text-cyan-200/80">{item.kicker}</p><p className="display text-[clamp(3.15rem,8.7vw,9.5rem)] leading-[.82] text-white">{item.line}</p><p className="editorial mt-2 text-[clamp(3.05rem,8.2vw,9rem)] leading-[.82] text-white/90">{item.serif}</p></motion.div>;
}
export function ParticleWordsSection(){
 const section=useRef<HTMLElement>(null);
 const {scrollYProgress}=useScroll({target:section,offset:["start start","end end"]});
 const rotate=useTransform(scrollYProgress,[0,1],[-9,9]);
 const scale=useTransform(scrollYProgress,[0,.5,1],[1.1,1,1.12]);
 return <section ref={section} className="relative h-[400svh] border-y border-white/10 bg-[#030712]"><div className="sticky top-0 h-svh overflow-hidden">
  <motion.div style={{rotate,scale}} className="absolute -inset-[12%]"><DottedSurface className="opacity-90"/></motion.div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,.34)_42%,#030712_82%)]"/><div className="grid-bg absolute inset-0 opacity-[.12] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"/><div className="absolute left-1/2 top-1/2 size-[min(78vw,820px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 shadow-[0_0_180px_rgba(0,229,255,.08)]"/>
  <div className="relative flex h-full items-center justify-center">{statements.map((_,index)=><Statement key={index} index={index} progress={scrollYProgress}/>)}</div>
  <div className="absolute inset-x-5 bottom-7 flex items-end justify-between md:inset-x-10"><p className="tech-label text-white/35">Vexora / Thinking system</p><div className="flex items-center gap-3"><span className="tech-label text-white/35">Scroll</span><span className="h-px w-12 bg-gradient-to-r from-cyan-300 to-transparent"/></div></div>
 </div></section>;
}
