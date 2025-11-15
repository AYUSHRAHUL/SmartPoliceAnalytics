"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Moon, Sun } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const topLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/recognitions", label: "Recognitions" },
  { href: "/reports", label: "Reports" },
  { href: "/admin", label: "Admin" }
];

export function TopNav({ username }: { username?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-indigoPolice-dark px-6 py-3">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-lg font-semibold text-gold">
          Smart Police Analytics
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-300">
          {topLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-gold transition ${
                pathname.startsWith(link.href) ? "text-gold font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={() => setDark((prev) => !prev)}
          className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-gold/60 hover:text-gold transition"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <div className="hidden md:flex flex-col text-right text-xs text-slate-400">
          <span className="text-slate-200 font-semibold">{username ?? "User"}</span>
          <span>Team Innosphere</span>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-black hover:bg-gold/90 transition"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}


