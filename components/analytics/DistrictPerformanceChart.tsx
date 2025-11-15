"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface DistrictPerformance {
  district: string;
  totalCasesClosed: number;
  totalConvictions: number;
  totalDetections: number;
  averageScore: number;
  convictionRatio?: number;
  nbwExecutionRate?: number;
}

export function DistrictPerformanceChart({ data }: { data: DistrictPerformance[] }) {
  const chartData = data.slice(0, 10).map((d) => ({
    district: d.district.length > 15 ? d.district.substring(0, 15) + "..." : d.district,
    "Cases Closed": d.totalCasesClosed,
    "Convictions": d.totalConvictions,
    "Detections": d.totalDetections,
    "Avg Score": Number(d.averageScore.toFixed(1))
  }));

  return (
    <Card className="p-6 bg-slate-800">
      <h3 className="text-lg font-bold text-slate-100 mb-4">District Performance Comparison</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis
            dataKey="district"
            stroke="#94a3b8"
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#f1f5f9"
            }}
          />
          <Legend />
          <Bar dataKey="Cases Closed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Convictions" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Detections" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

