export interface Portfolio {
  totalBalance: string;
  usdValue: string;
  dailyPnL: string;
  totalPnL: string;
  lastUpdated: number;
  isActive: boolean;
}

export interface ConnectedWallet {
  address: string;
  chain: string;
  balance?: string;
  isConnected: boolean;
  connectedAt: number;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
  percentage: number;
  icon?: string;
  color: string;
}

export interface PortfolioMetadata {
  nickname: string;
  badgeHash: string;
  createdAt: number;
  verified: boolean;
  badge?: "BRONZE" | "SILVER" | "GOLD" | "WHALE";
}

export interface ThresholdProof {
  isAboveThreshold: boolean;
  thresholdValue: string;
  proofTimestamp: number;
}

export interface PublicCard {
  nickname: string;
  badge: string;
  growthPercentage: number;
  favoriteAsset: string;
  walletAddress: string;
  verified: boolean;
  createdAt: number;
  shareToken?: string;
  expiresAt?: number;
}

export interface PortfolioStats {
  totalBalance: string;
  usdValue: string;
  dayChange: string;
  dayChangePercent: number;
  weekChange: string;
  weekChangePercent: number;
  monthChange: string;
  monthChangePercent: number;
  totalGain: string;
  totalGainPercent: number;
}

export interface PnLHistory {
  date: string;
  value: number;
  pnl: number;
  pnlPercent: number;
}

export interface AssetAllocation {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface EncryptedData {
  encrypted: boolean;
  timestamp: number;
  nonce?: string;
}

export interface NotificationState {
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

export interface PrivacyPreference {
  hideBalance: boolean;
  hideAllocations: boolean;
  hidePnL: boolean;
  enablePublicCard: boolean;
  autoHideAfterMinutes: number;
}

export interface SharedPortfolioData {
  walletNickname: string;
  badge: string;
  growthPercent: number;
  favoriteAsset: string;
  verified: boolean;
  shareToken: string;
  expiresAt: number;
}
