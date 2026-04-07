"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-slate-400">View your portfolio performance metrics</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Portfolio Value", value: "$245,850.32" },
            { label: "30-Day Growth", value: "+13.08%" },
            { label: "Win Rate", value: "68.5%" },
            { label: "Sharpe Ratio", value: "1.85" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-slate-700/20 to-slate-900/20 rounded-lg border border-white/10 flex items-center justify-center text-slate-400">
              Chart coming soon
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
