'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { sepolia } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Create QueryClient
const queryClient = new QueryClient();

// Get projectId from WalletConnect Cloud
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
    console.error('WalletConnect Project ID is not defined in environment variables');
}

// Create metadata
const metadata = {
    name: 'Legacy Ledger',
    description: 'Legacy Ledger Web3 App',
    url: 'https://legacy-ledger-we8p.vercel.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Configure wagmi client
const wagmiConfig = defaultWagmiConfig({
    chains: [sepolia],
    projectId: projectId || '',
    metadata,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            // Initialize Web3Modal on client side only
            createWeb3Modal({
                wagmiConfig,
                projectId: projectId || '',
                themeMode: 'dark'
            });
            setMounted(true);
        }
    }, [mounted]);

    // Prevent hydration errors
    if (!mounted) return null;

    return (
        <WagmiConfig config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiConfig>
    );
} 