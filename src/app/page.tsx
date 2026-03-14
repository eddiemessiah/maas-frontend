"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Database, Cpu, Wallet, Network, Lock, Layers, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans radar-grid relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      {/* Top Navigation */}
      <nav className="relative z-20 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex-shrink-0 border border-cyan-500/50 bg-cyan-950/30 rounded flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Network size={16} className="text-cyan-400" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">AgentFabric</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-xs font-mono tracking-widest text-zinc-400">
            <Link href="#problem" className="hover:text-cyan-400 transition-colors">THE PROBLEM</Link>
            <Link href="#modules" className="hover:text-cyan-400 transition-colors">MODULES</Link>
            <Link href="#audience" className="hover:text-cyan-400 transition-colors">USE CASES</Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-80 right-0 w-[400px] h-[400px] bg-magenta-900/10 blur-[120px] rounded-full pointer-events-none" />

        {/* 1. Hero Section */}
        <section className="pt-32 pb-24 px-6 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-zinc-900/50 px-3 py-1.5 border border-cyan-500/30 rounded-full mb-8 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">System Initialized</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              The Infrastructure Layer for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">AI Agent Economy.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-mono">
              A decentralized fabric where AI agents can store memory, access public datasets, run verifiable compute, and pay each other on-chain.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/dashboard" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded opacity-50 group-hover:opacity-100 transition duration-300 blur-sm" />
                <div className="relative flex items-center justify-center space-x-2 bg-black px-8 py-4 border border-white/10 hover:border-cyan-500/50 transition-all">
                  <span className="text-xs font-bold tracking-widest uppercase">Enter Command Center</span>
                  <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link href="#" className="group w-full sm:w-auto flex items-center justify-center space-x-2 bg-zinc-950/50 px-8 py-4 border border-white/10 hover:border-zinc-500 hover:bg-zinc-900 transition-all backdrop-blur-sm">
                <BookOpen size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-xs font-bold tracking-widest uppercase text-zinc-300 group-hover:text-white transition-colors">Read the Docs</span>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* 2. The Problem */}
        <section id="problem" className="py-24 px-6 border-y border-white/5 bg-zinc-950/30 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase mb-4">The Centralization Trap</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500/50 to-transparent mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 border border-white/10 bg-black/40 hover:border-red-500/30 hover:bg-red-950/10 transition-all group relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-red-500 transition-colors" />
                <Lock size={24} className="text-red-400 mb-6" />
                <h3 className="text-xs font-bold tracking-widest text-zinc-300 uppercase mb-3">The Hook</h3>
                <p className="font-mono text-sm text-zinc-500 leading-relaxed">Today, AI agents depend on centralized, closed infrastructure.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 border border-white/10 bg-black/40 hover:border-amber-500/30 hover:bg-amber-950/10 transition-all group relative"
              >
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-hover:border-amber-500 transition-colors" />
                <Layers size={24} className="text-amber-400 mb-6" />
                <h3 className="text-xs font-bold tracking-widest text-zinc-300 uppercase mb-3">The Pain</h3>
                <p className="font-mono text-sm text-zinc-500 leading-relaxed">Relying on <span className="text-zinc-300">AWS S3</span> for storage is expensive and centralized. Relying on <span className="text-zinc-300">Stripe</span> for payments is not native for autonomous agents.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 border border-white/10 bg-black/40 hover:border-orange-500/30 hover:bg-orange-950/10 transition-all group relative"
              >
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-orange-500 transition-colors" />
                <Zap size={24} className="text-orange-400 mb-6" />
                <h3 className="text-xs font-bold tracking-widest text-zinc-300 uppercase mb-3">The Result</h3>
                <p className="font-mono text-sm text-zinc-500 leading-relaxed">This creates centralized control, high costs, and <span className="text-orange-400">zero interoperability</span>.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Core Modules */}
        <section id="modules" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest uppercase mb-4">Core Infrastructure</h2>
            <p className="text-sm font-mono text-zinc-400">DECENTRALIZED AGENT PROTOCOLS ONLINE.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Module 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 border border-white/10 bg-zinc-950/60 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all group relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="w-12 h-12 border border-cyan-500/30 bg-cyan-950/30 flex items-center justify-center mb-6 group-hover:bg-cyan-900/40 transition-colors">
                <Database size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-white uppercase mb-4">Onchain Storage Layer</h3>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Permanent, verifiable dataset and memory storage using IPFS and Filecoin.
              </p>
            </motion.div>

            {/* Module 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 border border-white/10 bg-zinc-950/60 backdrop-blur-md hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all group relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="w-12 h-12 border border-purple-500/30 bg-purple-950/30 flex items-center justify-center mb-6 group-hover:bg-purple-900/40 transition-colors">
                <Cpu size={20} className="text-purple-400" />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-white uppercase mb-4">Compute Marketplace</h3>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Decentralized inference and task execution powered by Bacalhau.
              </p>
            </motion.div>

            {/* Module 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 border border-white/10 bg-zinc-950/60 backdrop-blur-md hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all group relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="w-12 h-12 border border-emerald-500/30 bg-emerald-950/30 flex items-center justify-center mb-6 group-hover:bg-emerald-900/40 transition-colors">
                <Wallet size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-white uppercase mb-4">Agent Payments</h3>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Seamless, trustless machine-to-machine transactions using USDC, Base, Celo, and NEAR.
              </p>
            </motion.div>

            {/* Module 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 border border-white/10 bg-zinc-950/60 backdrop-blur-md hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all group relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="w-12 h-12 border border-blue-500/30 bg-blue-950/30 flex items-center justify-center mb-6 group-hover:bg-blue-900/40 transition-colors">
                <Network size={20} className="text-blue-400" />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-white uppercase mb-4">Agent Registry</h3>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Smart contracts that store agent metadata, skills, and reputation on-chain.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4. Target Audience & Use Cases */}
        <section id="audience" className="py-24 px-6 border-t border-white/5 bg-zinc-950/30 backdrop-blur-md">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase mb-4">Deployment Targets</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500/50 to-transparent mx-auto" />
            </div>

            <div className="space-y-6 font-mono text-sm">
              <div className="flex items-start space-x-6 p-6 border border-white/5 bg-black/40 hover:border-cyan-500/20 transition-colors">
                <div className="text-cyan-400 font-bold mt-1">[01]</div>
                <div>
                  <h4 className="text-zinc-200 font-bold tracking-widest uppercase mb-2">For Hackathon Builders</h4>
                  <p className="text-zinc-500">Spin up agent hosting and on-chain payments instantly.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 p-6 border border-white/5 bg-black/40 hover:border-purple-500/20 transition-colors">
                <div className="text-purple-400 font-bold mt-1">[02]</div>
                <div>
                  <h4 className="text-zinc-200 font-bold tracking-widest uppercase mb-2">For AI Researchers</h4>
                  <p className="text-zinc-500">Access open data commons and permanent dataset storage.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 p-6 border border-white/5 bg-black/40 hover:border-emerald-500/20 transition-colors">
                <div className="text-emerald-400 font-bold mt-1">[03]</div>
                <div>
                  <h4 className="text-zinc-200 font-bold tracking-widest uppercase mb-2">For DAOs</h4>
                  <p className="text-zinc-500">Deploy agents for trustless governance analysis and treasury monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center bg-black">
          <p className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
            AGENTFABRIC © 2026 // DECENTRALIZED INFRASTRUCTURE
          </p>
        </footer>
      </main>
    </div>
  );
}