"use client";

import { Card } from "@/components/ui/card";
import { Brain, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";

interface PerformancePrediction {
  district: string;
  currentScore: number;
  predictedScore: number;
  riskLevel: "low" | "medium" | "high";
  factors: string[];
  recommendation: string;
}

interface NLSummary {
  summary: string;
  highlights: string[];
  topPerformer?: string;
  areaOfConcern?: string;
}

export function AIInsightsPanel({
  predictions,
  summary
}: {
  predictions: PerformancePrediction[];
  summary: NLSummary;
}) {
  const highRisk = predictions.filter((p) => p.riskLevel === "high");
  const mediumRisk = predictions.filter((p) => p.riskLevel === "medium");

  return (
    <div className="space-y-6">
      {/* Natural Language Summary */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-gold/20">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-bold text-slate-100">AI-Generated Summary</h3>
        </div>
        <p className="text-slate-300 leading-relaxed mb-4">{summary.summary}</p>
        {summary.highlights.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-400">Key Highlights:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              {summary.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Risk Predictions */}
      <Card className="p-6 bg-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-slate-100">Performance Predictions</h3>
        </div>

        {highRisk.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h4 className="font-semibold text-red-400">High Risk Districts</h4>
            </div>
            <div className="space-y-3">
              {highRisk.slice(0, 3).map((pred, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-slate-100">{pred.district}</h5>
                    <span className="text-sm text-red-400">
                      {pred.currentScore.toFixed(1)} → {pred.predictedScore.toFixed(1)}
                    </span>
                  </div>
                  {pred.factors.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-400 mb-2">
                      {pred.factors.map((factor, fIdx) => (
                        <li key={fIdx}>{factor}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-xs text-slate-300">{pred.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {mediumRisk.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <h4 className="font-semibold text-yellow-400">Medium Risk Districts</h4>
            </div>
            <div className="space-y-2">
              {mediumRisk.slice(0, 3).map((pred, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-100">{pred.district}</span>
                    <span className="text-xs text-yellow-400">
                      Score: {pred.currentScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

