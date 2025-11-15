import Link from "next/link";
import { FileText, DownloadCloud, RefreshCcw, Award, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formats = [
  { label: "Download PDF", format: "pdf", icon: FileText },
  { label: "Download Excel", format: "xlsx", icon: DownloadCloud }
];

const goodWorkPeriods = [
  { label: "This Week", period: "week" },
  { label: "This Month", period: "month" },
  { label: "This Quarter", period: "quarter" }
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100">Reports & Exports</h1>
        <p className="text-sm text-slate-400">
          Generate detailed performance reports in PDF or Excel format. Each export includes KPI
          breakdowns, ranking summaries, and officer scorecards.
        </p>
      </div>
      <Card className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          {formats.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.format}
                asChild
                className="gap-2"
              >
                <Link href={`/api/reports?format=${item.format}`}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 text-sm text-slate-400">
          <p>
            Reports include officer details, KPI statistics, weighted scores, ranking positions, and
            recognition history summaries. Use the Excel export for further analysis or share the PDF
            with leadership.
          </p>
        </div>
      </Card>
      <Card className="space-y-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-gold/20">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-5 w-5 text-gold" />
          <div>
            <h2 className="text-lg font-semibold text-slate-200">Good Work Done Report</h2>
            <p className="text-xs text-slate-400">
              Auto-generated reports highlighting exceptional performance with AI insights and natural language summaries.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {goodWorkPeriods.map((period) => (
              <div key={period.period} className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-gold/40 text-gold hover:bg-gold/10"
                >
                  <Link href={`/api/reports/good-work?format=pdf&period=${period.period}`}>
                    <FileText className="h-4 w-4 mr-2" />
                    {period.label} (PDF)
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gold/40 text-gold hover:bg-gold/10"
                >
                  <Link href={`/api/reports/good-work?format=xlsx&period=${period.period}`}>
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    {period.label} (Excel)
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-gold/20 bg-gold/5 p-3 text-xs text-slate-300">
            <p>
              <strong>Includes:</strong> Top performers, district highlights, AI-generated summaries,
              key statistics, and achievement breakdowns.
            </p>
          </div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center gap-3">
          <RefreshCcw className="h-5 w-5 text-gold" />
          <div>
            <h2 className="text-lg font-semibold text-slate-200">Need fresh analytics?</h2>
            <p className="text-xs text-slate-500">
              Trigger the Python analytics microservice to recalculate scores before exporting.
            </p>
          </div>
        </div>
        <Button asChild variant="secondary" className="w-fit">
          <Link href="/analytics?action=refresh">Trigger Analytics Refresh</Link>
        </Button>
      </Card>
    </div>
  );
}


