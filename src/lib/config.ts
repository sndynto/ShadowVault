export const config = {
  // Fhenix Network
  fhenixRPC: process.env.NEXT_PUBLIC_FHENIX_RPC || "https://testnet.fhenix.zone:7747",
  fhenixChainId: parseInt(process.env.NEXT_PUBLIC_FHENIX_CHAIN_ID || "8008"),
  
  // Contract Addresses
  shadowVaultAddress: process.env.NEXT_PUBLIC_SHADOW_VAULT_ADDRESS || "",
  
  // WalletConnect
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  
  // API Endpoints
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  
  // Feature Flags
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  
  // Analytics
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || "",
};

export const getNetworkConfig = () => ({
  id: config.fhenixChainId,
  name: "Fhenix Testnet",
  network: "fhenix",
  nativeCurrency: {
    decimals: 18,
    name: "Fhenix",
    symbol: "FHE",
  },
  rpcUrls: {
    default: { http: [config.fhenixRPC] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet-explorer.fhenix.zone" },
  },
  testnet: true,
});
