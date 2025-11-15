"use client";

import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CasePendencyData {
  _id: string;
  district: string;
  casesReportedYear: number;
  casesPending30Days: number;
  pendencyPercent: number;
  targetCasesToClose: number;
  casesClosedInDrive: number;
  driveDate: string;
}

export function CasePendencyTable({ data }: { data: CasePendencyData[] }) {
  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">
            Special Drive to Reduce Pendency of Cognizable Cases
          </h3>
          <p className="text-sm text-slate-400">Case Pendency Reduction Report</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => window.open(`/api/reports/special-drives/case-pendency?format=excel`, "_blank")}
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
              <th className="text-left p-3 text-slate-300 font-semibold">District Name</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Cases Reported (Year)</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Cases Pending &gt; 30 Days</th>
              <th className="text-right p-3 text-slate-300 font-semibold">% Pendency</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Target Cases to Close</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Cases Closed in Drive</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const achievementRate =
                row.targetCasesToClose > 0
                  ? ((row.casesClosedInDrive / row.targetCasesToClose) * 100).toFixed(1)
                  : "0";
              return (
                <tr key={row._id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="p-3 text-slate-100 font-medium">{row.district}</td>
                  <td className="p-3 text-right text-slate-300">{row.casesReportedYear}</td>
                  <td className="p-3 text-right text-yellow-400 font-semibold">
                    {row.casesPending30Days}
                  </td>
                  <td className="p-3 text-right text-red-400 font-semibold">
                    {row.pendencyPercent.toFixed(2)}%
                  </td>
                  <td className="p-3 text-right text-slate-300">{row.targetCasesToClose}</td>
                  <td className="p-3 text-right text-green-400 font-semibold">
                    {row.casesClosedInDrive} ({achievementRate}%)
                  </td>
                </tr>
              );
            })}
          </tbody>
          {data.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-slate-600 bg-slate-700/50 font-bold">
                <td className="p-3 text-slate-100">TOTAL</td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.casesReportedYear, 0)}
                </td>
                <td className="p-3 text-right text-yellow-400">
                  {data.reduce((sum, r) => sum + r.casesPending30Days, 0)}
                </td>
                <td className="p-3 text-right text-red-400">
                  {(
                    (data.reduce((sum, r) => sum + r.casesPending30Days, 0) /
                      data.reduce((sum, r) => sum + r.casesReportedYear, 0)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.targetCasesToClose, 0)}
                </td>
                <td className="p-3 text-right text-green-400">
                  {data.reduce((sum, r) => sum + r.casesClosedInDrive, 0)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No case pendency data available. Add data to see the table.
        </div>
      )}
    </Card>
  );
}

