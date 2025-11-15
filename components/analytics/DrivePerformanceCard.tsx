"use client";

import { Card } from "@/components/ui/card";
import { Award, Users, FileText, TrendingUp } from "lucide-react";

interface DrivePerformance {
  driveName: string;
  district?: string;
  totalCasesHandled: number;
  participatingOfficers: number;
  averageCasesPerOfficer: number;
  successRate: number;
}

export function DrivePerformanceCard({ drive }: { drive: DrivePerformance }) {
  return (
    <Card className="p-6 bg-slate-800 hover:bg-slate-750 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">{drive.driveName}</h3>
          {drive.district && (
            <p className="text-sm text-slate-400 mt-1">{drive.district}</p>
          )}
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            drive.successRate >= 80
              ? "bg-green-900/30 text-green-400"
              : drive.successRate >= 60
                ? "bg-yellow-900/30 text-yellow-400"
                : "bg-red-900/30 text-red-400"
          }`}
        >
          {drive.successRate.toFixed(0)}% Success
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Cases Handled</p>
            <p className="text-lg font-bold text-slate-100">{drive.totalCasesHandled}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-900/30 rounded-lg">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Officers</p>
            <p className="text-lg font-bold text-slate-100">{drive.participatingOfficers}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-900/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Avg per Officer</p>
            <p className="text-lg font-bold text-slate-100">
              {drive.averageCasesPerOfficer.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-gold/20 rounded-lg">
            <Award className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Success Rate</p>
            <p className="text-lg font-bold text-slate-100">{drive.successRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

