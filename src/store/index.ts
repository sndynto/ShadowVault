import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Portfolio,
  PortfolioMetadata,
  Asset,
  PublicCard,
  PrivacyPreference,
} from "@/types";
import { DEFAULT_PRIVACY_SETTINGS } from "@/constants";

interface PortfolioState {
  // Portfolio Data
  portfolio: Portfolio | null;
  metadata: PortfolioMetadata | null;
  assets: Asset[];
  connectedWallets: string[];
  
  // Public Card
  publicCard: PublicCard | null;
  
  // UI State
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
  
  // Privacy Settings
  privacySettings: PrivacyPreference;
  
  // Visibility State
  showBalance: boolean;
  revealMode: boolean;
  
  // Actions
  setPortfolio: (portfolio: Portfolio) => void;
  setMetadata: (metadata: PortfolioMetadata) => void;
  setAssets: (assets: Asset[]) => void;
  addWallet: (wallet: string) => void;
  removeWallet: (wallet: string) => void;
  setPublicCard: (card: PublicCard) => void;
  setLoading: (loading: boolean) => void;
  setSyncing: (syncing: boolean) => void;
  setError: (error: string | null) => void;
  setPrivacySettings: (settings: Partial<PrivacyPreference>) => void;
  toggleBalance: () => void;
  toggleRevealMode: () => void;
  resetStore: () => void;
}

const defaultPrivacySettings: PrivacyPreference = DEFAULT_PRIVACY_SETTINGS;

export const usePortfolioStore = create<PortfolioState>()(
  devtools((set) => ({
    // Initial State
    portfolio: null,
    metadata: null,
    assets: [],
    connectedWallets: [],
    publicCard: null,
    isLoading: false,
    isSyncing: false,
    error: null,
    privacySettings: defaultPrivacySettings,
    showBalance: true,
    revealMode: false,

    // Actions
    setPortfolio: (portfolio) => set({ portfolio }),
    setMetadata: (metadata) => set({ metadata }),
    setAssets: (assets) => set({ assets }),
    
    addWallet: (wallet) =>
      set((state) => ({
        connectedWallets: [...state.connectedWallets, wallet],
      })),
    
    removeWallet: (wallet) =>
      set((state) => ({
        connectedWallets: state.connectedWallets.filter((w) => w !== wallet),
      })),
    
    setPublicCard: (card) => set({ publicCard: card }),
    
    setLoading: (loading) => set({ isLoading: loading }),
    
    setSyncing: (syncing) => set({ isSyncing: syncing }),
    
    setError: (error) => set({ error }),
    
    setPrivacySettings: (newSettings) =>
      set((state) => ({
        privacySettings: { ...state.privacySettings, ...newSettings },
      })),
    
    toggleBalance: () =>
      set((state) => ({
        showBalance: !state.showBalance,
      })),
    
    toggleRevealMode: () =>
      set((state) => ({
        revealMode: !state.revealMode,
      })),
    
    resetStore: () =>
      set({
        portfolio: null,
        metadata: null,
        assets: [],
        connectedWallets: [],
        publicCard: null,
        isLoading: false,
        isSyncing: false,
        error: null,
        privacySettings: defaultPrivacySettings,
        showBalance: true,
        revealMode: false,
      }),
  }), { name: "PortfolioStore" })
);

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  balance: string | null;
  
  setAddress: (address: string | null) => void;
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setChainId: (chainId: number | null) => void;
  setBalance: (balance: string | null) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>()(
  devtools((set) => ({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    balance: null,
    
    setAddress: (address) => set({ address }),
    setConnected: (connected) => set({ isConnected: connected }),
    setConnecting: (connecting) => set({ isConnecting: connecting }),
    setChainId: (chainId) => set({ chainId }),
    setBalance: (balance) => set({ balance }),
    
    reset: () =>
      set({
        address: null,
        isConnected: false,
        isConnecting: false,
        chainId: null,
        balance: null,
      }),
  }), { name: "WalletStore" })
);

interface NotificationState {
  message: string;
  type: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  
  show: (message: string, type: "success" | "error" | "info" | "warning") => void;
  hide: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools((set) => ({
    message: "",
    type: "info",
    isVisible: false,
    
    show: (message, type) =>
      set({
        message,
        type,
        isVisible: true,
      }),
    
    hide: () =>
      set({
        isVisible: false,
        message: "",
      }),
  }), { name: "NotificationStore" })
);

interface UIState {
  sidebarOpen: boolean;
  isDarkMode: boolean;
  contentLoaded: boolean;
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  setContentLoaded: (loaded: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    sidebarOpen: true,
    isDarkMode: true,
    contentLoaded: false,
    
    toggleSidebar: () =>
      set((state) => ({
        sidebarOpen: !state.sidebarOpen,
      })),
    
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setDarkMode: (dark) => set({ isDarkMode: dark }),
    setContentLoaded: (loaded) => set({ contentLoaded: loaded }),
  }), { name: "UIStore" })
);
