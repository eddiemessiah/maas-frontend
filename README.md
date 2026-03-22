<div align="center">

# 🕸️ Agent Fabric

**The Decentralized Operating System for the Agentic Economy.**<br>
*Built for the Synthesis Hackathon, Celo Build with AI, and Protocol Labs Genesis.*

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://agentfabric.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Celo](https://img.shields.io/badge/Celo-Sepolia-gold.svg)](https://celo.org/)
[![Filecoin](https://img.shields.io/badge/Filecoin-FVM-blue.svg)](https://filecoin.io/)

[**Live Demo**](https://agentfabric.netlify.app) | [**Documentation**](https://agentfabric.netlify.app/docs) | [**Video Pitch**](https://tmpfiles.org/dl/30160208/agentfabricdemo.mp4)

</div>

<hr>

## 🚨 The Web2 Trap
Right now, the AI agent economy is trapped in Web2. 
- If an autonomous agent needs to **remember** a conversation, it relies on a centralized AWS database. 
- If an agent needs to **execute** a complex reasoning task, it runs on a centralized GPU cluster. 

This breaks the fundamental promise of Web3: **verifiability**. How do you trust an autonomous economic actor with money if you can't cryptographically verify its memory or its logic?

## 💡 The Solution: Agent Fabric
Agent Fabric is an orchestration and data-availability layer built specifically for AI Agents. We combine high-speed orchestration on **Celo Sepolia** with the raw decentralized infrastructure of the **Filecoin Onchain Cloud** and **Bacalhau** compute networks. 

Agent Fabric lets parallel, privacy-preserving agents operate onchain autonomously using Filecoin TEEs (Trusted Execution Environments) while settling micro-payments in cUSD on Celo.

---

## 🏗️ Architecture & Core Components

### 1. 🟡 Celo Sepolia (Orchestration & Micro-Payments)
The primary execution environment for real-world agent payments. Agents operate on Celo's fast, low-fee EVM layer to handle microtransactions via stablecoins (cUSD). When an agent needs compute, it locks cUSD in our `ComputeEscrow` contract.

### 2. 🪪 ID Chain ENS Integration (Agent Identity)
Every agent deployed on Agent Fabric automatically registers an ENS identity via ID Chain (e.g., `trader.idchain.eth`). This replaces raw hex addresses with human-and-agent-readable ENS names, ensuring discoverability, cross-chain messaging, and persistent identity for the multi-agent economy.

### 3. 💾 Filecoin Synapse SDK (The Memory Cortex)
Agent Fabric natively integrates the Synapse SDK to interact directly with the Filecoin Onchain Cloud. Instead of relying on centralized middleware, our orchestration layer uses Synapse to programmatically store execution logs, embeddings, and agent states as verifiable data points on the Filecoin network.

### 4. ⚙️ Bacalhau (Decentralized Compute)
The decentralized compute marketplace where agents request and run tasks (like Python scripts or LLM inference) permissionlessly, proving execution back to the Celo escrow contract.

---

## 📜 Smart Contracts (Celo Sepolia Testnet)

Our core infrastructure is fully deployed and verified on Celo Sepolia.

| Contract Name | Deployed Address | Description |
|---|---|---|
| **AgentRegistry** | `0x5EFCd834FfaE8907BDF443704eF2aBB8B68C42d1` | Stores agent metadata, capabilities, and ID Chain ENS mapping. |
| **ComputeEscrow** | `0x9aa3e9f088ec5eD8BcF85e4444C60f43d097dAc9` | Locks cUSD payments until a Bacalhau compute node provides a valid execution proof. |
| **MemoryRelay** | `0x990671Ae9eA2f610763d0DB5f28f0310d05306a5` | Relays IPFS/Filecoin CIDs onchain for verifiable agent state tracking. |

- **RPC URL:** `https://forno.celo-sepolia.celo-testnet.org`
- **Chain ID:** `44787`

---

## 🚀 Quickstart: SDK Integration

The Agent Fabric SDK allows any AI agent to programmatically interact with decentralized compute and storage.

```javascript
import { AgentFabric } from '@agentfabric/sdk';
import { parseUnits } from 'ethers';

// 1. Initialize the Fabric on Celo Sepolia
const fabric = new AgentFabric({ 
  network: 'celo-sepolia', 
  privateKey: process.env.AGENT_PRIVATE_KEY 
});

// 2. Request Decentralized Compute (Bacalhau) & Pay via Celo
const computeJob = await fabric.compute.requestJob({
  image: 'bacalhau/llama-3-inference',
  inputs: ['ipfs://bafy...promptData'],
  paymentToken: 'cUSD',
  maxFee: parseUnits('0.5', 18) 
});

const result = await computeJob.wait();

// 3. Store the Result in the Filecoin Memory Cortex (Synapse SDK)
const receipt = await fabric.storage.pin({
    lastAction: 'Inference Executed',
    outputCid: result.outputCid,
    timestamp: Date.now()
});

console.log('Verifiable Memory Stored at CID:', receipt.cid);
```

---

## 💻 Tech Stack
*   **Frontend:** Next.js, React, TailwindCSS
*   **Smart Contracts:** Solidity, Foundry (Deployed to Celo Sepolia)
*   **Decentralized Storage:** Filecoin (FVM), IPFS, Synapse SDK
*   **Decentralized Compute:** Bacalhau
*   **Identity:** ID Chain (ENS)
*   **AI Orchestration:** OpenClaw / Custom Agent SDK

## 🏆 Hackathon Tracks Targeted
1.  **Synthesis:** Best Agent on Celo, Best Use Case with Agentic Storage (Filecoin), 🤖 Let the Agent Cook (Protocol Labs).
2.  **Synthesis (ENS Tracks):** ENS Identity, ENS Open Integration, ENS Communication.
3.  **Celo:** Build Agents for the Real World.

<hr>

<div align="center">
  <i>"True autonomy requires verifiability."</i>
</div>