"use client";

import React from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useWalletConnection } from "@/hooks";
import { DirectConnectButton } from "@/components/wallet/direct-connect-button";

export const Navbar: React.FC = () => {
  const { address, isConnected } = useWalletConnection();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">
            Portfolio Tracker
          </h2>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>

          {/* Settings */}
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>

          {/* Wallet Connect */}
          <div className="flex items-center gap-2">
            <DirectConnectButton />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
