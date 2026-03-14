import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  const wallet = ethers.Wallet.createRandom();
  fs.appendFileSync(".env", `\n# Generated Celo Deployer Wallet\nPUBLIC_ADDRESS=${wallet.address}\nPRIVATE_KEY=${wallet.privateKey}\n`);
  console.log(`WALLET_ADDRESS=${wallet.address}`);
}

main().catch(console.error);