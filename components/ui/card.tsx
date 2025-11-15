"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={clsx("rounded-2xl border border-slate-800 bg-[#111b33] shadow-lg shadow-black/10", className)}>
      {children}
    </div>
  );
}


