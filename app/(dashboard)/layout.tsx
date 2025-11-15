import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { ProtectedShell } from "@/components/layout/ProtectedShell";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <ProtectedShell username={user.username}>{children}</ProtectedShell>;
}


