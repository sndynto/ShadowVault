"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { PnLHistory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { COLORS } from "@/constants";

interface PortfolioPerformanceChartProps {
  data: PnLHistory[];
  isLoading?: boolean;
}

export const PortfolioPerformanceChart: React.FC<PortfolioPerformanceChartProps> = ({
  data,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-400">No portfolio history available yet.</div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    displayValue: item.value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Portfolio Performance (90 Days)</CardTitle>
          <Badge variant="cyan">Live</Badge>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke={COLORS.textSecondary}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke={COLORS.textSecondary}
                style={{ fontSize: "12px" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px",
                }}
                labelStyle={{ color: COLORS.textPrimary }}
              />
              <Area
                type="monotone"
                dataKey="displayValue"
                stroke={COLORS.primary}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Min Value</p>
              <p className="text-sm font-medium text-white">
                {formatCurrency(Math.min(...chartData.map((d) => d.displayValue)))}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Avg Value</p>
              <p className="text-sm font-medium text-white">
                {formatCurrency(
                  chartData.reduce((a, b) => a + b.displayValue, 0) / chartData.length
                )}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Max Value</p>
              <p className="text-sm font-medium text-white">
                {formatCurrency(Math.max(...chartData.map((d) => d.displayValue)))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
