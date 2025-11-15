import { getOfficerSummary } from "@/lib/services/officers";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const summary = await getOfficerSummary();

  return <DashboardContent summary={summary} />;
}


