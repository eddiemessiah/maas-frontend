"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { parseEther, formatEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet, ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";

const PAYMASTER_ADDRESS = "0x87B66a6a033ECCec395E3C0FD33275755112FB07" as const;

const PAYMASTER_ABI = [
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "agent", "type": "address" }],
    "name": "getBalance",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export function DepositCard() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState("0.001");
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: balance } = useReadContract({
    address: PAYMASTER_ADDRESS,
    abi: PAYMASTER_ABI,
    functionName: "getBalance",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { writeContract, isPending, error } = useWriteContract();

  const handleDeposit = () => {
    if (!address) return;
    
    writeContract({
      address: PAYMASTER_ADDRESS,
      abi: PAYMASTER_ABI,
      functionName: "deposit",
      value: parseEther(depositAmount),
    }, {
      onSuccess: () => {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          <Wallet className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white font-orbitron">AGENT PAYMASTER</h2>
          <p className="text-sm text-cyan-400/60">Deposit ETH to fund API usage</p>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <ConnectButton />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Your Balance</span>
              <a 
                href={`https://sepolia.basescan.org/address/${PAYMASTER_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 flex items-center gap-1 hover:underline"
              >
                View Contract <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div className="text-3xl font-bold text-white">
              {balance !== undefined ? formatEther(balance) : "0.0000"} <span className="text-lg text-gray-400">ETH</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Deposit Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-1 bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="0.001"
                />
                <span className="flex items-center px-4 text-gray-400">ETH</span>
              </div>
            </div>

            <button
              onClick={handleDeposit}
              disabled={isPending}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/30 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>Processing...</>
              ) : (
                <>Deposit to AgentPaymaster</>
              )}
            </button>

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-3 rounded-lg"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Deposit successful! Your agent is now funded.</span>
              </motion.div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error.message}</span>
              </div>
            )}

            <div className="text-xs text-gray-500 text-center">
              Network: Base Sepolia | Min Deposit: 0.0001 ETH
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
