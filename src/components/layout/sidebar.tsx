"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Shield,
  Share2,
  Settings,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { useUIStore } from "@/store";
import { useMobile } from "@/hooks";
import { Button } from "@/components/ui";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/proof-of-funds", label: "Proof of Funds", icon: Shield },
  { href: "/share", label: "Sharing", icon: Share2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const isMobile = useMobile();

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        onClick={toggleSidebar}
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 lg:hidden z-40"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: isMobile ? -256 : 0 }}
        animate={{ x: isMobile ? (sidebarOpen ? 0 : -256) : 0 }}
        className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-black border-r border-white/10 z-40 lg:static lg:translate-x-0 pt-8 px-4"
      >
        {/* Logo */}
        <div className="mb-8 px-4">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-6 h-6 text-orange-400 drop-shadow-lg" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              ShadowVault
            </h1>
          </div>
          <p className="text-xs text-slate-500">Powered by Fhenix FHE</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ x: 0 }}
                  onClick={() => !isActive && isMobile && toggleSidebar()}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30"
                      : "text-slate-400 hover:text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-xs text-cyan-300">
            🔐 All data on-chain encrypted with FHE
          </div>
        </div>
      </motion.aside>
    </>
  );
};
