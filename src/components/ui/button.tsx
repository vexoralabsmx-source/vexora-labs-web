import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-xs font-semibold uppercase tracking-[.16em] transition duration-300 disabled:pointer-events-none disabled:opacity-50", {
  variants: { variant: {
    primary: "border-cyan-300 bg-cyan-300 text-slate-950 hover:bg-white hover:border-white",
    secondary: "border-white/15 bg-white/[.06] text-white hover:bg-white/10",
    outline: "border-white/25 bg-transparent text-white hover:border-cyan-300/60",
    ghost: "border-transparent bg-transparent text-white hover:bg-white/[.06]",
  } },
  defaultVariants: { variant: "primary" },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
export { buttonVariants };
