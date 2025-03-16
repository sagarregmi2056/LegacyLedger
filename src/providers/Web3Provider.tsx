'use client';

import { Web3Modal } from '@web3modal/react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { sepolia } from 'viem/chains';
import { EthereumClient, w3mProvider } from '@web3modal/ethereum';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Create QueryClient
const queryClient = new QueryClient();

// 1. Get projectId from WalletConnect Cloud
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

// 2. Create wagmiConfig
const chains = [sepolia];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new InjectedConnector({ chains }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId,
            },
        }),
    ],
    publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiConfig>
            <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                themeMode="dark"
            />
        </>
    );
} 