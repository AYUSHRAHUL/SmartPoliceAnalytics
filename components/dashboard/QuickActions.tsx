"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Action = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export function QuickActions({ actions }: { actions: Action[] }) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">Quick Actions</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-[#0f172a] p-4 transition hover:border-gold/40 hover:bg-gold/10"
            >
              <Icon className="h-5 w-5 text-gold" />
              <span className="text-sm font-semibold text-slate-200">{action.label}</span>
              <span className="text-xs text-slate-500">{action.description}</span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}


