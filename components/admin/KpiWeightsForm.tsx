"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type KpiWeights = {
  caseClosedWeight: number;
  cyberResolvedWeight: number;
  feedbackWeight: number;
  awarenessWeight: number;
};

export function KpiWeightsForm({ initial }: { initial: KpiWeights }) {
  const [weights, setWeights] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const updateWeight = (key: keyof KpiWeights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await axios.put("/api/kpiweights", weights);
      setMessage("Weights updated successfully");
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setMessage(axiosError?.response?.data?.message ?? "Failed to update weights");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
        <label className="space-y-1">
          <span>Case Closed Weight</span>
          <Input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={weights.caseClosedWeight}
            onChange={(e) => updateWeight("caseClosedWeight", Number(e.target.value))}
          />
        </label>
        <label className="space-y-1">
          <span>Cyber Resolved Weight</span>
          <Input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={weights.cyberResolvedWeight}
            onChange={(e) => updateWeight("cyberResolvedWeight", Number(e.target.value))}
          />
        </label>
        <label className="space-y-1">
          <span>Feedback Weight</span>
          <Input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={weights.feedbackWeight}
            onChange={(e) => updateWeight("feedbackWeight", Number(e.target.value))}
          />
        </label>
        <label className="space-y-1">
          <span>Awareness Weight</span>
          <Input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={weights.awarenessWeight}
            onChange={(e) => updateWeight("awarenessWeight", Number(e.target.value))}
          />
        </label>
      </div>
      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? "Saving..." : "Update KPI Weights"}
      </Button>
      {message && <p className="text-center text-xs text-slate-400">{message}</p>}
    </form>
  );
}


