"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Toaster } from "sonner";
import { getNetworkConfig } from "@/lib/config";

const queryClient = new QueryClient();

const fhenixChain = getNetworkConfig();

const config = getDefaultConfig({
  appName: "ShadowVault",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "demo-project-id",
  chains: [fhenixChain],
  transports: {
    [fhenixChain.id]: http(fhenixChain.rpcUrls.default.http[0]),
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
          <Toaster 
            position="bottom-right" 
            theme="dark"
            richColors
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
