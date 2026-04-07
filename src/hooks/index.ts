"use client";

import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { useBalance } from "wagmi";
import { formatUnits } from "viem";
import { useWalletStore, usePortfolioStore, useNotificationStore } from "@/store";

export const useWalletConnection = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({ address: address ?? undefined });
  
  const setAddress = useWalletStore((state) => state.setAddress);
  const setConnected = useWalletStore((state) => state.setConnected);
  const setConnecting = useWalletStore((state) => state.setConnecting);
  const setChainId = useWalletStore((state) => state.setChainId);
  const setBalance = useWalletStore((state) => state.setBalance);
  const addWallet = usePortfolioStore((state) => state.addWallet);
  
  useEffect(() => {
    setAddress(address || null);
    setConnected(isConnected);
    setConnecting(isConnecting);
    setChainId(chainId || null);
    
    if (balanceData?.value !== undefined) {
      setBalance(formatUnits(balanceData.value, balanceData.decimals));
    }
    
    if (address && isConnected) {
      addWallet(address);
    }
  }, [
    address,
    isConnected,
    isConnecting,
    chainId,
    balanceData,
    setAddress,
    setConnected,
    setConnecting,
    setChainId,
    setBalance,
    addWallet,
  ]);
  
  return {
    address,
    isConnected,
    isConnecting,
    chainId,
    balance: balanceData ? formatUnits(balanceData.value, balanceData.decimals) : null,
  };
};

export const usePortfolioData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const setError = usePortfolioStore((state) => state.setError);
  
  const refetch = async () => {
    setIsLoading(true);
    try {
      // Fetch portfolio data from contract
      // This is a placeholder - implement actual contract call
      if (process.env.NODE_ENV === 'development') {
        console.log("Fetching portfolio data...");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  
  return { portfolio, isLoading, refetch };
};

export const usePrivacy = () => {
  const showBalance = usePortfolioStore((state) => state.showBalance);
  const toggleBalance = usePortfolioStore((state) => state.toggleBalance);
  const revealMode = usePortfolioStore((state) => state.revealMode);
  const toggleRevealMode = usePortfolioStore((state) => state.toggleRevealMode);
  const privacySettings = usePortfolioStore((state) => state.privacySettings);
  const setPrivacySettings = usePortfolioStore((state) => state.setPrivacySettings);
  
  return {
    showBalance,
    toggleBalance,
    revealMode,
    toggleRevealMode,
    privacySettings,
    setPrivacySettings,
  };
};

export const useNotification = () => {
  const { message, type, isVisible, show, hide } = useNotificationStore((state) => state);
  
  const showSuccess = (msg: string) => show(msg, "success");
  const showError = (msg: string) => show(msg, "error");
  const showInfo = (msg: string) => show(msg, "info");
  const showWarning = (msg: string) => show(msg, "warning");
  
  return {
    message,
    type,
    isVisible,
    show,
    hide,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};

export const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay: number
) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  
  const debouncedCallback = (...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    
    const newTimeoutId = window.setTimeout(() => {
      callback(...args);
    }, delay);
    
    setTimeoutId(newTimeoutId);
  };
  
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);
  
  return debouncedCallback;
};

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }
    }
  };
  
  return [storedValue, setValue];
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  
  return matches;
};

export const useMobile = (): boolean => {
  return useMediaQuery("(max-width: 768px)");
};

export { useShadowVault } from "./useShadowVault";
