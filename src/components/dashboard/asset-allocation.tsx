"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Asset } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { COLORS } from "@/constants";

interface AssetAllocationProps {
  assets: Asset[];
  isLoading?: boolean;
}

export const AssetAllocation: React.FC<AssetAllocationProps> = ({
  assets,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!assets || assets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-400">No on-chain asset allocation data is available.</div>
        </CardContent>
      </Card>
    );
  }

  const pieData = assets.map((asset) => ({
    name: asset.symbol,
    value: asset.percentage,
    color: asset.color,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="rgba(255,255,255,0.1)"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F8FAFC" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px", color: "#F8FAFC" }} />
            </PieChart>
          </ResponsiveContainer>

          {/* Asset List */}
          <div className="mt-6 space-y-3">
            {assets.map((asset) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{asset.symbol}</p>
                    <p className="text-xs text-slate-500">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">{asset.percentage.toFixed(2)}%</p>
                  <p className="text-xs text-slate-400">{formatCurrency(asset.usdValue)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
