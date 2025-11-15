"use client";

import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NarcoticsDriveData {
  _id: string;
  district: string;
  casesRegistered: number;
  personsArrested: number;
  ganja: number;
  brownSugar: number;
  vehicles: number;
  ganjaPlantsDestroyed: number;
  bhang: number;
  opium: number;
  coughSyrup: number;
  cash: number;
  driveDate: string;
}

export function NarcoticsDriveTable({ data }: { data: NarcoticsDriveData[] }) {
  const handleExport = (format: "pdf" | "excel") => {
    window.open(`/api/reports/special-drives/narcotics?format=${format}`, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">
            Narcotics Drug Enforcement
          </h3>
          <p className="text-sm text-slate-400">Drug Seizure and Enforcement Report</p>
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
              <th className="text-right p-3 text-slate-300 font-semibold">Ganja (kg)</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Brown Sugar (kg)</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Vehicles</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Plants Destroyed</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Bhang (kg)</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Opium (kg)</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Cough Syrup</th>
              <th className="text-right p-3 text-slate-300 font-semibold">Cash Seized</th>
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
                <td className="p-3 text-right text-slate-300">{row.ganja.toFixed(2)}</td>
                <td className="p-3 text-right text-red-400 font-semibold">
                  {row.brownSugar.toFixed(2)}
                </td>
                <td className="p-3 text-right text-slate-300">{row.vehicles}</td>
                <td className="p-3 text-right text-green-400">{row.ganjaPlantsDestroyed}</td>
                <td className="p-3 text-right text-slate-300">{row.bhang.toFixed(2)}</td>
                <td className="p-3 text-right text-slate-300">{row.opium.toFixed(2)}</td>
                <td className="p-3 text-right text-slate-300">{row.coughSyrup}</td>
                <td className="p-3 text-right text-gold font-semibold">
                  {formatCurrency(row.cash)}
                </td>
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
                  {data.reduce((sum, r) => sum + r.ganja, 0).toFixed(2)}
                </td>
                <td className="p-3 text-right text-red-400">
                  {data.reduce((sum, r) => sum + r.brownSugar, 0).toFixed(2)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.vehicles, 0)}
                </td>
                <td className="p-3 text-right text-green-400">
                  {data.reduce((sum, r) => sum + r.ganjaPlantsDestroyed, 0)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.bhang, 0).toFixed(2)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.opium, 0).toFixed(2)}
                </td>
                <td className="p-3 text-right text-slate-100">
                  {data.reduce((sum, r) => sum + r.coughSyrup, 0)}
                </td>
                <td className="p-3 text-right text-gold">
                  {formatCurrency(data.reduce((sum, r) => sum + r.cash, 0))}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No narcotics enforcement data available. Add data to see the table.
        </div>
      )}
    </Card>
  );
}

