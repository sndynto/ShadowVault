"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "@wagmi/connectors";
import { Button } from "@/components/ui";

export const DirectConnectButton: React.FC = () => {
  const router = useRouter();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const connector = useMemo(() => metaMask(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectAsync({ connector });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("MetaMask connect failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  const showConnected = mounted && isConnected;

  return showConnected ? (
    <Button variant="secondary" size="md" onClick={handleDisconnect}>
      Disconnect
    </Button>
  ) : (
    <Button
      variant="default"
      size="md"
      onClick={handleConnect}
      isLoading={isLoading}
    >
      Connect Wallet
    </Button>
  );
};
