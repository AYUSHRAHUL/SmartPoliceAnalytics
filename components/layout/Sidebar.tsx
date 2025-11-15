"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Award, FileText, Users, Shield, Upload, MapPin, Target, Globe, ClipboardList } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: BarChart2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Award },
  { href: "/analytics", label: "Analytics", icon: Shield },
  { href: "/districts", label: "Districts", icon: MapPin },
  { href: "/drives", label: "Drives", icon: Target },
  { href: "/special-drives", label: "Special Drives", icon: ClipboardList },
  { href: "/map", label: "Map View", icon: Globe },
  { href: "/recognitions", label: "Recognitions", icon: Award },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/data-ingestion", label: "Data Ingestion", icon: Upload },
  { href: "/admin", label: "Admin", icon: Users }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-800 bg-[#101931]">
      <div className="p-6">
        <h2 className="text-sm uppercase tracking-wide text-slate-400">Navigation</h2>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                active
                  ? "bg-gold/20 text-gold border border-gold/40"
                  : "text-slate-300 hover:bg-indigoPolice hover:text-gold"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-slate-500 border-t border-slate-800">
        © {new Date().getFullYear()} Team Innosphere. All rights reserved.
      </div>
    </aside>
  );
}


