"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@/components/ui";
import { Settings, Lock, Bell, Shield } from "lucide-react";
import { usePrivacy } from "@/hooks";

export default function SettingsPage() {
  const { privacySettings, setPrivacySettings } = usePrivacy();
  const [walletNickname, setWalletNickname] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your portfolio preferences</p>
        </div>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-400" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Hide Balance", key: "hideBalance", description: "Hide your total portfolio value by default" },
              { label: "Hide Allocations", key: "hideAllocations", description: "Hide asset allocation percentages" },
              { label: "Hide Profit/Loss", key: "hidePnL", description: "Hide P&L gains and losses" },
              { label: "Enable Public Card", key: "enablePublicCard", description: "Allow others to view your public profile card" },
            ].map((setting) => (
              <label key={setting.key} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={privacySettings[setting.key as keyof typeof privacySettings] as boolean}
                  onChange={(e) =>
                    setPrivacySettings({
                      [setting.key]: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium text-white">{setting.label}</p>
                  <p className="text-sm text-slate-400 mt-1">{setting.description}</p>
                </div>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Wallet Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Wallet Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Wallet Nickname</label>
              <Input
                placeholder="e.g., My Main Wallet"
                value={walletNickname}
                onChange={(e) => setWalletNickname(e.target.value)}
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Price Alerts", description: "Notify on significant price movements" },
              { label: "Portfolio Changes", description: "Alert when portfolio value changes >5%" },
              { label: "Weekly Report", description: "Send weekly portfolio summary" },
            ].map((notif) => (
              <label key={notif.label} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <input type="checkbox" defaultChecked className="cursor-pointer" />
                <div>
                  <p className="text-sm font-medium text-white">{notif.label}</p>
                  <p className="text-xs text-slate-500">{notif.description}</p>
                </div>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Network</span>
              <span className="text-white">Fhenix Testnet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Version</span>
              <span className="text-white">1.0.0-alpha</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Status</span>
              <Badge variant="success">Connected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
