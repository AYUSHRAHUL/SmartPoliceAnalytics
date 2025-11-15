"use client";

import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FirearmsDriveData {
  _id: string;
  district: string;
  casesRegistered: number;
  personsArrested: number;
  gunsRifles: number;
  pistols: number;
  revolvers: number;
  mouzers: number;
  ak47: number;
  slr: number;
  others: number;
  ammunition: number;
  cartridges: number;
  driveDate: string;
}

export function FirearmsDriveTable({ data }: { data: FirearmsDriveData[] }) {
  const handleExport = (format: "pdf" | "excel") => {
    window.open(`/api/reports/special-drives/firearms?format=${format}`, "_blank");
  };

  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">
            Special Drive Against Illegal Firearms
          </h3>
          <p className="text-sm text-slate-400">Weapons Seizure and Arrest Report</p>
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
              <th className="text-right p-3 text-slate-300 font-semibold">Cases</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Arrested</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Guns/Rifles</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Pistols</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Revolvers</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Mouzers</th>
              <th className="text-right p-3 text-slate-300 font-semibold">AK-47</th>
              <th className="text-right p-3 text-slate-300 font-semibold">SLR</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Others</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Ammunition</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Cartridges</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="p-3 text-slate-100 font-medium">{row.district}</td>
                <td className="p-3 text-right text-blue-400 font-semibold">
                  {row.casesRegistered}
                </td>
                <td className="p-3 text-right text-green-400 font-semibold">
                  {row.personsArrested}
                </td>
                <td className="p-3 text-right text-slate-300">{row.gunsRifles}</td>
                <td className="p-3 text-right text-slate-300">{row.pistols}</td>
                <td className="p-3 text-right text-slate-300">{row.revolvers}</td>
                <td className="p-3 text-right text-slate-300">{row.mouzers}</td>
                <td className="p-3 text-right text-red-400 font-semibold">{row.ak47}</td>
                <td className="p-3 text-right text-slate-300">{row.slr}</td>
                <td className="p-3 text-right text-slate-300">{row.others}</td>
                <td className="p-3 text-right text-slate-300">{row.ammunition}</td>
                <td className="p-3 text-right text-slate-300">{row.cartridges}</td>
              </tr>
            ))}
          </tbody>
          {data.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-slate-600 bg-slate-700/50 font-bold">
                <td className="p-3 text-slate-100">TOTAL</td>
                <td className="p-3 text-right text-blue-400">
                  {data.reduce((sum, r) => sum + r.casesRegistered, 0)}
                </td>
                <td className="p-3 text-right text-green-400">
                  {data.reduce((sum, r) => sum + r.personsArrested, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.gunsRifles, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.pistols, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.revolvers, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.mouzers, 0)}
                </td>
                <td className="p-3 text-right text-red-400">
                  {data.reduce((sum, r) => sum + r.ak47, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.slr, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.others, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.ammunition, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.cartridges, 0)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No firearms drive data available. Add data to see the table.
        </div>
      )}
    </Card>
  );
}

