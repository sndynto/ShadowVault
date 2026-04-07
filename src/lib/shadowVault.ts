import { Address } from "viem";
import { config } from "@/lib/config";

export const SHADOW_VAULT_ADDRESS = config.shadowVaultAddress as Address;

export const SHADOW_VAULT_ABI = [
  {
    name: "getPrivatePortfolio",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "balance", type: "uint64" },
      { name: "usdValue", type: "uint64" },
      { name: "dailyPnL", type: "uint64" },
      { name: "totalPnL", type: "uint64" },
    ],
  },
  {
    name: "verifyThresholdProof",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "threshold", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "generatePublicBadge",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    name: "getProofHistory",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "isAboveThreshold", type: "bool" },
          { name: "thresholdValue", type: "uint256" },
          { name: "proofTimestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "metadata",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "nickname", type: "string" },
      { name: "badgeHash", type: "bytes32" },
      { name: "createdAt", type: "uint256" },
      { name: "verified", type: "bool" },
    ],
  },
  {
    name: "getWalletsCount",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getTotalActiveUsers",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
