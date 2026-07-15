"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.00024);
    const camera = new THREE.PerspectiveCamera(55, 1, 1, 9000);
    camera.position.set(0, 460, 1500);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x030712, 0);
    container.appendChild(renderer.domElement);

    const amountX = 52;
    const amountZ = 64;
    const separation = 105;
    const positions = new Float32Array(amountX * amountZ * 3);
    const colors = new Float32Array(amountX * amountZ * 3);
    const cyan = new THREE.Color("#00e5ff");
    const violet = new THREE.Color("#8b5cf6");
    let cursor = 0;
    for (let x = 0; x < amountX; x += 1) {
      for (let z = 0; z < amountZ; z += 1) {
        const offset = cursor * 3;
        positions[offset] = x * separation - (amountX * separation) / 2;
        positions[offset + 1] = 0;
        positions[offset + 2] = z * separation - (amountZ * separation) / 2;
        const mixed = cyan.clone().lerp(violet, z / amountZ);
        colors[offset] = mixed.r;
        colors[offset + 1] = mixed.g;
        colors[offset + 2] = mixed.b;
        cursor += 1;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 8, vertexColors: true, transparent: true, opacity: 0.72, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(geometry, material));

    let visible = true;
    let frame = 0;
    let time = 0;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      camera.aspect = Math.max(width, 1) / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
    };
    const render = () => {
      if (!visible) return;
      if (!reducedMotion) {
        time += 0.018;
        const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
        const array = attribute.array as Float32Array;
        let i = 0;
        for (let x = 0; x < amountX; x += 1) {
          for (let z = 0; z < amountZ; z += 1) {
            array[i * 3 + 1] = Math.sin((x + time) * 0.32) * 54 + Math.sin((z + time) * 0.22) * 72;
            i += 1;
          }
        }
        attribute.needsUpdate = true;
        camera.position.x += (pointer.x * 110 - camera.position.x) * 0.025;
        camera.position.y += (460 + pointer.y * 60 - camera.position.y) * 0.025;
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(render);
    }, { rootMargin: "150px" });
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reducedMotion]);

  return <div ref={containerRef} aria-hidden className={cn("pointer-events-none absolute inset-0", className)} {...props} />;
}
