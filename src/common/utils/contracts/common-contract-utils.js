import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
import { ethersErc20Abi } from "../../../artifacts/erc20/ethers-erc20-abi";
import {
  alchemyMainnetApi,
  alchemyRinkebyApi,
  BSCTestnetApi,
  walletConnectRpc,
  BSCMainnetApi,
  kcsPadWebSocket,
} from "../../app-config/chain-config";
import { WALLET_CONNECT } from "../../constants/app-constants";

export const getChecksumAddress = (address) => {
  try {
    return ethers.utils.getAddress(address);
  } catch {
    return false;
  }
};
export const readWriteProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
};

export const walletConnectProvider = () => {
  const wcConnection = new WalletConnectProvider({
    rpc: walletConnectRpc,
  });
  wcConnection.enable();
  const wcProvider = new providers.Web3Provider(wcConnection);
  return wcProvider;
};

export const readOnlyProvider = (networkId) => {
  if (networkId === 97) {
    return new ethers.providers.JsonRpcProvider(BSCTestnetApi);
  } else if (networkId === 56) {
    return new ethers.providers.JsonRpcProvider(BSCMainnetApi);
  } else if (networkId === 4) {
    return new ethers.providers.AlchemyProvider(...alchemyRinkebyApi);
  } else if (networkId === 1) {
    return new ethers.providers.AlchemyProvider(...alchemyMainnetApi);
  } else if (networkId === 322) {
    return new ethers.providers.WebSocketProvider(kcsPadWebSocket);
  }
};

export const getSignerOrProvider = (providerInfo) => {
  const { isReadOnly, networkId } = providerInfo;
  if (isReadOnly) {
    return readOnlyProvider(networkId);
  } else {
    return readWriteProvider().getSigner(0);
  }
};

export const getERC20TokenContract = (tokenAddress, providerInfo) => {
  // providerInfo => walletConnector, isReadOnly, networkId
  const { walletConnector } = providerInfo;
  const signer =
    walletConnector === WALLET_CONNECT
      ? walletConnectProvider().getSigner()
      : getSignerOrProvider(providerInfo);
  return new ethers.Contract(
    getChecksumAddress(tokenAddress),
    ethersErc20Abi,
    signer
  );
};
