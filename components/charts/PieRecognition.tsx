"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/card";

type RecognitionPoint = {
  badge: string;
  count: number;
};

const COLORS = ["#FBBF24", "#93C5FD", "#F97316"];

export function PieRecognition({ data }: { data: RecognitionPoint[] }) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-100">Recognition Badge Distribution</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="badge"
              outerRadius={110}
              label={({ badge, percent }) => `${badge}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 12
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}


