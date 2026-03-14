"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'
import { celoSepolia } from 'wagmi/chains'
import { ReactNode } from 'react'

const config = getDefaultConfig({
  appName: 'MaaS Frontend',
  projectId: '1f0b0c16922d9b626cd6cfceabf18c8e', // placeholder
  chains: [celoSepolia],
  ssr: true,
});

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
