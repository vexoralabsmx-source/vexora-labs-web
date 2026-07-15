"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
interface ParticlesProps { color?: string; particleCount?: number; particleSize?: number; animate?: boolean; className?: string; }
function Field({count,color,size,animate}:{count:number;color:string;size:number;animate:boolean}) {
  const ref=useRef<THREE.Points>(null);
  const positions=useMemo(()=>{const data=new Float32Array(count*3);const pseudo=(seed:number)=>{const value=Math.sin(seed*12.9898)*43758.5453;return value-Math.floor(value);};for(let i=0;i<data.length;i+=3){data[i]=(pseudo(i+1)-.5)*12;data[i+1]=(pseudo(i+2)-.5)*8;data[i+2]=(pseudo(i+3)-.5)*7;}return data;},[count]);
  useFrame((_,delta)=>{if(ref.current&&animate){ref.current.rotation.y+=delta*.018;ref.current.rotation.x+=delta*.006;}});
  return <Points ref={ref} positions={positions} stride={3} frustumCulled><PointMaterial transparent color={color} size={size/1000} sizeAttenuation depthWrite={false} opacity={.7}/></Points>;
}
export function Particles({color="#ffffff",particleCount=10000,particleSize=4,animate=true,className}:ParticlesProps) {
  const reduced=useReducedMotion();
  const [count,setCount]=useState(800);
  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      const adaptiveCount=reduced?700:window.innerWidth<640?2500:window.innerWidth<1024?5500:particleCount;
      setCount(Math.min(adaptiveCount,particleCount));
    },0);
    return()=>window.clearTimeout(timer);
  },[particleCount,reduced]);
  return <div aria-hidden className={cn("pointer-events-none absolute inset-0",className)}><Canvas dpr={[1,1.5]} camera={{position:[0,0,5],fov:60}} gl={{alpha:true,antialias:false,powerPreference:"high-performance"}}><Field count={count} color={color} size={particleSize} animate={animate&&!reduced}/></Canvas></div>;
}
