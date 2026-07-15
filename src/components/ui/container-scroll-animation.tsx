"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue, type MotionStyle,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerScrollProps {
  titleComponent: ReactNode;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
}

export function ContainerScroll({
  titleComponent,
  children,
  className,
  frameClassName,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const rotateX = useTransform(progress, [0.08, 0.48, 0.82], [isMobile ? 9 : 18, 0, -3]);
  const scale = useTransform(progress, [0.08, 0.48, 0.82], [isMobile ? 0.86 : 0.91, 1, 0.98]);
  const translateY = useTransform(progress, [0.08, 0.48, 0.82], [isMobile ? 48 : 110, 0, -40]);
  const glow = useTransform(progress, [0.1, 0.48, 0.8], [0.12, 0.5, 0.18]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex min-h-[72rem] items-center justify-center md:min-h-[88rem]", className)}
    >
      <div className="relative w-full py-24 [perspective:1400px] md:py-36">
        <ScrollHeader translateY={translateY}>{titleComponent}</ScrollHeader>
        <ScrollFrame
          rotateX={rotateX}
          scale={scale}
          translateY={translateY}
          glow={glow}
          className={frameClassName}
        >
          {children}
        </ScrollFrame>
      </div>
    </div>
  );
}

function ScrollHeader({ children, translateY }: { children: ReactNode; translateY: MotionValue<number> }) {
  return (
    <motion.div style={{ y: translateY }} className="relative z-10 mx-auto max-w-5xl text-center">
      {children}
    </motion.div>
  );
}

function ScrollFrame({
  rotateX,
  scale,
  translateY,
  glow,
  children,
  className,
}: {
  rotateX: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
  glow: MotionValue<number>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      style={{ rotateX, scale, y: translateY, "--frame-glow": glow } as MotionStyle & Record<"--frame-glow", MotionValue<number>>}
      className={cn(
        "pointer-events-none relative mx-auto mt-14 h-[34rem] w-full max-w-6xl rounded-[1.75rem] border border-white/15 bg-[#070b15] p-2 shadow-[0_48px_140px_rgba(0,0,0,.72)]  md:h-[43rem] md:rounded-[2.25rem] md:p-3",
        "before:absolute before:inset-x-[12%] before:-bottom-12 before:h-28 before:rounded-full before:bg-cyan-400/20 before:blur-[70px] before:opacity-[var(--frame-glow)]",
        className,
      )}
    >
      <div className="pointer-events-auto relative h-full overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#040711] md:rounded-[1.7rem]">
        {children}
      </div>
    </motion.div>
  );
}
