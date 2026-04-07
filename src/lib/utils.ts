import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { THRESHOLDS } from "@/constants";

/**
 * Merge classNames with tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency values
 */
export const formatCurrency = (value: string | number, decimals = 2): string => {
  try {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  } catch {
    return "$0.00";
  }
};

/**
 * Format number with commas
 */
export const formatNumber = (value: string | number, decimals = 2): string => {
  try {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "0";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  } catch {
    return "0";
  }
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals = 2): string => {
  try {
    return `${(value >= 0 ? "+" : "")}${value.toFixed(decimals)}%`;
  } catch {
    return "0%";
  }
};

/**
 * Shorten wallet address
 */
export const shortenAddress = (
  address: string,
  chars = 4
): string => {
  if (!address) return "";
  const parsed = address.substring(0, 2) === "0x" ? address : `0x${address}`;
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
};

/**
 * Encrypt data (placeholder - implement actual encryption)
 */
export const encryptData = (data: unknown): string => {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return "";
  }
};

/**
 * Decrypt data (placeholder - implement actual decryption)
 */
export const decryptData = (encrypted: string): unknown => {
  try {
    return JSON.parse(atob(encrypted));
  } catch {
    return null;
  }
};

/**
 * Get badge tier based on USD value
 */
export const getBadgeTier = (
  value: number | string
): "BRONZE" | "SILVER" | "GOLD" | "WHALE" => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (numValue >= 100000) return "WHALE";
  if (numValue >= 10000) return "GOLD";
  if (numValue >= 1000) return "SILVER";
  return "BRONZE";
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

/**
 * Generate random color
 */
export const generateRandomColor = (): string => {
  const colors = [
    "#8B5CF6",
    "#3B82F6",
    "#22D3EE",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
    "#14B8A6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Validate Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Convert to wei
 */
export const toWei = (value: string | number): string => {
  try {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return (num * 10 ** 18).toString();
  } catch {
    return "0";
  }
};

/**
 * Debug logging utility - only logs in development mode
 */
export const debugLog = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ShadowVault Debug] ${message}`, ...args);
  }
};

/**
 * Debug error logging utility - only logs in development mode
 */
export const debugError = (message: string, error?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[ShadowVault Error] ${message}`, error);
  }
};

/**
 * Convert from wei
 */
export const fromWei = (value: string | number): string => {
  try {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return (num / 10 ** 18).toString();
  } catch {
    return "0";
  }
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Generate mock portfolio data
 */
export const generateMockPortfolioData = () => {
  const baseValue = Math.random() * 500000 + 50000; // 50k - 550k
  const variance = (Math.random() - 0.5) * baseValue * 0.1; // ±5% variance
  
  return {
    totalBalance: (baseValue + variance).toFixed(2),
    usdValue: (baseValue + variance).toFixed(2),
    dayChange: (Math.random() * 5000 - 2500).toFixed(2),
    totalGain: (Math.random() * 100000).toFixed(2),
  };
};

/**
 * Format date
 */
export const formatDate = (date: Date | string | number): string => {
  try {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

/**
 * Format time
 */
export const formatTime = (date: Date | string | number): string => {
  try {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return "";
  }
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate share token
 */
export const generateShareToken = (): string => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

/**
 * Verify threshold
 */
export const verifyThreshold = (
  value: number,
  threshold: keyof typeof THRESHOLDS
): boolean => {
  const thresholdValue = parseFloat(THRESHOLDS[threshold].value) / 10 ** 18;
  return value > thresholdValue;
};
