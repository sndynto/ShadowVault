"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout";
import { PublicBadge } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Share2, Link as LinkIcon } from "lucide-react";

const SHARE_TIMESTAMP = Date.now();
const SHARE_EXPIRES_AT = SHARE_TIMESTAMP + 30 * 24 * 60 * 60 * 1000;

export default function SharePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio Sharing</h1>
          <p className="text-slate-400">Create and manage your public portfolio cards</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Your Shared Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white">Main Portfolio</h3>
                      <span className="text-xs text-green-400">Active</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      shadow-vault.app/share/abc123
                    </p>
                    <div className="text-xs text-slate-500">
                      Created 2 weeks ago • 234 views
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <PublicBadge
            card={{
              nickname: "Anon Trader",
              badge: "GOLD",
              growthPercentage: 13.08,
              favoriteAsset: "ETH",
              walletAddress: "0x1234...5678",
              verified: true,
              createdAt: SHARE_TIMESTAMP,
              shareToken: "abc123",
              expiresAt: SHARE_EXPIRES_AT,
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
