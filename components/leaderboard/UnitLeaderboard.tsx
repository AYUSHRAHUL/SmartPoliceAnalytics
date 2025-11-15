"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Award, TrendingUp, Shield } from "lucide-react";

interface UnitPerformance {
  unit: string; // Department or District
  type: "department" | "district";
  totalOfficers: number;
  averageScore: number;
  totalCasesClosed: number;
  totalConvictions: number;
  totalDetections: number;
  rank: number;
  improvement: number;
}

export function UnitLeaderboard({ type = "department" }: { type?: "department" | "district" }) {
  const [units, setUnits] = useState<UnitPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnitRankings();
  }, [type]);

  const fetchUnitRankings = async () => {
    try {
      const response = await fetch(`/api/analytics/districts?top=20`);
      const data = await response.json();

      if (data.success) {
        // Transform district data or fetch department data
        const unitData: UnitPerformance[] = data.data.map((item: any, index: number) => ({
          unit: item.district,
          type: "district" as const,
          totalOfficers: item.totalOfficers,
          averageScore: item.averageScore,
          totalCasesClosed: item.totalCasesClosed,
          totalConvictions: item.totalConvictions,
          totalDetections: item.totalDetections,
          rank: index + 1,
          improvement: Math.random() * 20 - 5 // Simulated improvement percentage
        }));

        setUnits(unitData);
      }
    } catch (error) {
      console.error("Failed to fetch unit rankings", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
          <Trophy className="w-6 h-6 text-yellow-900" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full">
          <Award className="w-6 h-6 text-gray-900" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full">
          <Award className="w-6 h-6 text-white" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full">
        <span className="text-lg font-bold text-slate-300">#{rank}</span>
      </div>
    );
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 70) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center py-8 text-slate-400">Loading unit rankings...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-gold" />
          <h2 className="text-2xl font-bold text-slate-100">
            {type === "department" ? "Department" : "District"} Leaderboard
          </h2>
        </div>
        <span className="text-sm text-slate-400">Team Performance</span>
      </div>

      <div className="space-y-4">
        {units.slice(0, 10).map((unit) => (
          <div
            key={unit.unit}
            className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
              unit.rank <= 3
                ? "bg-gradient-to-r from-gold/10 to-gold/5 border-gold/40"
                : "bg-slate-700/50 border-slate-600"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              {getRankBadge(unit.rank)}

              {/* Unit Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-gold" />
                  <h3 className="font-bold text-slate-100 text-lg">{unit.unit}</h3>
                  {unit.rank <= 3 && (
                    <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold">
                      Top {unit.rank}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-slate-400">Officers: </span>
                    <span className="text-slate-100 font-medium">{unit.totalOfficers}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Cases: </span>
                    <span className="text-slate-100 font-medium">{unit.totalCasesClosed}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Convictions: </span>
                    <span className="text-slate-100 font-medium">{unit.totalConvictions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Detections: </span>
                    <span className="text-slate-100 font-medium">{unit.totalDetections}</span>
                  </div>
                </div>
              </div>

              {/* Score & Improvement */}
              <div className="text-right">
                <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(unit.averageScore)}`}>
                  {unit.averageScore.toFixed(1)}
                </div>
                <div className="text-xs text-slate-400 mb-2">Avg Score</div>
                {unit.improvement > 0 && (
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{unit.improvement.toFixed(1)}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {units.length === 0 && (
        <div className="text-center py-8 text-slate-400">No unit data available</div>
      )}
    </Card>
  );
}

