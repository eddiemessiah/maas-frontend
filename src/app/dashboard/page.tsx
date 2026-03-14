"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Activity, Server, Cpu, Network, Zap } from "lucide-react";
import { useReadContract } from 'wagmi'

const registryAddress = "0x5818d8A494a0aa7C9eB2Fa6aFCBbd28f02e527E6" as const;
const registryABI = [
  {
    "inputs": [],
    "name": "getAllAgents",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export default function Home() {
  const [data, setData] = useState<any>(null);

  // Read AgentRegistry from Celo Sepolia
  const { data: agentsData } = useReadContract({
    address: registryAddress,
    abi: registryABI,
    functionName: 'getAllAgents',
  })

  const agentCount = agentsData ? (agentsData as any[]).length : 0;

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maas-api.up.railway.app";
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("API Fetch Error:", err));
  }, []);

  const metrics = [
    { title: "ACTIVE SUB-AGENTS", value: agentCount.toString(), unit: "UNITS", icon: Network, color: "text-cyan-400", border: "border-cyan-500/20", shadow: "shadow-[0_0_15px_rgba(6,182,212,0.1)]" },
    { title: "TOTAL MEMORY INDEXED", value: "1.2", unit: "TB", icon: Server, color: "text-purple-400", border: "border-purple-500/20", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.1)]" },
    { title: "COMPUTE NODES", value: "8", unit: "ACTIVE", icon: Cpu, color: "text-emerald-400", border: "border-emerald-500/20", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.1)]" },
    { title: "AVG LATENCY", value: "42", unit: "MS", icon: Zap, color: "text-amber-400", border: "border-amber-500/20", shadow: "shadow-[0_0_15px_rgba(245,158,11,0.1)]" }
  ];

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden radar-grid relative">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 border-b border-white/10 pb-6">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold tracking-widest text-white uppercase"
              >
                Telemetry Command
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-zinc-500 tracking-widest uppercase mt-1"
              >
                HUD initialized. Systems operational.
              </motion.p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <div className="flex items-center space-x-2 bg-zinc-900/50 px-3 py-1.5 border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>LINK: SECURE</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-zinc-950/40 backdrop-blur-md border ${metric.border} p-5 relative overflow-hidden group hover:bg-zinc-900/60 transition-colors`}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />

                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">{metric.title}</h3>
                  <metric.icon size={14} className={`${metric.color} opacity-70`} />
                </div>
                <div className="flex items-baseline space-x-1">
                  <p className={`text-4xl font-mono tracking-tighter ${metric.color} ${metric.shadow}`}>{metric.value}</p>
                  <span className="text-xs font-mono text-zinc-600">{metric.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-zinc-950/40 backdrop-blur-md border border-white/10 p-5 relative"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
              
              <h3 className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-6 flex items-center space-x-2">
                <Activity size={12} className="text-cyan-400" />
                <span>DATA STREAM</span>
              </h3>
              <div className="h-48 flex items-end justify-between space-x-1 pb-2">
                {[...Array(30)].map((_, i) => {
                  const height = Math.random() * 80 + 10;
                  return (
                    <div key={i} className="w-full bg-zinc-900 relative">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.03 }}
                        className="absolute bottom-0 w-full bg-cyan-500/40 border-t border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-950/40 backdrop-blur-md border border-white/10 p-5 relative flex flex-col"
            >
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />

              <h3 className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-4 flex items-center space-x-2">
                <Server size={12} className="text-emerald-400" />
                <span>NODE DIAGNOSTICS</span>
              </h3>
              
              <div className="flex-1 overflow-hidden relative border border-white/5 bg-black/50 p-3">
                {data ? (
                  <div className="h-full">
                    <div className="flex items-center space-x-2 text-emerald-400 mb-3 border-b border-emerald-500/20 pb-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                      <span className="text-[10px] font-mono tracking-widest">OK [200]</span>
                    </div>
                    <pre className="text-[10px] text-emerald-400/70 font-mono overflow-y-auto h-32 scrollbar-hide">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center space-y-2 text-zinc-600">
                    <Activity className="animate-spin" size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Awaiting Signal...</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
