"use client";

import { Activity, Award, FileText, ShieldCheck, Zap } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TopPerformers } from "@/components/dashboard/TopPerformers";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";

type Summary = {
  total: number;
  avgScore: number;
  caseClosed: number;
  cyberResolved: number;
  topFive: Array<{
    id: string;
    name: string;
    badgeId: string;
    department: string;
    totalScore: number;
    caseClosed: number;
  }>;
};

export function DashboardContent({ summary }: { summary: Summary }) {
  const activities = [
    {
      title: "Daily analytics refresh completed",
      description: "Scores recalculated using latest KPI weights",
      timestamp: "2 hrs ago",
      icon: ShieldCheck
    },
    {
      title: "15 new cases closed",
      description: "District Pune reported 15 solved cases",
      timestamp: "6 hrs ago",
      icon: Activity
    },
    {
      title: "Gold recognition awarded",
      description: "Officer A0 recognised for cybercrime resolution",
      timestamp: "Yesterday",
      icon: Award
    },
    {
      title: "Monthly report generated",
      description: "PDF & Excel reports shared with HQ",
      timestamp: "2 days ago",
      icon: FileText
    }
  ];

  const quickActions = [
    {
      href: "/reports",
      label: "Generate Report",
      description: "Download PDF or Excel for leadership review",
      icon: FileText
    },
    {
      href: "/admin",
      label: "Manage Officers",
      description: "Add or update officer performance data",
      icon: ShieldCheck
    },
    {
      href: "/recognitions",
      label: "Assign Recognition",
      description: "Award Gold, Silver, or Bronze badges",
      icon: Award
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Officers" value={summary.total} subtitle="Active records in system" icon={ShieldCheck} trend="+12% vs last month" />
        <StatCard title="Average Score" value={summary.avgScore} subtitle="Weighted ML performance" icon={Activity} trend="+5.2% vs last month" />
        <StatCard title="Cases Closed" value={summary.caseClosed} subtitle="Resolved investigations" icon={FileText} trend="+18% this quarter" />
        <StatCard title="Cyber Resolved" value={summary.cyberResolved} subtitle="Cybercrime resolution count" icon={Zap} trend="+9 cases this week" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopPerformers officers={summary.topFive} />
        <RecentActivity activities={activities} />
      </div>

      <QuickActions actions={quickActions} />
    </div>
  );
}

