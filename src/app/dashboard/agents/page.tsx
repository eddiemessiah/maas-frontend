"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { Activity, Database, Cpu, CreditCard } from "lucide-react";
import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from "react";
import { parseEther } from "viem";

const REGISTRY_ADDRESS = "0x7B1EfF888ab6fA1C7a2ABbB8E61027B4fF332a0b" as const;
const PAYMASTER_ADDRESS = "0x87B66a6a033ECCec395E3C0FD33275755112FB07" as const;

const registryABI = [
  {
    "inputs": [],
    "name": "getAllAgents",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_agentId", "type": "address" }],
    "name": "getAgent",
    "outputs": [{
      "components": [
        { "internalType": "address", "name": "agentId", "type": "address" },
        { "internalType": "string", "name": "name", "type": "string" },
        { "internalType": "string", "name": "skills", "type": "string" },
        { "internalType": "string", "name": "endpoint", "type": "string" },
        { "internalType": "uint256", "name": "pricePerCall", "type": "uint256" },
        { "internalType": "bool", "name": "isActive", "type": "bool" }
      ],
      "internalType": "struct AgentRegistry.Agent",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const paymasterABI = [
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

export default function AgentsPage() {
  const { data: agentsData } = useReadContract({
    address: REGISTRY_ADDRESS,
    abi: registryABI,
    functionName: 'getAllAgents',
  });

  const agentAddresses = (agentsData as any[]) || [];

  const { data: agentDetails } = useReadContracts({
    contracts: agentAddresses.map((address) => ({
      address: REGISTRY_ADDRESS,
      abi: registryABI,
      functionName: 'getAgent',
      args: [address as `0x${string}`],
    })),
  });

  const [depositAmount, setDepositAmount] = useState("");
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount) return;
    
    writeContract({
      address: PAYMASTER_ADDRESS,
      abi: paymasterABI,
      functionName: 'deposit',
      value: parseEther(depositAmount)
    });
  };

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden radar-grid relative">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 border-b border-white/10 pb-6">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-2"
              >
                <Cpu className="text-cyan-400" />
                Active Agents Fleet
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-zinc-500 tracking-widest uppercase mt-2"
              >
                Monitor and fund active autonomous agents on the network
              </motion.p>
            </div>
            <div className="mt-4 md:mt-0">
               <ConnectButton />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Agents List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-4 flex items-center space-x-2">
                <Database size={12} className="text-cyan-400" />
                <span>REGISTERED AGENTS ({agentAddresses.length})</span>
              </h3>
              
              {!agentDetails || agentDetails.length === 0 ? (
                <div className="p-8 border border-white/10 bg-zinc-950/40 text-center text-zinc-500 text-sm font-mono uppercase tracking-widest">
                  No agents found on network.
                </div>
              ) : (
                agentDetails.map((result: any, index: number) => {
                  if (result.status !== 'success') return null;
                  const agent = result.result;
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className="bg-zinc-950/40 backdrop-blur-md border border-cyan-500/20 p-5 relative group hover:bg-zinc-900/60 transition-colors"
                    >
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
                      
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Activity className="text-cyan-400 animate-pulse" size={16} />
                          <h4 className="text-lg font-bold tracking-widest uppercase text-white">{agent.name}</h4>
                        </div>
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-cyan-950/50 text-cyan-400 border border-cyan-500/30">
                          {agent.isActive ? 'ACTIVE' : 'OFFLINE'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">SKILLS</p>
                          <p className="text-xs font-mono text-zinc-300">{agent.skills}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">PRICE / CALL</p>
                          <p className="text-xs font-mono text-zinc-300">{agent.pricePerCall.toString()} WEI</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">ENDPOINT CID</p>
                        <p className="text-[10px] font-mono text-cyan-400/70 truncate">{agent.endpoint}</p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Paymaster Funding */}
            <div className="space-y-4">
              <h3 className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-4 flex items-center space-x-2">
                <CreditCard size={12} className="text-emerald-400" />
                <span>PAYMASTER FUNDING</span>
              </h3>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-950/40 backdrop-blur-md border border-emerald-500/20 p-5 relative"
              >
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/50" />
                
                <p className="text-xs text-zinc-400 mb-6 tracking-wide leading-relaxed">
                  Deposit ETH into the AgentPaymaster contract to fund compute requests for your active agents.
                </p>

                <form onSubmit={handleDeposit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Deposit Amount (ETH)</label>
                    <input 
                      required
                      type="number" 
                      step="0.0001"
                      min="0"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="0.01"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isPending || isConfirming || !depositAmount}
                    className="w-full mt-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono tracking-widest text-xs py-3 hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isPending ? "SIGNING..." : isConfirming ? "MINING..." : "AUTHORIZE DEPOSIT"}
                  </button>
                </form>

                {hash && <p className="mt-4 text-[10px] font-mono text-zinc-500 break-all">TX Hash: <a href={`https://sepolia.basescan.org/tx/${hash}`} target="_blank" className="text-emerald-400 hover:underline">{hash}</a></p>}
                {isConfirmed && <p className="mt-2 text-[10px] font-mono text-emerald-400">Funds Deposited Successfully!</p>}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
