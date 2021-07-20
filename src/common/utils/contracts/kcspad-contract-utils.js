import { ethers } from "ethers";
import { WALLET_CONNECT } from "../../constants/app-constants";
import { NETWORK_NAME } from "../../constants/CONTRACT_CONSTANTS";
import {
  getChecksumAddress,
  getSignerOrProvider,
  walletConnectProvider,
} from "./common-contract-utils";

const versionSuffix = "v";

export const getKCSPadContract = (version, providerInfo) => {
  // providerInfo => walletConnector, isReadOnly, networkId
  const { walletConnector, networkId } = providerInfo;
  const networkIdName = NETWORK_NAME[networkId];
  const contractAddress = require(`../../../artifacts/kcspad/${versionSuffix}${version}/contract-address.json`);
  const KCSPad = require(`../../../artifacts/kcspad/${versionSuffix}${version}/KcsPadFactory.json`);
  const signer =
    walletConnector === WALLET_CONNECT
      ? walletConnectProvider().getSigner()
      : getSignerOrProvider(providerInfo);
  return new ethers.Contract(
    getChecksumAddress(contractAddress[networkIdName + "Factory"]),
    KCSPad.abi,
    signer
  );
};
export const getKCSPadAddress = (version, networkId) => {
  const contractAddress = require(`../../../artifacts/kcspad/${versionSuffix}${version}/contract-address.json`);
  const networkIdName = NETWORK_NAME[networkId];
  return getChecksumAddress(contractAddress[networkIdName + "Factory"]);
};

export const getGatherContract = (version, gatherAddress, providerInfo) => {
  // providerInfo => walletConnector, isReadOnly, networkId
  const { walletConnector } = providerInfo;
  const Pool = require(`../../../artifacts/kcspad/${versionSuffix}${version}/Pool.json`);
  const signer =
    walletConnector === WALLET_CONNECT
      ? walletConnectProvider().getSigner()
      : getSignerOrProvider(providerInfo);
  return new ethers.Contract(
    getChecksumAddress(gatherAddress),
    Pool.abi,
    signer
  );
};
