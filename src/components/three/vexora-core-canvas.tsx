"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {Float,Line,RoundedBox,Sparkles} from "@react-three/drei";
import {useMemo,useRef,type MutableRefObject} from "react";
import * as THREE from "three";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
const nodes:[number,number,number][][]=[[[-3.1,1.5,-.7],[3.15,1.35,-.4],[-3.4,-1.4,.2],[3.25,-1.35,-.2],[0,2.7,-1.1],[0,-2.7,-.6]]];
function Mark({progressRef}:{progressRef:MutableRefObject<number>}){
 const mark=useRef<THREE.Group>(null),orbit=useRef<THREE.Group>(null),reduced=useReducedMotion(),target=useMemo(()=>new THREE.Vector3(),[]);
 useFrame((state,delta)=>{const p=progressRef.current;if(mark.current){mark.current.rotation.y=THREE.MathUtils.damp(mark.current.rotation.y,p*Math.PI*4+state.pointer.x*.32,4.5,delta);mark.current.rotation.x=THREE.MathUtils.damp(mark.current.rotation.x,Math.sin(p*Math.PI*2)*.18-state.pointer.y*.18,4.5,delta);mark.current.position.y=reduced?0:Math.sin(state.clock.elapsedTime*.8)*.12;}if(orbit.current&&!reduced)orbit.current.rotation.z+=delta*.035;target.set(Math.sin(p*Math.PI*1.1)*.72,Math.sin(p*Math.PI*2)*.32,7.2-Math.sin(p*Math.PI)*.65);state.camera.position.lerp(target,.035);state.camera.lookAt(0,0,0);});
 return <><group ref={mark}><Float speed={reduced?0:1.3} rotationIntensity={.08} floatIntensity={.18}>
  <RoundedBox args={[.52,3.65,.5]} radius={.12} smoothness={5} position={[-.76,.28,0]} rotation={[0,0,.47]}><meshPhysicalMaterial color="#081826" emissive="#00cbe3" emissiveIntensity={1.5} metalness={.92} roughness={.18} clearcoat={1}/></RoundedBox>
  <RoundedBox args={[.52,3.65,.5]} radius={.12} smoothness={5} position={[.76,.28,0]} rotation={[0,0,-.47]}><meshPhysicalMaterial color="#120d2b" emissive="#7048d8" emissiveIntensity={1.35} metalness={.92} roughness={.18} clearcoat={1}/></RoundedBox>
  <mesh position={[0,-1.36,.04]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.42,.026,12,80]}/><meshBasicMaterial color="#d5fbff" transparent opacity={.8}/></mesh>
 </Float></group><group ref={orbit}>
 {[2.6,3.65,4.7].map((r,i)=><mesh key={r} rotation={[Math.PI/2+i*.16,i*.22,0]}><torusGeometry args={[r,.007,6,160]}/><meshBasicMaterial color={i%2?"#8b5cf6":"#00e5ff"} transparent opacity={.2-i*.035}/></mesh>)}
 {nodes[0].map((pos,i)=><group key={i}><Line points={[[0,0,0],pos]} color={i%2?"#8b5cf6":"#00e5ff"} lineWidth={.45} transparent opacity={.22}/><mesh position={pos}><sphereGeometry args={[.075,14,14]}/><meshBasicMaterial color={i%2?"#a78bfa":"#67e8f9"}/></mesh></group>)}</group>
 <Sparkles count={reduced?70:260} scale={[12,8,8]} size={1.7} speed={reduced?0:.18} color="#d9fbff"/><Sparkles count={reduced?20:90} scale={[8,5,4]} size={2.5} speed={reduced?0:.1} color="#8b5cf6"/></>;
}
export function VexoraCoreCanvas({progressRef}:{progressRef:MutableRefObject<number>}){return <Canvas aria-hidden dpr={[1,1.5]} camera={{position:[0,0,7.2],fov:42}} gl={{antialias:true,alpha:true,powerPreference:"high-performance"}}><ambientLight intensity={.5}/><pointLight position={[4,4,5]} color="#00e5ff" intensity={38}/><pointLight position={[-4,-2,4]} color="#8b5cf6" intensity={32}/><Mark progressRef={progressRef}/></Canvas>;}
