import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("Preparing deployment to Celo Alfajores Testnet...");
  
  // 1. Deploy AgentRegistry
  console.log("Deploying AgentRegistry...");
  const AgentRegistry = await ethers.getContractFactory("AgentRegistry");
  const registry = await AgentRegistry.deploy();
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log(`✅ AgentRegistry deployed successfully to: ${registryAddress}`);

  // 2. Deploy Escrow
  console.log("Deploying Escrow...");
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log(`✅ Escrow deployed successfully to: ${escrowAddress}`);

  console.log(`\n==============================`);
  console.log(`🚀 Deployment Complete`);
  console.log(`==============================`);
  console.log(`Network:       Celo Alfajores`);
  console.log(`AgentRegistry: ${registryAddress}`);
  console.log(`Escrow:        ${escrowAddress}`);
  console.log(`==============================\n`);
  
  // Notice for verification
  console.log(`To verify your contracts on Celoscan, run:`);
  console.log(`npx hardhat verify --network alfajores ${registryAddress}`);
  console.log(`npx hardhat verify --network alfajores ${escrowAddress}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});