'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { SpotlightButton } from './animations/SpotlightButton';

export function ConnectWallet() {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    if (!isConnected) {
        return (
            <SpotlightButton
                onClick={() => open()}
                variant="primary"
                className="w-full sm:w-auto"
            >
                Connect Wallet
            </SpotlightButton>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <div className="text-sm text-zinc-400">
                {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
            <SpotlightButton
                onClick={() => disconnect()}
                variant="secondary"
                className="w-full sm:w-auto"
            >
                Disconnect
            </SpotlightButton>
        </div>
    );
} 