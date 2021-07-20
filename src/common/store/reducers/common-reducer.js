import * as actionType from "./../action-types/common-action-type";

const initialState = {
  selectedAddress: null,
  config: {},
  isWalletList: false,
  networkInfo: {
    networkId: null,
    networkIdName: "Mainnet",
    trustApiName: "api",
    nativeCurrency: "ETH",
    nativeCurrencyDecimals: 18,
    explorerUrl: "https://etherscan.io",
  },
};
const handler = (currentState) => {
  const setConfig = (payload) => ({ ...currentState, config: payload });
  const showWalletList = (payload) => ({
    ...currentState,
    isWalletList: payload,
  });
  const setNetworkInfo = (payload) => ({
    ...currentState,
    networkInfo: payload,
  });
  const selectedAddress = (payload) => ({
    ...currentState,
    selectedAddress: payload,
  });
  return {
    selectedAddress,
    setNetworkInfo,
    showWalletList,
    setConfig,
  };
};
export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case actionType.SET_CONFIG:
      return handler(state).setConfig(payload);
    case actionType.SET_SELECTED_ADDRESS:
      return handler(state).selectedAddress(payload);
    case actionType.SET_NETWORK_INFO:
      return handler(state).setNetworkInfo(payload);
    case actionType.SHOW_WALLET_LIST:
      return handler(state).showWalletList(payload);
    default:
      return state;
  }
};
