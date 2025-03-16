# Legacy Ledger

Legacy Ledger is a decentralized application (dApp) that allows users to securely store and manage digital assets with inheritance capabilities. Built with Next.js, TypeScript, and Ethereum smart contracts.

DEPLOYED URL :https://legacy-ledger-we8p-git-main-sagarregmi2056s-projects.vercel.app/

## Real-World Problem Solving

Legacy Ledger addresses several critical challenges in digital asset inheritance and management:

### 1. Digital Asset Inheritance
- **Problem**: Traditional inheritance systems aren't designed for digital assets, leading to lost or inaccessible crypto assets after the owner's death.
- **Solution**: Smart contract-based inheritance system that automatically transfers assets to designated beneficiaries under specific conditions.

### 2. Asset Security
- **Problem**: Centralized storage solutions are vulnerable to hacks and single points of failure.
- **Solution**: Decentralized storage on Ethereum blockchain with multi-signature security and time-locked transactions.

### 3. Privacy and Control
- **Problem**: Users want privacy in asset management while ensuring their beneficiaries can access assets when needed.
- **Solution**: 
  - Private asset management during the owner's lifetime
  - Transparent inheritance process
  - Customizable conditions for asset transfer

### 4. Legal Compliance
- **Problem**: Digital assets often exist in a legal grey area regarding inheritance.
- **Solution**: Smart contracts that align with legal requirements and provide verifiable proof of ownership and transfer intentions.

### 5. User Experience
- **Problem**: Blockchain applications are often too complex for non-technical users.
- **Solution**: 
  - Intuitive user interface
  - Simplified wallet connection
  - Clear asset management dashboard
  - Step-by-step inheritance setup

### 6. Cross-Platform Accessibility
- **Problem**: Limited access to digital asset management tools across devices.
- **Solution**: Responsive web application accessible from any device with wallet support.

## Developer Information

### Developer
- **Name**: Sagar Regmi
- **GitHub**: [github.com/sagarregmi](https://github.com/sagarregmi2056)
- **LinkedIn**: [linkedin.com/in/sagarregmi](https://www.linkedin.com/in/sagar-regmi-60b377216/)

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Smart Contracts**: Solidity, Hardhat
- **Authentication**: NextAuth.js
- **Web3**: WalletConnect, wagmi, viem
- **Database**: MongoDB
- **Deployment**: Vercel (Frontend), Sepolia Testnet (Smart Contracts)

### Development Timeline
- **Started**: March 2024
- **Status**: Active Development
- **Version**: 1.0.0

## Features

- 🔐 Secure asset storage and management
- 👥 User authentication with NextAuth.js
- 💼 Web3 integration with WalletConnect
- 🔗 Ethereum Sepolia testnet support
- 📱 Responsive and modern UI
- 🌐 MongoDB database integration

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18 or later)
- npm or yarn
- Git
- MongoDB instance
- MetaMask or any Web3 wallet

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Authentication
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_mongodb_url

# Blockchain
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sagarregmi/legacy-ledger.git
cd legacy-ledger
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Deploy the smart contract:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## Smart Contract Deployment

The project includes a LegacyLedger smart contract that needs to be deployed to the Sepolia testnet:

1. Ensure your `.env` file contains the required blockchain variables
2. Compile the contract:
```bash
npx hardhat compile
```
3. Deploy to Sepolia:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```
4. Verify on Etherscan:
```bash
npx hardhat verify --network sepolia YOUR_DEPLOYED_CONTRACT_ADDRESS
```

## Project Structure

```
legacy-ledger/
├── contracts/           # Smart contracts
├── scripts/            # Deployment scripts
├── src/
│   ├── app/           # Next.js pages and API routes
│   ├── components/    # React components
│   ├── lib/          # Utility functions and configurations
│   ├── models/       # Database models
│   └── providers/    # Context providers
├── public/           # Static files
└── test/            # Contract tests
```

## Testing

Run the test suite:

```bash
# Run contract tests
npx hardhat test

# Run frontend tests
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenZeppelin for smart contract libraries
- Next.js team for the amazing framework
- WalletConnect for Web3 integration
- Hardhat for Ethereum development environment

## Getting Started

1. Clone and install dependencies:
```