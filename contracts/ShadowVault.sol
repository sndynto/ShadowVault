// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/utils/Permissioned.sol";

/**
 * @title ShadowVault
 * @dev Private portfolio tracker using Fhenix FHE
 */
contract ShadowVault is Permissioned {
    
    /// @dev Encrypted portfolio data for each user
    struct EncryptedPortfolio {
        euint64 totalBalance;      // Total balance in base units
        euint64 usdValue;          // Portfolio value in USD
        euint64 dailyPnL;          // Daily profit/loss
        euint64 totalPnL;          // Total profit/loss
        uint256 lastUpdated;       // Last update timestamp
        bool isActive;             // Portfolio active status
    }
    
    /// @dev Public metadata for portfolio
    struct PublicMetadata {
        string nickname;           // Wallet nickname
        bytes32 badgeHash;         // Encrypted badge tier
        uint256 createdAt;         // Portfolio creation time
        bool verified;             // Verified status
    }
    
    /// @dev Threshold proof result
    struct ThresholdProof {
        bool isAboveThreshold;     // Whether value exceeds threshold
        uint256 thresholdValue;    // The threshold value checked
        uint256 proofTimestamp;    // Timestamp of proof generation
    }
    
    // Events
    event PortfolioCreated(address indexed user, uint256 timestamp);
    event PortfolioUpdated(address indexed user, uint256 timestamp);
    event ProofGenerated(address indexed user, uint256 threshold, bool result);
    event PublicBadgeGenerated(address indexed user, string badge);
    event WalletAdded(address indexed user, address wallet);
    event WalletRemoved(address indexed user, address wallet);
    
    // State
    mapping(address => EncryptedPortfolio) public portfolios;
    mapping(address => PublicMetadata) public metadata;
    mapping(address => address[]) public userWallets;
    mapping(address => mapping(address => bool)) public walletConnected;
    mapping(address => ThresholdProof[]) public proofHistory;
    
    address[] public activeUsers;
    
    // Constants
    uint256 public constant THRESHOLD_1K = 1000 * 10**18;
    uint256 public constant THRESHOLD_10K = 10000 * 10**18;
    uint256 public constant THRESHOLD_100K = 100000 * 10**18;
    
    /**
     * @dev Create or initialize encrypted portfolio
     */
    function depositEncryptedPortfolio(
        einput encryptedAmount,
        string calldata walletNickname
    ) public {
        // Decrypt and validate encrypted amount
        euint64 decryptedAmount = FHE.asEuint64(encryptedAmount);
        
        EncryptedPortfolio storage portfolio = portfolios[msg.sender];
        
        if (!portfolio.isActive) {
            portfolio.isActive = true;
            portfolio.totalBalance = decryptedAmount;
            activeUsers.push(msg.sender);
            
            metadata[msg.sender] = PublicMetadata({
                nickname: walletNickname,
                badgeHash: keccak256(abi.encodePacked(msg.sender, block.timestamp)),
                createdAt: block.timestamp,
                verified: false
            });
            
            emit PortfolioCreated(msg.sender, block.timestamp);
        } else {
            portfolio.totalBalance = decryptedAmount;
            emit PortfolioUpdated(msg.sender, block.timestamp);
        }
        
        portfolio.lastUpdated = block.timestamp;
        _addWallet(msg.sender);
    }
    
    /**
     * @dev Update encrypted portfolio with new values
     */
    function updateEncryptedBalance(
        einput encryptedBalance,
        einput encryptedUSDValue,
        einput encryptedPnL
    ) public {
        require(portfolios[msg.sender].isActive, "Portfolio not active");
        
        EncryptedPortfolio storage portfolio = portfolios[msg.sender];
        
        portfolio.totalBalance = FHE.asEuint64(encryptedBalance);
        portfolio.usdValue = FHE.asEuint64(encryptedUSDValue);
        portfolio.dailyPnL = FHE.asEuint64(encryptedPnL);
        portfolio.lastUpdated = block.timestamp;
        
        emit PortfolioUpdated(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Get private portfolio (only owner can decrypt)
     */
    function getPrivatePortfolio()
        public
        view
        onlyPermitted(msg.sender)
        returns (uint64 balance, uint64 usdValue, uint64 dailyPnL, uint64 totalPnL)
    {
        EncryptedPortfolio storage portfolio = portfolios[msg.sender];
        return (
            FHE.decrypt(portfolio.totalBalance),
            FHE.decrypt(portfolio.usdValue),
            FHE.decrypt(portfolio.dailyPnL),
            FHE.decrypt(portfolio.totalPnL)
        );
    }
    
    /**
     * @dev Verify threshold proof without revealing actual value
     * Checks if portfolio > threshold amount
     */
    function verifyThresholdProof(uint256 threshold)
        public
        returns (bool)
    {
        require(portfolios[msg.sender].isActive, "Portfolio not active");
        require(
            threshold == THRESHOLD_1K ||
            threshold == THRESHOLD_10K ||
            threshold == THRESHOLD_100K,
            "Invalid threshold"
        );
        
        EncryptedPortfolio storage portfolio = portfolios[msg.sender];
        euint64 thresholdValue = FHE.asEuint64(threshold);
        
        // Compare encrypted values: portfolio.usdValue > threshold
        ebool result = FHE.gt(portfolio.usdValue, thresholdValue);
        
        // Store proof
        ThresholdProof memory proof = ThresholdProof({
            isAboveThreshold: FHE.decrypt(result),
            thresholdValue: threshold,
            proofTimestamp: block.timestamp
        });
        
        proofHistory[msg.sender].push(proof);
        emit ProofGenerated(msg.sender, threshold, proof.isAboveThreshold);
        
        return proof.isAboveThreshold;
    }
    
    /**
     * @dev Generate public badge based on encrypted portfolio size
     */
    function generatePublicBadge() public returns (string memory) {
        require(portfolios[msg.sender].isActive, "Portfolio not active");
        
        EncryptedPortfolio storage portfolio = portfolios[msg.sender];
        string memory badge;
        
        // Determine badge tier based on encrypted USD value
        uint64 decryptedValue = FHE.decrypt(portfolio.usdValue);
        
        if (decryptedValue >= THRESHOLD_100K) {
            badge = "WHALE";
        } else if (decryptedValue >= THRESHOLD_10K) {
            badge = "GOLD";
        } else if (decryptedValue >= THRESHOLD_1K) {
            badge = "SILVER";
        } else {
            badge = "BRONZE";
        }
        
        metadata[msg.sender].verified = true;
        emit PublicBadgeGenerated(msg.sender, badge);
        
        return badge;
    }
    
    /**
     * @dev Add additional wallet to portfolio
     */
    function addWallet(address walletAddress) public {
        require(walletAddress != address(0), "Invalid wallet");
        require(!walletConnected[msg.sender][walletAddress], "Wallet already connected");
        
        _addWallet(msg.sender);
        walletConnected[msg.sender][walletAddress] = true;
        userWallets[msg.sender].push(walletAddress);
        
        emit WalletAdded(msg.sender, walletAddress);
    }
    
    /**
     * @dev Remove wallet from portfolio
     */
    function removeWallet(address walletAddress) public {
        require(walletConnected[msg.sender][walletAddress], "Wallet not connected");
        
        walletConnected[msg.sender][walletAddress] = false;
        
        address[] storage wallets = userWallets[msg.sender];
        for (uint256 i = 0; i < wallets.length; i++) {
            if (wallets[i] == walletAddress) {
                wallets[i] = wallets[wallets.length - 1];
                wallets.pop();
                break;
            }
        }
        
        emit WalletRemoved(msg.sender, walletAddress);
    }
    
    /**
     * @dev Get user's connected wallets count
     */
    function getWalletsCount(address user) public view returns (uint256) {
        return userWallets[user].length;
    }
    
    /**
     * @dev Get proof history
     */
    function getProofHistory(address user)
        public
        view
        returns (ThresholdProof[] memory)
    {
        return proofHistory[user];
    }
    
    /**
     * @dev Internal function to add wallet
     */
    function _addWallet(address user) internal {
        if (userWallets[user].length == 0) {
            userWallets[user].push(user);
            walletConnected[user][user] = true;
        }
    }
    
    /**
     * @dev Get total active users
     */
    function getTotalActiveUsers() public view returns (uint256) {
        return activeUsers.length;
    }
}
