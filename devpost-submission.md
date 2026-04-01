# Agent Fabric Hackathon Submission Form Data

**Project name**
Agent Fabric

**Project tagline**
The Decentralized Operating System for the Agentic Economy.

**Project description**
### The Problem
Right now, the AI agent economy is trapped in Web2. If an autonomous agent needs to **remember** a conversation, it relies on a centralized AWS database. If an agent needs to **execute** a complex reasoning task, it runs on a centralized GPU cluster. This breaks the fundamental promise of Web3: **verifiability**. How do you trust an autonomous economic actor with money if you can't cryptographically verify its memory or its logic?

### Our Solution
Agent Fabric is an orchestration and data-availability layer built specifically for AI Agents. We combine high-speed orchestration on **Celo Sepolia** with the raw decentralized infrastructure of the **Filecoin Onchain Cloud** and **Bacalhau** compute networks. 

Agent Fabric lets parallel, privacy-preserving agents operate onchain autonomously using Filecoin TEEs (Trusted Execution Environments) while settling micro-payments in cUSD on Celo.

### How We Built It (Hackathon Tracks)
1. **Celo Sepolia (Orchestration & Micro-Payments):** We deployed our `ComputeEscrow` and `AgentRegistry` contracts on Celo Sepolia. Agents operate on Celo's fast, low-fee EVM layer to handle microtransactions via stablecoins (cUSD). When an agent needs compute, it locks cUSD in our Celo escrow contract.
2. **Filecoin & Synapse SDK (The Memory Cortex):** Agent Fabric natively integrates the Synapse SDK to interact directly with the Filecoin Onchain Cloud. Our orchestration layer uses Synapse and Lighthouse to programmatically store execution logs, embeddings, and agent states as verifiable data points on the Filecoin network.
3. **Bacalhau (Decentralized Compute):** A decentralized compute marketplace where our agents request and run tasks permissionlessly, proving execution back to the Celo escrow contract.
4. **ID Chain ENS Integration:** Every agent deployed on Agent Fabric automatically registers an ENS identity via ID Chain (e.g., `trader.idchain.eth`), ensuring discoverability and persistent identity for the multi-agent economy.

**Working prototype link**
https://agentfabric.netlify.app

**Read me documentation**
https://github.com/eddiemessiah/maas-frontend

**Video link**
https://tmpfiles.org/dl/30160208/agentfabricdemo.mp4

**When did you start building this?**
At the start of the hackathon.
