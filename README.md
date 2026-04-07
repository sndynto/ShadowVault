# ShadowVault - Private Portfolio Tracker on Fhenix

A decentralized application (dApp) that enables users to track their cryptocurrency portfolio privately using Fhenix's Fully Homomorphic Encryption (FHE). Never reveal your actual balance while proving your wealth tier.

## 🔐 Core Features

### 1. Private Portfolio Dashboard
- **Encrypted Portfolio Data**: All balances, values, and metrics encrypted with FHE
- **Toggle Hidden Mode**: Hide or reveal your balance with a single click
- **Real-time Analytics**: Portfolio growth, daily P&L tracking
- **Multi-Wallet Support**: Aggregate balances from multiple wallets

### 2. Proof of Funds
- Generate cryptographic proofs without revealing actual amounts
- Support for multiple tiers: >$1K, >$10K, >$100K
- On-chain verification with zero-knowledge proofs
- Timestamped proof history

### 3. Hidden Wallet Analytics
- Encrypted portfolio performance charts
- Asset allocation pie charts (encrypted percentages)
- Monthly P&L analysis
- Hidden ranking badges (Bronze, Silver, Gold, Whale)

### 4. Portfolio Sharing
- Create public profile cards with achievements
- Share growth percentages without revealing balances
- Shareable badges showing portfolio tier
- Customizable privacy settings per card

### 5. Privacy Controls
- Full control over what data is visible
- Auto-hide balance after X minutes
- Encrypted data export
- Privacy preference settings

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

### Blockchain
- **Network**: Fhenix Testnet
- **Wallet Integration**: wagmi + viem
- **Wallet UI**: RainbowKit
- **Smart Contracts**: Solidity + Fhenix FHE Library

### UI/UX Features
- Dark mode only with gradient backgrounds
- Glassmorphism cards with blur effects
- Smooth hover interactions
- Skeleton loading states
- Responsive mobile layout

## 📋 Color Palette

```
Background:      #050816
Card Background: rgba(255,255,255,0.05)
Primary Purple:  #8B5CF6
Cyan Accent:     #22D3EE
Blue Accent:     #3B82F6
Text Primary:    #F8FAFC
Text Secondary:  #94A3B8
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Wallet with Fhenix testnet funds
- EVM-compatible wallet (MetaMask, RainbowKit, etc.)

### Installation

1. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

2. **Configure environment**
```bash
# Copy and fill in .env.local
NEXT_PUBLIC_FHENIX_RPC=https://testnet.fhenix.zone:7747
NEXT_PUBLIC_FHENIX_CHAIN_ID=8008
NEXT_PUBLIC_SHADOW_VAULT_ADDRESS=<deployed-contract-address>
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<your-wallet-connect-id>
NEXT_PUBLIC_DEMO_MODE=true
```

3. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
shadow-vault/
├── contracts/
│   └── ShadowVault.sol           # Main FHE smart contract
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── page.tsx              # Landing page
│   │   ├── dashboard/            # Dashboard pages
│   │   ├── analytics/
│   │   ├── proof-of-funds/
│   │   ├── share/
│   │   └── settings/
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   ├── dashboard/            # Dashboard components
│   │   └── layout/               # Layout components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/
│   │   ├── utils.ts              # Utility functions
│   │   └── config.ts             # Configuration
│   ├── constants/                # App constants
│   ├── store/                    # Zustand stores
│   └── types/                    # TypeScript types
├── public/                       # Static assets
└── .env.local                    # Environment variables
```

## 🔧 Smart Contract

### Key Functions

#### `depositEncryptedPortfolio(einput, string)`
Create or initialize encrypted portfolio with wallet nickname.

#### `updateEncryptedBalance(einput, einput, einput)`
Update portfolio with new encrypted balance, USD value, and P&L.

#### `getPrivatePortfolio()`
Retrieve private portfolio (only owner can decrypt).

#### `verifyThresholdProof(uint256)`
Generate cryptographic proof for portfolio tier.

#### `generatePublicBadge()`
Generate public badge based on encrypted portfolio size.

## 💾 State Management

### Zustand Stores
- `usePortfolioStore`: Portfolio data, assets, metadata
- `useWalletStore`: Wallet connection state
- `useNotificationStore`: Toast notifications
- `useUIStore`: UI state (sidebar, theme)

## 🎨 UI Components

### Base Components
- Button, Card, Input, Badge, Loader, Skeleton

### Dashboard Components
- PortfolioCard, AssetAllocation, PerformanceChart, ProofOfFunds, PublicBadge

### Layout Components
- DashboardLayout, Sidebar, Navbar, Providers

## 📊 Demo Mode

Enable demo mode in `.env.local`:
```
NEXT_PUBLIC_DEMO_MODE=true
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_FHENIX_RPC=https://api.fhenix.zone:7747
   NEXT_PUBLIC_FHENIX_CHAIN_ID=8009
   NEXT_PUBLIC_SHADOW_VAULT_ADDRESS=<your-deployed-contract-address>
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<your-walletconnect-project-id>
   NEXT_PUBLIC_API_BASE_URL=https://your-app.vercel.app
   NEXT_PUBLIC_DEMO_MODE=false
   ```

4. **Deploy**
   - Vercel will build and deploy automatically
   - Your app will be live at `https://your-app.vercel.app`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔗 Resources

- [Fhenix Docs](https://docs.fhenix.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📜 License

MIT License

---

**ShadowVault** © 2026 | Powered by Fhenix FHE
