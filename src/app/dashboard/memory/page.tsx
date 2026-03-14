"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { AlertCircle } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden radar-grid relative">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      <Sidebar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-950/40 backdrop-blur-md border border-cyan-500/20 p-10 relative max-w-md w-full text-center group"
        >
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50" />
          
          <AlertCircle size={48} className="text-cyan-400 mx-auto mb-6 opacity-80" />
          
          <h2 className="text-2xl font-bold tracking-widest text-white uppercase mb-4">
            Module Offline
          </h2>
          <p className="text-sm text-zinc-400 font-mono mb-8 tracking-wider uppercase">
            System architecture under construction. Deployment pending.
          </p>
          
          <div className="inline-block px-4 py-2 border border-cyan-500/30 bg-cyan-900/20 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-shadow">
            COMING SOON
          </div>
        </motion.div>
      </main>
    </div>
  );
}
