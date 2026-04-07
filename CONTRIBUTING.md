# Contributing to ShadowVault

Thank you for your interest in contributing to ShadowVault! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/shadow-vault.git
cd shadow-vault

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your environment variables
# Edit .env.local with your values

# Start development server
npm run dev
```

## 🛠 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly

### 3. Test Your Changes
```bash
# Run linting
npm run lint

# Build the project
npm run build

# Test wallet integration
# - Connect wallet
# - Test proof generation
# - Test disconnect functionality
```

### 4. Submit a Pull Request
- Ensure all tests pass
- Update documentation if needed
- Provide a clear description of changes

## 📋 Code Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define proper types for all data structures
- Avoid `any` type when possible

### React
- Use functional components with hooks
- Follow React best practices
- Use proper error boundaries

### Web3 Integration
- Always validate wallet connections
- Handle transaction errors gracefully
- Never store private keys in code

### Security
- Never commit `.env.local` files
- Validate all user inputs
- Use HTTPS for production deployments

## 🔒 Security Considerations

### Wallet Security
- All transactions require user signature
- No private keys stored in application
- Use wagmi hooks for safe wallet interactions

### Environment Variables
- Never commit sensitive data
- Use `.env.example` as template
- Set production variables in deployment platform

### Smart Contract Interactions
- Validate contract addresses
- Handle transaction failures
- Provide clear error messages

## 📝 Commit Guidelines

Use clear, descriptive commit messages:
```
feat: add proof generation feature
fix: resolve wallet connection issue
docs: update README with deployment instructions
```

## 🐛 Reporting Issues

When reporting bugs, please include:
- Browser and version
- Wallet type and version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check existing documentation
- Review the codebase for examples

Thank you for contributing to ShadowVault! 🎉