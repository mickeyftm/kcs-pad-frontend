import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { notification } from "antd";
import Axios from "axios";
import { createBrowserHistory } from "history";
import { walletConnectBridgeUrl } from "../../app-config/chain-config";
import { META_MASK, WALLET_CONNECT } from "../../constants/app-constants";
import BACKENDURL from "../../constants/backend-urls";
import {
  getChecksumAddress,
  readWriteProvider,
} from "../../utils/contracts/common-contract-utils";
import * as actionType from "./../action-types/common-action-type";

const setShowWalletList = (payload) => ({
  type: actionType.SHOW_WALLET_LIST,
  payload,
});
export const showWalletList = (key) => (dispatch) => {
  dispatch(setShowWalletList(key));
};
const setSelectedAddress = (payload) => ({
  type: actionType.SET_SELECTED_ADDRESS,
  payload,
});

const setConfig = (payload) => ({
  type: actionType.SET_CONFIG,
  payload,
});
const setNetworkInfo = (payload) => ({
  type: actionType.SET_NETWORK_INFO,
  payload,
});

export const updateSelectedAddress = (key) => (dispatch) => {
  dispatch(setSelectedAddress(key));
};

export const getConfig = (configName) => {
  return (dispatch) => {
    return Axios({
      method: "post",
      url: BACKENDURL.getConfig,
      data: { config_name: configName },
    })
      .then((response) => {
        const config =
          response &&
          response.data &&
          response.data[0] &&
          response.data[0].config;
        dispatch(setConfig(JSON.parse(config)));
        // dispatch(setConfig({ "contributorsInSlot": 1, "gatherDaoFee": 0.5, "dappVersion": "v3" }))
        return response;
      })
      .catch((error) => {
        console.log("Config fetching error", error);
        return error;
      });
  };
};

export const getPendingTrxByWalletAndGather = (
  walletAddress,
  gatherAddress
) => {
  return (dispatch) => {
    return Axios({
      method: "post",
      url: `${BACKENDURL.getPendingTrxByWalletAndGather}`,
      data: { wallet_address: walletAddress, gather_address: gatherAddress },
    })
      .then((response) => {
        // console.log('Pendig trx fetching completed')
        return response.data;
      })
      .catch((error) => {
        console.log("Pendig trx fetching error", error);
        return error;
      });
  };
};
export const customNotification =
  (type, message, description) => (dispatch) => {
    notification[type]({
      message: message,
      description: description,
      top: 80,
    });
  };

export const successNotification = (message, description) => (dispatch) => {
  notification["success"]({
    message: message,
    description: description,
    top: 80,
    // placement:'bottomRight'
  });
};
export const errorNotification = (message, description) => (dispatch) => {
  notification["error"]({
    message: message,
    description: description,
    top: 80,
  });
};
export const warningNotification = (message, description) => (dispatch) => {
  notification["warning"]({
    message: message,
    description: description,
    top: 80,
  });
};
export const goToContribution = (poolAddress) => (dispatch) => {
  setTimeout(() => {
    window.location.href = `/gathers/${poolAddress}`;
  }, 200);
};
export const navigate = (url) => (dispatch) => {
  const history = createBrowserHistory();
  history.push(url);
  window.location.reload();
};

export const getNetworkInfo = (networkId) => (dispatch) => {
  let networkIdName,
    trustApiName,
    explorerUrl,
    nativeCurrency,
    nativeCurrencyDecimals;
  switch (networkId && networkId.toString()) {
    case "1":
      networkIdName = "ETH Mainnet";
      trustApiName = "api";
      nativeCurrency = "ETH";
      nativeCurrencyDecimals = 18;
      explorerUrl = "https://etherscan.io/";
      break;
    case "3":
      networkIdName = "Ropsten";
      trustApiName = "ropsten";
      nativeCurrencyDecimals = 18;
      nativeCurrency = "ETH";
      explorerUrl = "https://ropsten.etherscan.io/";
      break;
    case "4":
      networkIdName = "Rinkeby";
      trustApiName = "rinkeby";
      nativeCurrencyDecimals = 18;
      nativeCurrency = "ETH";
      explorerUrl = "https://rinkeby.etherscan.io/";
      break;
    case "42":
      networkIdName = "Kovan";
      trustApiName = "kovan";
      nativeCurrencyDecimals = 18;
      nativeCurrency = "ETH";
      explorerUrl = "https://kovan.etherscan.io/";
      break;
    case "97":
      networkIdName = "BSC Testnet";
      trustApiName = "BSC";
      nativeCurrencyDecimals = 18;
      nativeCurrency = "BNB";
      explorerUrl = "https://testnet.bscscan.com/";
      break;
    case "56":
      networkIdName = "BSC Mainnet";
      trustApiName = "BSC";
      nativeCurrencyDecimals = 18;
      nativeCurrency = "BNB";
      explorerUrl = "https://bscscan.com/";
      break;
    default:
      networkIdName = "";
  }
  dispatch(
    setNetworkInfo({
      networkIdName,
      trustApiName,
      nativeCurrency,
      explorerUrl,
      networkId: parseInt(networkId),
      nativeCurrencyDecimals,
    })
  );
};

