"use client";

import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import clsx from "clsx";

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = "up"
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down";
}) {
  return (
    <Card className="relative overflow-hidden border-slate-800 bg-gradient-to-br from-[#111b33] via-[#0f172a] to-[#0b1220] p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
          <h3 className="text-3xl font-bold text-gold">{value}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="rounded-full border border-gold/40 bg-gold/10 p-3 text-gold">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {trend && (
        <div
          className={clsx(
            "mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs",
            trendDirection === "up"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "bg-red-500/10 text-red-400 border border-red-500/30"
          )}
        >
          {trendDirection === "up" ? "▲" : "▼"} {trend}
        </div>
      )}
    </Card>
  );
}


