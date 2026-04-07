"use client";

import React from "react";
import { useAccount } from "wagmi";
import { DashboardLayout } from "@/components/layout";
import {
  PortfolioCard,
  AssetAllocation,
  PortfolioPerformanceChart,
  ProofOfFunds,
  PublicBadge,
} from "@/components/dashboard";
import { Loader } from "@/components/ui";
import { PnLHistory } from "@/types";
import { useShadowVault } from "@/hooks";

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const {
    portfolio,
    publicCard,
    isLoading,
    generateBadge,
    generateProof,
  } = useShadowVault();

  const chartData: PnLHistory[] = portfolio
    ? [
        { date: "-3d", value: Number(portfolio.usdValue), pnl: 0, pnlPercent: 0 },
        { date: "-2d", value: Number(portfolio.usdValue), pnl: 0, pnlPercent: 0 },
        { date: "-1d", value: Number(portfolio.usdValue), pnl: 0, pnlPercent: 0 },
        { date: "Today", value: Number(portfolio.usdValue), pnl: Number(portfolio.dailyPnL), pnlPercent: 0 },
      ]
    : [];

  if (!isConnected) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-xl text-slate-400 mb-4">Please connect your wallet to continue</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Portfolio Card */}
        {isLoading ? (
          <Loader size="lg" fullScreen />
        ) : (
          <>
            <PortfolioCard
              totalBalance={portfolio?.totalBalance ?? "0"}
              usdValue={portfolio?.usdValue ?? "0"}
              dayChange={portfolio?.dailyPnL ?? "0"}
              dayChangePercent={0}
              totalGain={portfolio?.totalPnL ?? "0"}
              totalGainPercent={0}
            />

            {/* Main Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="md:col-span-2 lg:col-span-2 space-y-8">
                {/* Performance Chart */}
                <PortfolioPerformanceChart data={chartData} isLoading={isLoading} />

                {/* Proof of Funds */}
                <ProofOfFunds onGenerateProof={generateProof} isLoading={isLoading} />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Asset Allocation */}
                <AssetAllocation assets={[]} isLoading={isLoading} />

                {/* Public Badge */}
                <PublicBadge
                  card={publicCard}
                  onShare={generateBadge}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
