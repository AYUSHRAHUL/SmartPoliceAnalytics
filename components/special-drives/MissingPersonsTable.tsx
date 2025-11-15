"use client";

import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MissingPersonsData {
  _id: string;
  district: string;
  boyMissingStart: number;
  boyMissingDuring: number;
  boyTraced: number;
  girlMissingStart: number;
  girlMissingDuring: number;
  girlTraced: number;
  maleMissingStart: number;
  maleMissingDuring: number;
  maleTraced: number;
  femaleMissingStart: number;
  femaleMissingDuring: number;
  femaleTraced: number;
  driveDate: string;
}

export function MissingPersonsTable({ data }: { data: MissingPersonsData[] }) {
  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Special Drive Against Missing Persons</h3>
          <p className="text-sm text-slate-400">Missing Persons Tracking Report</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => window.open(`/api/reports/special-drives/missing-persons?format=excel`, "_blank")}
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-3 text-slate-300 font-semibold">District</th>
              <th className="text-right p-3 text-slate-300 font-semibold" colSpan={3}>
                Boys
              </th>
              <th className="text-right p-3 text-slate-300 font-semibold" colSpan={3}>
                Girls
              </th>
              <th className="text-right p-3 text-slate-300 font-semibold" colSpan={3}>
                Males
              </th>
              <th className="text-right p-3 text-slate-300 font-semibold" colSpan={3}>
                Females
              </th>
            </tr>
            <tr className="border-b border-slate-700">
              <th></th>
              <th className="text-right p-2 text-xs text-slate-400">Start</th>
              <th className="text-right p-2 text-xs text-slate-400">During</th>
              <th className="text-right p-2 text-xs text-slate-400">Traced</th>
              <th className="text-right p-2 text-xs text-slate-400">Start</th>
              <th className="text-right p-2 text-xs text-slate-400">During</th>
              <th className="text-right p-2 text-xs text-slate-400">Traced</th>
              <th className="text-right p-2 text-xs text-slate-400">Start</th>
              <th className="text-right p-2 text-xs text-slate-400">During</th>
              <th className="text-right p-2 text-xs text-slate-400">Traced</th>
              <th className="text-right p-2 text-xs text-slate-400">Start</th>
              <th className="text-right p-2 text-xs text-slate-400">During</th>
              <th className="text-right p-2 text-xs text-slate-400">Traced</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="p-3 text-slate-100 font-medium">{row.district}</td>
                <td className="p-3 text-right text-slate-300">{row.boyMissingStart}</td>
                <td className="p-3 text-right text-slate-300">{row.boyMissingDuring}</td>
                <td className="p-3 text-right text-green-400 font-semibold">{row.boyTraced}</td>
                <td className="p-3 text-right text-slate-300">{row.girlMissingStart}</td>
                <td className="p-3 text-right text-slate-300">{row.girlMissingDuring}</td>
                <td className="p-3 text-right text-green-400 font-semibold">{row.girlTraced}</td>
                <td className="p-3 text-right text-slate-300">{row.maleMissingStart}</td>
                <td className="p-3 text-right text-slate-300">{row.maleMissingDuring}</td>
                <td className="p-3 text-right text-green-400 font-semibold">{row.maleTraced}</td>
                <td className="p-3 text-right text-slate-300">{row.femaleMissingStart}</td>
                <td className="p-3 text-right text-slate-300">{row.femaleMissingDuring}</td>
                <td className="p-3 text-right text-green-400 font-semibold">{row.femaleTraced}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No missing persons data available. Add data to see the table.
        </div>
      )}
    </Card>
  );
}

