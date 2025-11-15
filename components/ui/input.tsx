"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-lg border border-slate-700 bg-[#101931] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 transition",
        className
      )}
      {...props}
    />
  );
});


