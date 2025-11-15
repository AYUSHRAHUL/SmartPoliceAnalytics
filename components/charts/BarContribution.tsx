"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";

type DepartmentPoint = {
  department: string;
  total: number;
};

export function BarContribution({ data }: { data: DepartmentPoint[] }) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-100">Department Contribution</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" />
            <XAxis dataKey="department" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 12
              }}
            />
            <Bar dataKey="total" fill="#F5C542" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}


