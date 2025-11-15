"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { MobileNav } from "./MobileNav";

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "1";

export function ProtectedShell({ children, username }: { children: ReactNode; username?: string }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100">
      <TopNav username={username} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-64px)] bg-[#0b1220]">
          <div className="space-y-2 border-b border-slate-800 bg-[#101931] px-6 py-4 text-sm text-slate-400">
            {isDemoMode && (
              <div className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-xs text-gold">
                Demo mode enabled. All analytics and leaderboard data use simulated officer records.
              </div>
            )}
            {isAdminRoute
              ? "Admin Control Center • Manage officers, weights, and recognition rules"
              : "Welcome to the Smart Police Analytics dashboard"}
          </div>
          <div className="px-6 py-6">{children}</div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}


