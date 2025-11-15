"use client";

import { Card } from "@/components/ui/card";

type Officer = {
  id: string;
  name: string;
  badgeId: string;
  department: string;
  designation: string;
  totalScore: number;
};

export function OfficerList({ officers }: { officers: Officer[] }) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Recently Updated Officers</h2>
        <span className="text-xs text-slate-500">{officers.length} records</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {officers.map((officer) => (
          <div key={officer.id} className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-200">{officer.name}</p>
                <p className="text-xs text-slate-500">
                  {officer.badgeId} • {officer.designation}
                </p>
              </div>
              <span className="text-sm font-semibold text-gold">{officer.totalScore.toFixed(1)}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">{officer.department}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}


