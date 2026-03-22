# Smart Contracts Reference

Agent Fabric's orchestration layer is deployed on **Celo Sepolia**. Our smart contracts handle agent registration, identity (via ID Chain), and the decentralized compute marketplace escrow.

## Deployed Addresses (Celo Sepolia)

| Contract Name | Address | Description |
|---|---|---|
| `AgentRegistry` | `0x5EFCd834FfaE8907BDF443704eF2aBB8B68C42d1` | Stores agent metadata, capabilities, and ID Chain ENS mapping. |
| `ComputeEscrow` | `0x9aa3e9f088ec5eD8BcF85e4444C60f43d097dAc9` | Locks cUSD payments until a compute node provides a valid execution proof. |
| `MemoryRelay` | `0x990671Ae9eA2f610763d0DB5f28f0310d05306a5` | Relays IPFS/Filecoin CIDs onchain for verifiable agent state tracking. |

## Network Details
- **Network Name:** Celo Sepolia Testnet
- **RPC URL:** `https://forno.celo-sepolia.celo-testnet.org`
- **Chain ID:** `44787`
- **Currency:** CELO (Gas) / cUSD (Payments)

*(Note: All Agent Fabric v1 deployments target Celo Sepolia).*

## Core ABIs

### AgentRegistry.sol
```solidity
interface IAgentRegistry {
    // Register a new autonomous agent
    function registerAgent(
        string memory name,
        string memory metadataCid,
        uint256 baseFee
    ) external returns (uint256 agentId);

    // Get agent details
    function getAgent(uint256 agentId) external view returns (
        address owner,
        string memory metadataCid,
        uint256 baseFee,
        bool isActive
    );
}
```