// Wallet Initialization
export const initializeMetaMaskNetwork = () => {
  return async (dispatch) => {
    const [selectedAddress] = await window.ethereum.enable();
    dispatch(updateSelectedAddress(getChecksumAddress(selectedAddress)));
    // dispatch(updateSelectedAddress(getChecksumAddress('0xe3ce0ab69bbcf986a5a1f7826f58205048d62d60')))
    localStorage.setItem("walletConnector", META_MASK);
    const provider = readWriteProvider();
    const network = await provider.getNetwork();
    dispatch(getNetworkInfo(network.chainId));
    localStorage.setItem(
      "selectedAddress",
      getChecksumAddress(selectedAddress)
    );
    dispatch(subscribeToMetaMaskEvents());
    return network;
  };
};
const subscribeToMetaMaskEvents = () => (dispatch) => {
  window.ethereum.on("accountsChanged", ([newAddress]) => {
    dispatch(updateSelectedAddress(getChecksumAddress(newAddress)));
    localStorage.setItem("selectedAddress", getChecksumAddress(newAddress));
  });
  window.ethereum.on("networkChanged", (networkId) => {
    dispatch(getNetworkInfo(networkId));
    window.location.reload();
  });
};

// Wallet Connect
export const initializeWalletConnectNetwork = () => {
  return async (dispatch) => {
    const walletConnect = new WalletConnect({
      bridge: walletConnectBridgeUrl,
      qrcodeModal: QRCodeModal,
    });
    // await this.props.updateWalletConnect(walletConnect);
    if (!walletConnect.connected) {
      localStorage.setItem("walletConnector", WALLET_CONNECT);
      await walletConnect.createSession();
    }
    await dispatch(subscribeToWalletConnectEvents(walletConnect));
  };
};
const subscribeToWalletConnectEvents = (walletConnect) => (dispatch) => {
  if (!walletConnect) {
    return;
  }
  walletConnect.on("session_update", async (error, payload) => {
    if (error) {
      throw error;
    }
    const { chainId, accounts } = payload.params[0];
    dispatch(setAccountAndNetwork(accounts, chainId));
  });
  walletConnect.on("connect", (error, payload) => {
    if (error) {
      console.log("connect Error", error);
      throw error;
    }
    const { chainId, accounts } = payload.params[0];
    dispatch(setAccountAndNetwork(accounts, chainId));
  });

  walletConnect.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }
    dispatch(setAccountAndNetwork(undefined, undefined));
  });
  if (walletConnect.connected) {
    const { chainId, accounts } = walletConnect;
    dispatch(setAccountAndNetwork(accounts, chainId));
  }
};
const setAccountAndNetwork = (accounts, chainId) => (dispatch) => {
  let address = accounts && accounts[0];
  address = address && getChecksumAddress(address);
  dispatch(updateSelectedAddress(address));
  dispatch(getNetworkInfo(chainId));
  if (address) {
    localStorage.setItem("selectedAddress", address);
  } else {
    localStorage.removeItem("selectedAddress");
  }
};

// Disconnect
export const onDisconnect = () => (dispatch) => {
  const walletConnector = localStorage.getItem("walletConnector");
  if (walletConnector === WALLET_CONNECT) {
    const walletConnect = new WalletConnect({
      bridge: walletConnectBridgeUrl,
      qrcodeModal: QRCodeModal,
    });
    if (walletConnect) {
      walletConnect.killSession();
    }
  }
  localStorage.removeItem("walletConnector");
  dispatch(setAccountAndNetwork(undefined, 1));
};
