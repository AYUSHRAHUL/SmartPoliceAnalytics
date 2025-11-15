import { getCurrentUser } from "@/lib/session";
import { getOfficerSummary } from "@/lib/services/officers";
import { Card } from "@/components/ui/card";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const summary = await getOfficerSummary();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100">Profile & Access</h1>
        <p className="text-sm text-slate-400">
          Manage your account preferences and review system level statistics.
        </p>
      </div>
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-100">Account Overview</h2>
        <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <p className="text-xs text-slate-500">Username</p>
            <p className="text-sm font-semibold text-slate-200">{user?.username}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <p className="text-xs text-slate-500">Role</p>
            <p className="text-sm font-semibold text-gold">{user?.role}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <p className="text-xs text-slate-500">System Access</p>
            <p className="text-sm font-semibold text-slate-200">
              {user?.role === "SuperAdmin"
                ? "Full access to admin controls"
                : user?.role === "Admin"
                ? "Management access (officers, recognitions)"
                : "Officer level insights"}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-100">System Metrics</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm text-slate-300">
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <p className="text-xs text-slate-500">Total Officers</p>
            <p className="text-2xl font-bold text-gold">{summary.total}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <p className="text-xs text-slate-500">Average Score</p>
            <p className="text-2xl font-bold text-gold">{summary.avgScore}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <p className="text-xs text-slate-500">Cases Closed</p>
            <p className="text-2xl font-bold text-gold">{summary.caseClosed}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-4">
            <p className="text-xs text-slate-500">Cyber Resolved</p>
            <p className="text-2xl font-bold text-gold">{summary.cyberResolved}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}


