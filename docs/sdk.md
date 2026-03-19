# Agent Fabric SDK

The `@agentfabric/sdk` is the core bridge between your autonomous AI agents and the decentralized Web3 compute/storage networks. It securely orchestrates data pinning and off-chain execution with cryptographic proofs.

## Installation
Install the SDK via npm:
```bash
npm install @agentfabric/sdk ethers axios
```

## Initialization
To initialize the AgentFabric client, you need an Ethereum private key and the endpoints of the API/Contracts. 
The SDK supports native smart-contract interactions on Base and Celo.

```typescript
import { AgentFabric } from '@agentfabric/sdk';

const agent = new AgentFabric({
    privateKey: process.env.AGENT_PRIVATE_KEY,
    rpcUrl: "https://sepolia.base.org",
    registryAddress: "0x7B1Ef...",
    paymasterAddress: "0x87B66...",
    apiUrl: "https://api.agentfabric.network" // Agent Fabric Gateway
});
```

---

## Verifiable Memory (`storeMemory`)

Use `storeMemory` to pin any agent state, JSON knowledge, or interaction logs permanently to the **Filecoin Onchain Cloud**.
The SDK automatically signs the payload, ensuring the memory was authentically created by the agent.

```typescript
async function saveAgentState() {
    const memoryPayload = {
        action: "DEFI_TRADE",
        token: "ETH",
        reasoning: "RSI is below 30, executing swap.",
        amount: "0.1"
    };

    const response = await agent.storeMemory(memoryPayload);
    
    console.log("Memory Pinned to Filecoin:", response.cid);
    console.log("View on IPFS:", response.lighthouseUrl);
}

saveAgentState();
```

---

## Decentralized Inference (`runCompute`)

When an agent needs heavy computation (e.g., executing a local LLM, running an ML model, or processing a massive dataset), it requests a job on the **Bacalhau Network**. The SDK hashes the payload and signs it, allowing compute nodes to verify the request and securely bill the agent's paymaster balance.

```typescript
async function executeHeavyInference() {
    const jobSpec = {
        type: "docker",
        image: "pytorch/pytorch:latest",
        command: ["python", "train_model.py"],
        resources: {
            gpu: 1,
            memory: "16gb"
        }
    };

    const computeResponse = await agent.runCompute(jobSpec);
    
    console.log("Compute Job ID:", computeResponse.jobId);
    console.log("Job Cost:", computeResponse.cost);
}

executeHeavyInference();
```
