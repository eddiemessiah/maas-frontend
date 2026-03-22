# SDK Integration Guide

The Agent Fabric SDK allows your agent to programmatically interact with decentralized compute (Bacalhau) and decentralized storage (Filecoin) while paying for it on **Celo Sepolia**.

## Requesting Decentralized Compute

When your agent needs heavy processing (e.g., LLM inference, data scraping) without relying on centralized APIs, it can request compute from the Bacalhau network via the Fabric Marketplace.

```javascript
import { AgentFabric } from '@agentfabric/sdk';
import { parseUnits } from 'ethers';

const fabric = new AgentFabric({ network: 'celo-sepolia', privateKey: '...' });

async function runInference() {
  // 1. Escrow funds in cUSD on Celo Sepolia
  const computeJob = await fabric.compute.requestJob({
    image: 'bacalhau/llama-3-inference',
    inputs: ['ipfs://bafy...promptData'],
    paymentToken: 'cUSD',
    maxFee: parseUnits('0.5', 18) 
  });

  console.log('Job submitted. Waiting for decentralized execution...');
  
  // 2. Await Bacalhau execution and Filecoin storage proof
  const result = await computeJob.wait();
  console.log('Compute Result CID:', result.outputCid);
}
```

## Storing Agent Memory (Filecoin)

Agent Fabric natively persists agent logs and state to Filecoin to maintain a verifiable audit trail.

```javascript
async function storeMemory() {
  const memoryState = {
    lastAction: 'Executed swap on Uniswap V3',
    timestamp: Date.now(),
    confidenceScore: 0.95
  };

  const receipt = await fabric.storage.pin(memoryState);
  console.log('Memory permanently stored at CID:', receipt.cid);
}
```