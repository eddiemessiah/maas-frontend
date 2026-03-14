"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Users, Database, Settings, Activity, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "TELEMETRY", icon: LayoutDashboard, href: "/dashboard" },
    { name: "AGENTS", icon: Users, href: "/dashboard/agents" },
    { name: "MEMORY", icon: Database, href: "/dashboard/memory" },
    { name: "CONFIG", icon: Settings, href: "/dashboard/config" },
  ];

  return (
    <div className="w-16 md:w-56 bg-zinc-950/80 backdrop-blur-md border-r border-white/10 h-screen p-4 flex flex-col z-20 relative">
      <div className="flex items-center space-x-3 mb-10 overflow-hidden">
        <div className="w-8 h-8 flex-shrink-0 border border-cyan-500/50 bg-cyan-950/30 rounded flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          <Activity size={16} className="text-cyan-400" />
        </div>
        <h1 className="text-sm font-bold text-white tracking-widest hidden md:block uppercase">OpenAgent HUD</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.name}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-all group relative overflow-hidden ${
                isActive
                  ? "bg-cyan-900/20 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-cyan-400" : "group-hover:text-zinc-300"} />
              <span className="text-xs font-semibold tracking-widest hidden md:block">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  initial={false}
                />
              )}
            </Link>
          );
        })}

        <div className="pt-4 border-t border-white/10 mt-4">
          <Link
            href="/dashboard/register"
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-all group relative overflow-hidden ${
              pathname === "/dashboard/register"
                ? "bg-emerald-900/20 text-emerald-400 border border-emerald-500/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]"
                : "text-emerald-500 hover:text-emerald-300 hover:bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            }`}
          >
            <Plus size={18} className={pathname === "/dashboard/register" ? "text-emerald-400" : "group-hover:text-emerald-300"} />
            <span className="text-xs font-bold tracking-widest hidden md:block">REGISTER AGENT</span>
            {pathname === "/dashboard/register" && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                initial={false}
              />
            )}
          </Link>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 hidden md:block">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)] animate-pulse" />
          <span className="text-xs text-emerald-400 tracking-wider font-semibold uppercase">Sys Online</span>
        </div>
        <p className="text-[10px] text-zinc-500 font-mono truncate">API: {process.env.NEXT_PUBLIC_API_BASE_URL || "Connected"}</p>
      </div>
    </div>
  );
}
