"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Activity, Server, Zap, Globe } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maas-api.up.railway.app";
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("API Fetch Error:", err));
  }, []);

  const metrics = [
    { title: "Active Sub-Agents", value: "24", icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Total Memory Indexed", value: "1.2 TB", icon: Database, color: "text-purple-400", bg: "bg-purple-400/10" },
    { title: "Compute Nodes", value: "8", icon: Server, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Avg Latency", value: "42ms", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10" }
  ];

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <header className="flex justify-between items-end mb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold tracking-tight mb-2"
              >
                Overview
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400"
              >
                Welcome back to your OpenAgent control panel.
              </motion.p>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-all text-sm font-medium">
                <Globe size={16} className="text-gray-400" />
                <span>Global Region</span>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${metric.bg}`}>
                    <metric.icon size={24} className={metric.color} />
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">{metric.title}</h3>
                <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Activity size={20} className="text-blue-400" />
                <span>Network Activity</span>
              </h3>
              <div className="h-64 flex items-end justify-between space-x-2 pb-4">
                {/* Mock Chart */}
                {[...Array(24)].map((_, i) => {
                  const height = Math.random() * 80 + 20;
                  return (
                    <div key={i} className="w-full bg-gray-800 rounded-t-sm relative group">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className="absolute bottom-0 w-full bg-blue-500/80 rounded-t-sm group-hover:bg-blue-400 transition-colors"
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Server size={20} className="text-emerald-400" />
                <span>API Status</span>
              </h3>
              {data ? (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center space-x-3 text-emerald-400 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-sm">Connection Established</span>
                    </div>
                    <pre className="text-xs text-emerald-300/70 overflow-x-auto">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 border border-dashed border-gray-700 rounded-xl">
                  <div className="flex flex-col items-center space-y-3 text-gray-500">
                    <Activity className="animate-spin" size={24} />
                    <span className="text-sm">Polling Endpoint...</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Database icon mock since we need it in the Home file too
function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}