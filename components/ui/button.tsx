"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "default";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", asChild = false, ...props },
  ref
) {
  const Component = asChild ? Slot : "button";
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0b1220]";
  type Variant = NonNullable<ButtonProps["variant"]> | "default";
  const sizeClass =
    props.size === "sm"
      ? "px-3 py-1 text-sm"
      : props.size === "lg"
      ? "px-6 py-3 text-base"
      : "px-4 py-2 text-sm";
  const variants: Record<Variant, string> = {
    default: "",
    primary: "bg-gold text-black hover:bg-gold/90 focus:ring-gold/50",
    secondary: "border border-gold/50 text-gold hover:bg-gold/10 focus:ring-gold/30",
    ghost: "text-slate-300 hover:text-gold hover:bg-indigoPolice",
    outline: "border border-gold/40 text-gold hover:bg-gold/10 focus:ring-gold/30"
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component ref={ref as any} className={clsx(base, sizeClass, variants[variant as Variant], className)} {...props} />;
});



