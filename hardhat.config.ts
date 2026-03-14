import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    "celo-sepolia": {
      url: "https://forno.celo-sepolia.celo-testnet.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11142220,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 42220,
    }
  },
  etherscan: {
    apiKey: {
        alfajores: process.env.CELOSCAN_API_KEY || "",
        celo: process.env.CELOSCAN_API_KEY || "",
        "celo-sepolia": process.env.CELOSCAN_API_KEY || "empty"
    },
    customChains: [
        {
            network: "alfajores",
            chainId: 44787,
            urls: {
                apiURL: "https://api-alfajores.celoscan.io/api",
                browserURL: "https://alfajores.celoscan.io",
            },
        },
        {
            network: "celo",
            chainId: 42220,
            urls: {
                apiURL: "https://api.celoscan.io/api",
                browserURL: "https://celoscan.io/",
            },
        },
        {
            network: "celo-sepolia",
            chainId: 11142220,
            urls: {
                apiURL: "https://celo-sepolia.blockscout.com/api",
                browserURL: "https://celo-sepolia.blockscout.com/",
            },
        }
    ]
  }
};

export default config;