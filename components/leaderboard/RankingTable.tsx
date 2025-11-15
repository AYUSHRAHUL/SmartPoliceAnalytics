"use client";

import { Card } from "@/components/ui/card";

type RankingRow = {
  rank: number;
  name: string;
  badgeId: string;
  department: string;
  totalScore: number;
  caseClosed: number;
  cyberResolved: number;
  feedbackScore: number;
  awarenessPrograms: number;
};

export function RankingTable({ data }: { data: RankingRow[] }) {
  return (
    <Card className="overflow-hidden">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-[#101931] text-xs uppercase tracking-wider text-slate-400">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">Officer</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-right">Score</th>
            <th className="px-4 py-3 text-right">Cases</th>
            <th className="px-4 py-3 text-right">Cyber</th>
            <th className="px-4 py-3 text-right">Feedback</th>
            <th className="px-4 py-3 text-right">Awareness</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900 text-sm text-slate-300">
          {data.map((row) => (
            <tr key={row.badgeId} className="hover:bg-gold/10">
              <td className="px-4 py-3 font-semibold text-gold">
                {row.rank <= 3 ? ["🥇", "🥈", "🥉"][row.rank - 1] : `#${row.rank}`}
              </td>
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-200">{row.name}</div>
                <div className="text-xs text-slate-500">{row.badgeId}</div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-400">{row.department}</td>
              <td className="px-4 py-3 text-right font-semibold text-gold">{row.totalScore.toFixed(2)}</td>
              <td className="px-4 py-3 text-right text-slate-400">{row.caseClosed}</td>
              <td className="px-4 py-3 text-right text-slate-400">{row.cyberResolved}</td>
              <td className="px-4 py-3 text-right text-slate-400">{row.feedbackScore.toFixed(1)}</td>
              <td className="px-4 py-3 text-right text-slate-400">{row.awarenessPrograms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}


