"use client";

import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

type Recognition = {
  id: string;
  badge: string;
  month: string;
  recognizedBy: string;
  message?: string;
  officer: {
    name: string;
    badgeId: string;
    department: string;
  };
};

const badgeStyles: Record<string, { bg: string; text: string }> = {
  Gold: { bg: "bg-amber-500/20", text: "text-amber-300" },
  Silver: { bg: "bg-slate-500/20", text: "text-slate-200" },
  Bronze: { bg: "bg-orange-500/20", text: "text-orange-300" }
};

export function RecognitionTimeline({ items }: { items: Recognition[] }) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">Recognition Timeline</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`rounded-full p-3 ${badgeStyles[item.badge].bg}`}>
                <Award className={`h-5 w-5 ${badgeStyles[item.badge].text}`} />
              </div>
              <div className="mt-1 h-full w-px bg-slate-800" />
            </div>
            <div className="flex-1 rounded-xl border border-slate-800 bg-[#0f172a] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    {item.officer.name} ({item.officer.badgeId})
                  </p>
                  <p className="text-xs text-slate-500">{item.officer.department}</p>
                </div>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  {item.month}
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs text-slate-400">
                <p>
                  <span className="font-semibold text-slate-300">{item.badge}</span> badge awarded by{" "}
                  <span className="font-semibold text-slate-300">{item.recognizedBy}</span>
                </p>
                {item.message && <p className="rounded-lg border border-slate-800 bg-[#111b33] p-3 text-slate-300">{item.message}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}


