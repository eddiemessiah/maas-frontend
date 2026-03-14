"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Database, Plus } from "lucide-react";
import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { injected } from 'wagmi/connectors'

const registryAddress = "0x5818d8A494a0aa7C9eB2Fa6aFCBbd28f02e527E6" as const;
const registryABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_skills", "type": "string" },
      { "internalType": "string", "name": "_endpoint", "type": "string" },
      { "internalType": "uint256", "name": "_pricePerCall", "type": "uint256" }
    ],
    "name": "registerAgent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export default function Register() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { data: hash, writeContract, error: writeError, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [price, setPrice] = useState("0");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
        connect({ connector: injected() });
        return;
    }
    
    writeContract({
      address: registryAddress,
      abi: registryABI,
      functionName: 'registerAgent',
      args: [name, skills, endpoint, BigInt(price)],
    });
  };

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden radar-grid relative">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
        <div className="max-w-2xl mx-auto">
          <header className="mb-10 border-b border-white/10 pb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-2"
            >
              <Database className="text-emerald-400" />
              Agent Registry Portal
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-zinc-500 tracking-widest uppercase mt-2"
            >
              Deploy your AI agent to the Celo Sepolia Network
            </motion.p>
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-950/40 backdrop-blur-md border border-emerald-500/20 p-6 relative"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/50" />

            <div className="mb-6 flex justify-between items-center">
               <span className="text-xs font-mono text-zinc-400">STATUS: {isConnected ? <span className="text-emerald-400">CONNECTED {address?.slice(0,6)}...{address?.slice(-4)}</span> : <span className="text-amber-400">OFFLINE</span>}</span>
               {!isConnected && (
                 <button onClick={() => connect({ connector: injected() })} className="text-xs font-mono bg-zinc-900 border border-white/10 px-3 py-1 hover:bg-zinc-800 transition-colors">
                   CONNECT WALLET
                 </button>
               )}
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Agent Name</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="e.g. DeFi Sentinel"
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Skills (Comma separated)</label>
                <input 
                  required
                  type="text" 
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="e.g. Arbitrage, Flashloans, Auditing"
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Endpoint (Filecoin CID / API URL)</label>
                <input 
                  required
                  type="text" 
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="ipfs://..."
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Price Per Call (Wei)</label>
                <input 
                  required
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="1000000000000000"
                />
              </div>

              <button 
                type="submit"
                disabled={isPending || isConfirming}
                className="w-full mt-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono tracking-widest text-xs py-3 hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? "SIGNING..." : isConfirming ? "MINING..." : "INITIALIZE DEPLOYMENT"}
                {!isPending && !isConfirming && <Plus size={14} />}
              </button>
            </form>

            {hash && <p className="mt-4 text-[10px] font-mono text-zinc-500 break-all">TX Hash: <a href={`https://celo-sepolia.blockscout.com/tx/${hash}`} target="_blank" className="text-emerald-400 hover:underline">{hash}</a></p>}
            {isConfirmed && <p className="mt-2 text-[10px] font-mono text-emerald-400">Transaction Confirmed!</p>}
            {writeError && <p className="mt-2 text-[10px] font-mono text-red-400">Error: {(writeError as any).shortMessage || writeError.message}</p>}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
