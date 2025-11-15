"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BarChart2, Award, Shield, MapPin, Target, Globe, FileText, Upload, Users } from "lucide-react";

const mobileLinks = [
  { href: "/dashboard", label: "Overview", icon: BarChart2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Award },
  { href: "/analytics", label: "Analytics", icon: Shield },
  { href: "/districts", label: "Districts", icon: MapPin },
  { href: "/drives", label: "Drives", icon: Target },
  { href: "/map", label: "Map", icon: Globe },
  { href: "/recognitions", label: "Recognitions", icon: Award },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/data-ingestion", label: "Upload", icon: Upload },
  { href: "/admin", label: "Admin", icon: Users }
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gold rounded-full shadow-lg flex items-center justify-center text-slate-900 hover:bg-gold/90 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-100 mb-2">Navigation</h3>
            </div>
            <nav className="space-y-2">
              {mobileLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      active
                        ? "bg-gold/20 text-gold border border-gold/40"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

