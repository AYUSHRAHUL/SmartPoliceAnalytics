"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TrendDataPoint {
  period: string;
  value: number;
}

interface TrendAnalysis {
  data: TrendDataPoint[];
  trend: "increasing" | "decreasing" | "stable";
  changePercent: number;
  average: number;
}

export function TrendChart({
  data,
  title,
  metric
}: {
  data: TrendAnalysis;
  title: string;
  metric: string;
}) {
  const chartData = data.data.map((d) => ({
    period: d.period,
    value: d.value
  }));

  const getTrendIcon = () => {
    switch (data.trend) {
      case "increasing":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "decreasing":
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getTrendColor = () => {
    switch (data.trend) {
      case "increasing":
        return "#10b981";
      case "decreasing":
        return "#ef4444";
      default:
        return "#f59e0b";
    }
  };

  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-100">{title}</h3>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span
            className={`text-sm font-semibold ${
              data.trend === "increasing"
                ? "text-green-400"
                : data.trend === "decreasing"
                  ? "text-red-400"
                  : "text-yellow-400"
            }`}
          >
            {data.changePercent > 0 ? "+" : ""}
            {data.changePercent.toFixed(1)}%
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis
            dataKey="period"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#f1f5f9"
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={getTrendColor()}
            strokeWidth={3}
            dot={{ fill: getTrendColor(), r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Average: {data.average.toFixed(2)}</span>
        <span>Periods: {data.data.length}</span>
      </div>
    </Card>
  );
}

