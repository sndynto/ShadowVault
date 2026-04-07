"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { PublicCard } from "@/types";
import { BADGE_COLORS, COLORS } from "@/constants";
import { copyToClipboard } from "@/lib/utils";
import { useNotificationStore } from "@/store";

interface PublicBadgeProps {
  card: PublicCard | null;
  onShare?: () => void;
  isLoading?: boolean;
}

export const PublicBadge: React.FC<PublicBadgeProps> = ({
  card,
  onShare,
  isLoading = false,
}) => {
  const { show } = useNotificationStore();

  const handleCopyShare = async () => {
    if (card?.shareToken) {
      const shareUrl = `${window.location.origin}/share/${card.shareToken}`;
      const copied = await copyToClipboard(shareUrl);
      if (copied) {
        show("Share link copied to clipboard!", "success");
      }
    }
  };

  if (!card) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Public Badge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-400 mb-4">No badge generated yet</p>
            <Button onClick={onShare} isLoading={isLoading}>
              Generate Badge
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const badgeStyle = BADGE_COLORS[card.badge as keyof typeof BADGE_COLORS] || BADGE_COLORS.BRONZE;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Public Card</CardTitle>
          {card.verified && <Badge variant="success">✓ Verified</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {/* Badge Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-br ${badgeStyle.bg} border ${badgeStyle.border} rounded-xl p-6 mb-6 text-center`}
        >
          <div className={`text-4xl font-bold ${badgeStyle.text} mb-2`}>
            {card.badge}
          </div>
          <p className="text-sm text-white/80 mb-1">{card.nickname}</p>
          <p className="text-xs text-white/60">
            {card.growthPercentage >= 0 ? "+" : ""}{card.growthPercentage.toFixed(2)}% growth
          </p>
        </motion.div>

        {/* Card Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-slate-400">Nickname</p>
            <p className="text-sm font-medium text-white">{card.nickname}</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-slate-400">Favorite Asset</p>
            <p className="text-sm font-medium text-white">{card.favoriteAsset}</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-slate-400">Portfolio Growth</p>
            <p className={`text-sm font-medium ${card.growthPercentage >= 0 ? "text-green-400" : "text-red-400"}`}>
              {card.growthPercentage >= 0 ? "+" : ""}{card.growthPercentage.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Share Button */}
        <Button
          onClick={handleCopyShare}
          className="w-full gap-2"
          variant="secondary"
        >
          <Share2 className="w-4 h-4" />
          <Copy className="w-4 h-4" />
          Copy Share Link
        </Button>

        <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-xs text-purple-300">
          ✨ Your public card shows growth and achievements without revealing your actual balance.
        </div>
      </CardContent>
    </Card>
  );
};
