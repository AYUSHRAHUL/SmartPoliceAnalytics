"use client";

import { Card } from "@/components/ui/card";

type Performer = {
  id: string;
  name: string;
  badgeId: string;
  department: string;
  totalScore: number;
  caseClosed: number;
};

export function TopPerformers({ officers }: { officers: Performer[] }) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Top Performing Officers</h2>
        <p className="text-xs text-slate-500">Based on weighted performance score</p>
      </div>
      <div className="space-y-3">
        {officers.map((officer, index) => (
          <div
            key={officer.id}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0f172a] px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{officer.name}</p>
                <p className="text-xs text-slate-500">
                  {officer.badgeId} • {officer.department}
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p className="text-sm font-semibold text-gold">{officer.totalScore.toFixed(1)}</p>
              <p>{officer.caseClosed} cases</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}


