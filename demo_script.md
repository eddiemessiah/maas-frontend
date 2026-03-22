# Agent Fabric - Hackathon Demo Script

**Estimated Duration:** 2.5 Minutes
**Format:** Screen Recording with Voiceover (Loom/OBS)
**Target:** Synthesis Hackathon & Celo "Build Agents for the Real World"

---

### [0:00 - 0:30] Introduction & The Problem
*(Visual: Start on the Agent Fabric Landing Page or a high-level architecture diagram showing Celo + Filecoin + Bacalhau)*

**Speaker:** 
"Hey everyone, this is Edidiong. I'm building Agent Fabric, a decentralized operating system for the AI Agent economy.

Right now, autonomous agents are trapped in Web2. If an agent needs to remember a conversation, it relies on a centralized AWS database. If it needs to run a complex task, it uses a centralized GPU. That breaks the promise of crypto. How can you trust an autonomous economic actor if its logic and memory aren't verifiable? 

Agent Fabric fixes this by providing a truly decentralized orchestration layer."

### [0:30 - 1:15] The Celo Sepolia Smart Contracts & Identity
*(Visual: Show the Next.js Agent Dashboard, then split to Celo Explorer showing the deployed `AgentRegistry` and `ComputeEscrow`)*

**Speaker:**
"Our entire system is orchestrated on Celo Sepolia. Celo’s mobile-first, sub-cent fee environment makes it the perfect settlement layer for micro-transactions between agents.

Here on our dashboard, when you deploy an agent, two things happen immediately onchain:
First, the agent is minted into our `AgentRegistry` contract on Celo Sepolia. 
Second, it's automatically provisioned a human-readable ENS identity via ID Chain. This means agents don't interact with raw hex addresses; they communicate, trade, and message each other using verifiable ENS domains like `trader.idchain.eth`."

### [1:15 - 2:00] Filecoin Memory & Bacalhau Compute
*(Visual: Show the terminal running the `Synapse SDK` script or logs showing CIDs being saved. Show the `MemoryRelay` contract)*

**Speaker:**
"Now for the really cool part: Storage and Compute.
Instead of an AWS database, Agent Fabric agents use the Filecoin Onchain Cloud. We natively integrated the Filecoin Synapse SDK so that every agent's execution logs, states, and embeddings are pinned to Filecoin. 

We then bridge those Filecoin CIDs back to Celo Sepolia through our `MemoryRelay` contract. 

When an agent needs heavy compute—like running a local LLM or a Python script—it locks a cUSD payment in our `ComputeEscrow` contract. A node on the Bacalhau decentralized compute network executes the job, provides an execution proof, and the Celo smart contract releases the funds."

### [2:00 - 2:30] Conclusion & The Future
*(Visual: Back to the Agent Fabric UI showing an agent executing a successful task)*

**Speaker:**
"To summarize: Celo handles the high-speed orchestration and stablecoin micro-payments. Filecoin provides the permanent, verifiable memory cortex. And Bacalhau gives the agent permissionless compute.

With Agent Fabric, we aren't just building AI agents; we are making them true, verifiable citizens of the onchain economy. 

Thank you to Celo, Protocol Labs, and Synthesis for the hackathon. We're excited to see what agents you build on the Fabric!"