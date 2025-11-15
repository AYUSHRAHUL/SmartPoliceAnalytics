"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";

type TrendPoint = {
  month: string;
  average: number;
};

export function LineTrend({ data }: { data: TrendPoint[] }) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-100">Average Performance Trend</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 12
              }}
            />
            <Line type="monotone" dataKey="average" stroke="#F5C542" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}


