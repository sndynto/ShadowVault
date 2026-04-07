"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { formatCurrency, formatPercentage, copyToClipboard } from "@/lib/utils";
import { usePrivacy, useNotification } from "@/hooks";
import { COLORS } from "@/constants";

interface PortfolioCardProps {
  totalBalance: string;
  usdValue: string;
  dayChange: string;
  dayChangePercent: number;
  totalGain: string;
  totalGainPercent: number;
  isLoading?: boolean;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  totalBalance,
  usdValue,
  dayChange,
  dayChangePercent,
  totalGain,
  totalGainPercent,
  isLoading = false,
}) => {
  const { showBalance, toggleBalance } = usePrivacy();
  const isDayPositive = dayChangePercent >= 0;
  const isGainPositive = totalGainPercent >= 0;

  const maskedValue = "●●●●●●.●●";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden p-8">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at top right, ${COLORS.primary}20, transparent)`,
          }}
        />
        
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-2">Total Portfolio Value</p>
              <div className="flex items-baseline gap-2">
                <h1 className="text-4xl font-bold text-white">
                  {showBalance ? formatCurrency(usdValue) : maskedValue}
                </h1>
                <button
                  onClick={toggleBalance}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={showBalance ? "Hide balance" : "Show balance"}
                >
                  {showBalance ? (
                    <Eye className="w-5 h-5 text-orange-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
            <Badge variant="cyan">Live</Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Daily Change */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">24h Change</p>
              <p className={showBalance ? "" : "blur-sm"}>
                <span className={isDayPositive ? "text-green-400" : "text-red-400"}>
                  {isDayPositive ? "+" : ""}{showBalance ? formatCurrency(dayChange) : maskedValue}
                </span>
              </p>
              <p className={`text-xs mt-1 ${isDayPositive ? "text-green-400" : "text-red-400"}`}>
                {formatPercentage(dayChangePercent)}
              </p>
            </div>

            {/* Total Gain */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Total Gain</p>
              <p className={showBalance ? "" : "blur-sm"}>
                <span className={isGainPositive ? "text-green-400" : "text-red-400"}>
                  {isGainPositive ? "+" : ""}{showBalance ? formatCurrency(totalGain) : maskedValue}
                </span>
              </p>
              <p className={`text-xs mt-1 ${isGainPositive ? "text-green-400" : "text-red-400"}`}>
                {formatPercentage(totalGainPercent)}
              </p>
            </div>

            {/* Assets Connected */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Status</p>
              <p className="text-green-400 font-medium">Active</p>
              <p className="text-xs text-slate-500 mt-1">Connected</p>
            </div>
          </div>

          {/* Encrypted Notice */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-xs text-purple-300">
            🔐 All data encrypted with Fhenix FHE. Only you can decrypt your actual balance.
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
