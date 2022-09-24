import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "components/mainLayout";

import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
  defaultChains,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.rinkeby],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    })
  ],
  provider,
  webSocketProvider,
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={client}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </WagmiConfig>
  );
};

export default MyApp;
