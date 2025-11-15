"use client";

import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NBWDriveData {
  _id: string;
  district: string;
  totalNBWPendingStart: number;
  nbwReceived: number;
  total: number;
  nbwExecutedDuringDrive: number;
  nbwOtherwiseDisposed: number;
  totalDisposed: number;
  nbwPendingEnd: number;
  nbwExecutedSTGR: number;
  nbwExecutedST: number;
  nbwExecutedGR: number;
  nbwExecutedOther: number;
  totalRecalled: number;
  returned: number;
  totalBefore: number;
  driveDate: string;
}

export function NBWDriveTable({ data }: { data: NBWDriveData[] }) {
  const handleExport = (format: "pdf" | "excel") => {
    window.open(`/api/reports/special-drives/nbw?format=${format}`, "_blank");
  };

  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">
            Special Drive Against Pending NBWs
          </h3>
          <p className="text-sm text-slate-400">Non-Bailable Warrants Execution Report</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport("pdf")}
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button
            onClick={() => handleExport("excel")}
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
              <th className="text-right p-3 text-slate-300 font-semibold">Pending Start</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Received</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Executed</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Otherwise Disposed</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Total Disposed</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Pending End</th>
              <th className="text-right p-3 text-slate-300 font-semibold">ST/GR</th>
              <th className="text-right p-3 text-slate-300 font-semibold">ST</th>
              <th className="text-right p-3 text-slate-300 font-semibold">GR</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Other</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="p-3 text-slate-100 font-medium">{row.district}</td>
                <td className="p-3 text-right text-slate-300">{row.totalNBWPendingStart}</td>
                <td className="p-3 text-right text-slate-300">{row.nbwReceived}</td>
                <td className="p-3 text-right text-green-400 font-semibold">
                  {row.nbwExecutedDuringDrive}
                </td>
                <td className="p-3 text-right text-slate-300">{row.nbwOtherwiseDisposed}</td>
                <td className="p-3 text-right text-blue-400 font-semibold">
                  {row.totalDisposed}
                </td>
                <td className="p-3 text-right text-yellow-400 font-semibold">
                  {row.nbwPendingEnd}
                </td>
                <td className="p-3 text-right text-slate-300">{row.nbwExecutedSTGR}</td>
                <td className="p-3 text-right text-slate-300">{row.nbwExecutedST}</td>
                <td className="p-3 text-right text-slate-300">{row.nbwExecutedGR}</td>
                <td className="p-3 text-right text-slate-300">{row.nbwExecutedOther}</td>
              </tr>
            ))}
          </tbody>
          {data.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-slate-600 bg-slate-700/50 font-bold">
                <td className="p-3 text-slate-100">TOTAL</td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.totalNBWPendingStart, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.nbwReceived, 0)}
                </td>
                <td className="p-3 text-right text-green-400">
                  {data.reduce((sum, r) => sum + r.nbwExecutedDuringDrive, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.nbwOtherwiseDisposed, 0)}
                </td>
                <td className="p-3 text-right text-blue-400">
                  {data.reduce((sum, r) => sum + r.totalDisposed, 0)}
                </td>
                <td className="p-3 text-right text-yellow-400">
                  {data.reduce((sum, r) => sum + r.nbwPendingEnd, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.nbwExecutedSTGR, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.nbwExecutedST, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.nbwExecutedGR, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.nbwExecutedOther, 0)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No NBW drive data available. Add data to see the table.
        </div>
      )}
    </Card>
  );
}

