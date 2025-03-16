'use client';

import { SessionProvider } from 'next-auth/react';
import { Web3Provider } from './Web3Provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Web3Provider>{children}</Web3Provider>
            </SessionProvider>
        </QueryClientProvider>
    );
} 