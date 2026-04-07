"use client";

import { useEffect, useState } from "react";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { SHADOW_VAULT_ABI, SHADOW_VAULT_ADDRESS } from "@/lib/shadowVault";
import { getNetworkConfig } from "@/lib/config";
import { Portfolio, PortfolioMetadata, PublicCard, ThresholdProof } from "@/types";

export interface ShadowVaultState {
  portfolio: Portfolio | null;
  metadata: PortfolioMetadata | null;
  proofHistory: ThresholdProof[];
  walletCount: number;
  totalActiveUsers: number;
  publicCard: PublicCard | null;
  badge: string | null;
  isLoading: boolean;
  error: string | null;
  generateProof: (threshold: string) => Promise<boolean>;
  generateBadge: () => Promise<string | null>;
}

const formatPortfolio = (data: readonly [bigint, bigint, bigint, bigint]): Portfolio => ({
  totalBalance: data[0].toString(),
  usdValue: data[1].toString(),
  dailyPnL: data[2].toString(),
  totalPnL: data[3].toString(),
  lastUpdated: Date.now(),
  isActive: true,
});

const getBadgeFromUsdValue = (usdValue: string): string => {
  const value = Number(usdValue.replace(/[^0-9.]/g, ""));
  if (value >= 100000) return "WHALE";
  if (value >= 10000) return "GOLD";
  if (value >= 1000) return "SILVER";
  return "BRONZE";
};

const buildPublicCard = (
  metadata: PortfolioMetadata | null,
  badge: string | null,
  address: string | null,
  portfolio: Portfolio | null
): PublicCard | null => {
  if (!metadata || !address) return null;

  return {
    nickname: metadata.nickname || "Anon Trader",
    badge: badge ?? getBadgeFromUsdValue(portfolio?.usdValue ?? "0"),
    growthPercentage: 0,
    favoriteAsset: "FHE",
    walletAddress: address,
    verified: metadata.verified,
    createdAt: Number(metadata.createdAt),
    shareToken: address.slice(2, 10),
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };
};

export const useShadowVault = (): ShadowVaultState => {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { writeContractAsync: verifyThresholdProof } = useWriteContract();
  const { writeContractAsync: generateBadgeContract } = useWriteContract();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [metadata, setMetadata] = useState<PortfolioMetadata | null>(null);
  const [proofHistory, setProofHistory] = useState<ThresholdProof[]>([]);
  const [walletCount, setWalletCount] = useState<number>(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [badge, setBadge] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contractReady = Boolean(
    SHADOW_VAULT_ADDRESS && address && publicClient
  );

  // Contract reads using wagmi hooks
  const { data: portfolioData } = useReadContract({
    address: SHADOW_VAULT_ADDRESS,
    abi: SHADOW_VAULT_ABI,
    functionName: "getPrivatePortfolio",
    query: {
      enabled: contractReady,
    },
  });

  const { data: metadataData } = useReadContract({
    address: SHADOW_VAULT_ADDRESS,
    abi: SHADOW_VAULT_ABI,
    functionName: "metadata",
    args: address ? [address] : undefined,
    query: {
      enabled: contractReady && !!address,
    },
  });

  const { data: proofData } = useReadContract({
    address: SHADOW_VAULT_ADDRESS,
    abi: SHADOW_VAULT_ABI,
    functionName: "getProofHistory",
    args: address ? [address] : undefined,
    query: {
      enabled: contractReady && !!address,
    },
  });

  const { data: walletCountData } = useReadContract({
    address: SHADOW_VAULT_ADDRESS,
    abi: SHADOW_VAULT_ABI,
    functionName: "getWalletsCount",
    args: address ? [address] : undefined,
    query: {
      enabled: contractReady && !!address,
    },
  });

  const { data: totalUsersData } = useReadContract({
    address: SHADOW_VAULT_ADDRESS,
    abi: SHADOW_VAULT_ABI,
    functionName: "getTotalActiveUsers",
    query: {
      enabled: contractReady,
    },
  });

  const generateProof = async (threshold: string) => {
    if (!address) {
      setError("Wallet not connected");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const txHash = await verifyThresholdProof({
        address: SHADOW_VAULT_ADDRESS,
        abi: SHADOW_VAULT_ABI,
        functionName: "verifyThresholdProof",
        args: [BigInt(threshold)],
        account: address,
        chain: getNetworkConfig(),
      });
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Proof generation failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const generateBadge = async () => {
    if (!address) {
      setError("Wallet not connected");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const txHash = await generateBadgeContract({
        address: SHADOW_VAULT_ADDRESS,
        abi: SHADOW_VAULT_ABI,
        functionName: "generatePublicBadge",
        args: [],
        account: address,
        chain: getNetworkConfig(),
      });
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      return badge;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Badge generation failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Process contract data when it changes
  useEffect(() => {
    if (portfolioData) {
      const formattedPortfolio = formatPortfolio(portfolioData as readonly [bigint, bigint, bigint, bigint]);
      setPortfolio(formattedPortfolio);
      setBadge(getBadgeFromUsdValue(formattedPortfolio.usdValue));
    }
  }, [portfolioData]);

  useEffect(() => {
    if (metadataData) {
      setMetadata(metadataData as unknown as PortfolioMetadata);
    }
  }, [metadataData]);

  useEffect(() => {
    if (proofData) {
      setProofHistory(
        (proofData as Array<any>).map((item) => ({
          isAboveThreshold: item.isAboveThreshold,
          thresholdValue: item.thresholdValue.toString(),
          proofTimestamp: Number(item.proofTimestamp),
        }))
      );
    }
  }, [proofData]);

  useEffect(() => {
    if (walletCountData !== undefined) {
      setWalletCount(Number(walletCountData));
    }
  }, [walletCountData]);

  useEffect(() => {
    if (totalUsersData !== undefined) {
      setTotalActiveUsers(Number(totalUsersData));
    }
  }, [totalUsersData]);

  return {
    portfolio,
    metadata,
    proofHistory,
    walletCount,
    totalActiveUsers,
    publicCard: buildPublicCard(metadata, badge, address || null, portfolio),
    badge,
    isLoading,
    error,
    generateProof,
    generateBadge,
  };
};
