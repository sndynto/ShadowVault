// Network Configuration
export const FHENIX_TESTNET = {
  id: 8008,
  name: "Fhenix Testnet",
  rpcUrl: "https://testnet.fhenix.zone:7747",
  blockExplorer: "https://testnet-explorer.fhenix.zone",
  chainId: 8008,
};

// Contract Addresses (example - update with actual deployed addresses)
export const CONTRACT_ADDRESSES = {
  shadowVault: process.env.NEXT_PUBLIC_SHADOW_VAULT_ADDRESS || "", // Update with deployed address
};

// Color Palette
export const COLORS = {
  background: "#050816",
  cardBackground: "rgba(255,255,255,0.05)",
  primary: "#EA580C",
  primaryLight: "#FB923C",
  cyan: "#22D3EE",
  blue: "#3B82F6",
  blueAccent: "#60A5FA",
  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  border: "rgba(148, 163, 184, 0.2)",
  hover: "rgba(234, 88, 12, 0.1)",
};

// Badge Colors
export const BADGE_COLORS = {
  BRONZE: {
    bg: "from-amber-900 to-yellow-800",
    text: "text-amber-400",
    border: "border-amber-500",
  },
  SILVER: {
    bg: "from-gray-700 to-slate-700",
    text: "text-gray-300",
    border: "border-gray-500",
  },
  GOLD: {
    bg: "from-yellow-600 to-amber-700",
    text: "text-yellow-300",
    border: "border-yellow-500",
  },
  WHALE: {
    bg: "from-purple-600 to-blue-600",
    text: "text-purple-300",
    border: "border-purple-500",
  },
};

// Asset Configuration
export const SUPPORTED_ASSETS = [
  { symbol: "ETH", name: "Ethereum", icon: "⟠", color: "#627EEA" },
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "#F7931A" },
  { symbol: "USDC", name: "USD Coin", icon: "◎", color: "#2775CA" },
  { symbol: "FHE", name: "Fhenix", icon: "🔐", color: "#8B5CF6" },
  { symbol: "USDT", name: "Tether", icon: "₮", color: "#26A17B" },
  { symbol: "DAI", name: "Dai", icon: "◆", color: "#F5AC37" },
];

// Threshold Values (in USD with 18 decimals)
export const THRESHOLDS = {
  LEVEL_1: {
    name: "Portfolio > $1,000",
    value: "1000000000000000000000", // 1000 * 10^18
    badge: "ENTRY",
  },
  LEVEL_2: {
    name: "Portfolio > $10,000",
    value: "10000000000000000000000", // 10000 * 10^18
    badge: "INTERMEDIATE",
  },
  LEVEL_3: {
    name: "Portfolio > $100,000",
    value: "100000000000000000000000", // 100000 * 10^18
    badge: "ELITE",
  },
};

// Demo Data
export const DEMO_PORTFOLIO = {
  totalBalance: "245,850.32",
  usdValue: "$245,850.32",
  dayChange: "+2,340.50",
  dayChangePercent: 0.96,
  weekChange: "+8,245.75",
  weekChangePercent: 3.47,
  monthChange: "+28,450.25",
  monthChangePercent: 13.08,
  totalGain: "42,580.90",
  totalGainPercent: 21.04,
};

export const DEMO_ASSETS = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    balance: "45.5",
    usdValue: "$98,456.75",
    percentage: 40.08,
    icon: "⟠",
    color: "#627EEA",
  },
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    balance: "3.2",
    usdValue: "$92,320.50",
    percentage: 37.56,
    icon: "₿",
    color: "#F7931A",
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    balance: "25000",
    usdValue: "$25,000.00",
    percentage: 10.17,
    icon: "◎",
    color: "#2775CA",
  },
  {
    id: "fhe",
    symbol: "FHE",
    name: "Fhenix",
    balance: "8500",
    usdValue: "$14,195.50",
    percentage: 5.78,
    icon: "🔐",
    color: "#8B5CF6",
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "Dai",
    balance: "15877.57",
    usdValue: "$15,877.57",
    percentage: 6.46,
    icon: "◆",
    color: "#F5AC37",
  },
];

// Chart Data
export const DEMO_CHART_DATA = [
  { date: "Jan 1", value: 168420, pnl: -5000 },
  { date: "Jan 8", value: 175630, pnl: 7210 },
  { date: "Jan 15", value: 182450, pnl: 6820 },
  { date: "Jan 22", value: 195320, pnl: 12870 },
  { date: "Jan 29", value: 202180, pnl: 6860 },
  { date: "Feb 5", value: 217405, pnl: 15225 },
  { date: "Feb 12", value: 225600, pnl: 8195 },
  { date: "Feb 19", value: 231250, pnl: 5650 },
  { date: "Feb 26", value: 245850, pnl: 14600 },
];

// Animation Settings
export const ANIMATION_DURATION = {
  fast: 0.2,
  standard: 0.4,
  slow: 0.6,
};

// Privacy Settings Defaults
export const DEFAULT_PRIVACY_SETTINGS = {
  hideBalance: false,
  hideAllocations: false,
  hidePnL: false,
  enablePublicCard: false,
  autoHideAfterMinutes: 15,
};

// Notification Defaults
export const NOTIFICATION_DURATION = 3000; // 3 seconds
export const NOTIFICATION_POSITION = "bottom-right";

// Pagination
export const ITEMS_PER_PAGE = 10;

// Date Format
export const DATE_FORMAT = "MMM dd, yyyy";
export const TIME_FORMAT = "HH:mm:ss";

// Blockchain Config
export const GAS_LIMIT = "200000";
export const GAS_PRICE_MULTIPLIER = 1.2;

// Demo Mode
export const DEMO_MODE_ENABLED = true;
export const DEMO_REFRESH_INTERVAL = 5000; // 5 seconds
