"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Users, Database, Settings } from "lucide-react";

export function Sidebar() {
  const navItems = [
    { name: "Overview", icon: LayoutDashboard, active: true },
    { name: "Agents", icon: Users, active: false },
    { name: "Memory Logs", icon: Database, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-screen p-6 hidden md:flex flex-col">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/50 flex items-center justify-center">
          <span className="text-white font-bold">OC</span>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">OpenAgent Cloud</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
            {item.active && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                initial={false}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          <span className="text-sm text-gray-300">System Online</span>
        </div>
        <p className="text-xs text-gray-500 mt-2 truncate">API: {process.env.NEXT_PUBLIC_API_BASE_URL || "Connected"}</p>
      </div>
    </div>
  );
}