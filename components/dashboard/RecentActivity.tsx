"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Activity = {
  title: string;
  description: string;
  timestamp: string;
  icon: LucideIcon;
};

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0f172a] px-4 py-3">
              <div className="rounded-lg bg-gold/10 p-2 text-gold">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">{item.title}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
              <span className="text-xs text-slate-500">{item.timestamp}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}


