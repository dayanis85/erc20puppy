"use-client"

import { WagmiProvider, createConfig, http } from "wagmi"
import { arbitrumSepolia, arbitrum } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { testnetRpcUrl, mainnetRpcUrl } from "../../back-end/contracts"

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [arbitrum],
    transports: {
      [arbitrum.id]: http(mainnetRpcUrl),
    },

    // Required API Keys
    walletConnectProjectId: "b8479a23d56f952664cd377ed894ed16",

    // Required App Info
    appName: "Airdrop",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

const queryClient = new QueryClient()

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
