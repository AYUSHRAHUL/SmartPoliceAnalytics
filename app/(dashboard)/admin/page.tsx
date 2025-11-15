import { getAdminDashboard } from "@/lib/services/admin";
import { Card } from "@/components/ui/card";
import { KpiWeightsForm } from "@/components/admin/KpiWeightsForm";
import { OfficerList } from "@/components/admin/OfficerList";
import { AdminList } from "@/components/admin/AdminList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminPage() {
  const { officers, kpiWeights, admins } = await getAdminDashboard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Admin Control Center</h1>
        <p className="text-sm text-slate-400">
          Manage officers, adjust KPI weightings, and control admin access.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">KPI Weight Configuration</h2>
            <p className="text-xs text-slate-500">Ensure weights sum to 1. Analytics service uses these weights when scoring officers.</p>
          </div>
          <KpiWeightsForm initial={kpiWeights} />
        </Card>
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Add Officer</h2>
              <p className="text-xs text-slate-500">
                Use the officer management workspace to insert or edit records.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/admin/officers">Open Officer Manager</Link>
            </Button>
          </div>
          <div className="rounded-xl border border-dashed border-slate-700 bg-[#0f172a] p-4 text-xs text-slate-500">
            Coming soon: inline officer creation directly from this dashboard.
          </div>
        </Card>
      </div>

      <OfficerList officers={officers} />
      <AdminList admins={admins} />
    </div>
  );
}


