"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface SummaryData {
  district: string;
  value: number;
  label: string;
}

export function DriveSummaryChart({
  data,
  title,
  metric
}: {
  data: SummaryData[];
  title: string;
  metric: string;
}) {
  const chartData = data.map((d) => ({
    district: d.district.length > 10 ? d.district.substring(0, 10) + "..." : d.district,
    [metric]: d.value
  }));

  return (
    <Card className="p-6 bg-slate-800">
      <h3 className="text-lg font-bold text-slate-100 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
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
          <Bar dataKey={metric} fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

