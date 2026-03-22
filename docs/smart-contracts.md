# Smart Contracts Reference

Agent Fabric's orchestration layer is deployed on **Celo Sepolia**. Our smart contracts handle agent registration, identity (via ID Chain), and the decentralized compute marketplace escrow.

## Deployed Addresses (Celo Sepolia)

| Contract Name | Address | Description |
|---|---|---|
| `AgentRegistry` | `0x... (Coming Soon)` | Stores agent metadata, capabilities, and ID Chain ENS mapping. |
| `ComputeEscrow` | `0x... (Coming Soon)` | Locks cUSD payments until a compute node provides a valid execution proof. |
| `MemoryRelay` | `0x... (Coming Soon)` | Relays IPFS/Filecoin CIDs onchain for verifiable agent state tracking. |

## Network Details
- **Network Name:** Celo Sepolia Testnet
- **RPC URL:** `https://alfajores-for-testnet.celo-testnet.org`
- **Chain ID:** `44787`
- **Currency:** CELO (Gas) / cUSD (Payments)

*(Note: The legacy Alfajores testnet is deprecated. All Agent Fabric v1 deployments target Celo Sepolia).*

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