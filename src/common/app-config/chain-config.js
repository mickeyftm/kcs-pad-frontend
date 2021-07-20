import { ChainId } from "@usedapp/core";
import { BNB, ETH } from "../constants/app-constants";

// export const supportedChains = [1, 56];
export const supportedChains = [1, 56, 4, 97];
export const supportedChainCurrencies = [ETH, BNB];

export const alchemyRinkebyApi = [
  "rinkeby",
  "6Abto5co0LubIKUWva-uq2xpGdUKUc66",
];
export const kcsPadWebSocket = "wss://rpc-ws-testnet.kcc.network";
export const alchemyMainnetApi = [
  "homestead",
  "nfrnWAqN2Frs4UJ_hVhF3xiz_eo9fkKd", //Main
  // "6zaj_RGJ7Qq-sZ3XjDNE6u57hdwsebBb", //Local
];
export const BSCTestnetApi = "https://data-seed-prebsc-1-s1.binance.org:8545";
export const BSCMainnetApi = "https://bsc-dataseed.binance.org";

export const walletConnectRpc = {
  1: "https://eth-mainnet.alchemyapi.io/v2/nfrnWAqN2Frs4UJ_hVhF3xiz_eo9fkKd",
  4: "https://eth-rinkeby.alchemyapi.io/v2/6Abto5co0LubIKUWva-uq2xpGdUKUc66",
};
export const walletConnectBridgeUrl = "https://bridge.walletconnect.org";

export const useDappConfiguration = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]:
      "https://eth-rinkeby.alchemyapi.io/v2/6Abto5co0LubIKUWva-uq2xpGdUKUc66",
  },
};
