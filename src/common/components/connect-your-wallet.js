import { Button, Dropdown, Menu, message, Row } from "antd";
import Identicon from "identicon.js";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import walletConnectLogo from "../../assets/icons/wallet-connect-logo.svg";
import { META_MASK, WALLET_CONNECT } from "../constants/app-constants";
import {
  initializeMetaMaskNetwork,
  initializeWalletConnectNetwork,
  onDisconnect,
  showWalletList,
} from "./../store/actions/common-action";
import { isAddressConvertableToIcon } from "../utils/general-utils";
import iconExternalLink from "./../../assets/icons/external-link.svg";
import metamaskIcon from "./../../assets/icons/metamask-logo.png";
import notConnectedIcon from "./../../assets/icons/not-connected.png";
import walletIcon from "./../../assets/icons/wallet.svg";
import WalletListModal from "./wallet-list-modal";
class InitializeWallet extends React.Component {
  componentDidMount() {
    const walletConnector = localStorage.getItem("walletConnector");
    const { initializeWalletConnectNetwork, initializeMetaMaskNetwork } =
      this.props;
    if (walletConnector === META_MASK) {
      initializeMetaMaskNetwork();
    }
    if (walletConnector === WALLET_CONNECT) {
      initializeWalletConnectNetwork();
    }
  }
  async connectWallet() {
    const { showWalletList, initializeWalletConnectNetwork } = this.props;
    if (await window.ethereum) {
      showWalletList(true);
    } else {
      initializeWalletConnectNetwork();
    }
  }
  render() {
    const { networkInfo } = this.props.common;
    let { selectedAddress } = this.props.common;
    const selectedAddressLocalStorage = localStorage.getItem("selectedAddress");
    if (!selectedAddress) {
      selectedAddress = selectedAddressLocalStorage;
    }
    const { loader, onDisconnect } = this.props;
    const { explorerUrl } = networkInfo;
    const addressIcon = isAddressConvertableToIcon(selectedAddress)
      ? new Identicon(selectedAddress, 420).toString()
      : null;
    const walletConnector = localStorage.getItem("walletConnector");
    const menuConnected = (
      <Menu className="network-info-dropdown">
        <div className="center padT20">
          <img
            alt="wallet"
            width="40"
            height="40"
            style={{ borderRadius: 30 }}
            src={`data:image/png;base64,${addressIcon}`}
          />
          <div className="padT20 padB20">
            <span
              style={{
                backgroundColor: "#f7f5f5",
                padding: 8,
                borderRadius: 5,
              }}
            >
              <span style={{ fontWeight: 400 }}>
                {selectedAddress && selectedAddress.slice(0, 6)}.....
                {selectedAddress &&
                  selectedAddress.slice(
                    selectedAddress.length - 6,
                    selectedAddress.length
                  )}
                &nbsp;
              </span>
              <CopyToClipboard
                text={selectedAddress}
                onCopy={() => {
                  message.success({
                    content: "Copied!",
                  });
                }}
                style={{
                  cursor: "pointer",
                  color: "rgb(138 140 143)",
                  marginLeft: 6,
                }}
              >
                <i class="far fa-clone"></i>
              </CopyToClipboard>
              <img
                src={iconExternalLink}
                className="pointer"
                onClick={() => {
                  window.open(
                    `${explorerUrl}address/${selectedAddress}`,
                    "_blank"
                  );
                }}
                alt="iconExternalLink"
                style={{ marginBottom: 6, marginLeft: 6 }}
                width="20"
                height="20"
              />
            </span>
          </div>
        </div>
        <Row className="network-info-row">
          <div className="col-4 float-left">Status</div>
          <div className="col-8 float-right txt-align-rt">
            <i
              class="fa fa-circle"
              aria-hidden="true"
              style={{ color: "#008C73" }}
            ></i>
            &nbsp; Connected
          </div>
        </Row>
        <Row className="network-info-row">
          <div className="col-4 float-left">Wallet</div>
          <div className="col-8 float-right txt-align-rt">
            <img
              src={walletIcon}
              className="pointer"
              alt="copy"
              width="18"
              height="18"
            />{" "}
            {walletConnector === WALLET_CONNECT ? "Wallet Connect" : "Metamask"}
          </div>
        </Row>
        <Row className="network-info-row">
          <div className="col-4 float-left">Network</div>
          <div className="col-8 float-right txt-align-rt">
            <i
              class="fa fa-dot-circle"
              aria-hidden="true"
              style={{ color: "#d9dcde" }}
            ></i>{" "}
            &nbsp;
            {networkInfo && networkInfo.networkIdName}
          </div>
        </Row>
        <Row className="network-info-row padding20">
          <Button
            type="secondary"
            disabled={loader}
            className="header-connect-btn btn-disconnect-bg"
            onClick={() => onDisconnect()}
            size="large"
          >
            <span className="gather-action-btn-txt">Disconnect</span>
          </Button>
        </Row>
      </Menu>
    );
    const menuConnect = (
      <Menu className="network-info-dropdown">
        <div className="center padT20 padB20">
          <div style={{ fontSize: 20, fontWeight: 600, paddingBottom: 30 }}>
            Connect a Wallet
          </div>
          <img alt="wallet" width="100" height="100" src={notConnectedIcon} />
        </div>
        <Row className="padding20">
          <Button
            type="secondary"
            disabled={loader}
            className="header-connect-btn"
            onClick={() => this.connectWallet()}
            size="large"
          >
            <span className="gather-action-btn-txt">Connect</span>
          </Button>
        </Row>
      </Menu>
    );
    const {
      initializeMetaMaskNetwork,
      initializeWalletConnectNetwork,
      showWalletList,
    } = this.props;
    const { isWalletList } = this.props.common;
    return (
      <>
        <WalletListModal
          showWalletList={showWalletList}
          isWalletList={isWalletList}
          initializeWalletConnectNetwork={initializeWalletConnectNetwork}
          initializeMetaMaskNetwork={initializeMetaMaskNetwork}
        />
        {selectedAddress && (
          <Dropdown overlay={menuConnected}>
            <Row className="network-info-body pointer">
              <div>
                <img
                  width="40"
                  className="float-left"
                  alt="wallet"
                  height="40"
                  style={{ borderRadius: 10 }}
                  src={
                    walletConnector === WALLET_CONNECT
                      ? walletConnectLogo
                      : metamaskIcon
                  }
                />
                <div className="padL10 float-left header-network-info">
                  <div>
                    {walletConnector === WALLET_CONNECT
                      ? "Wallet Connect"
                      : "Metamask"}
                  </div>
                  {addressIcon && (
                    <img
                      alt="wallet"
                      width="15"
                      height="15"
                      style={{ borderRadius: 10, marginRight: 4 }}
                      src={`data:image/png;base64,${addressIcon}`}
                    />
                  )}
                  {addressIcon &&
                    `${selectedAddress.slice(0, 6)}...${selectedAddress.slice(
                      selectedAddress.length - 4,
                      selectedAddress.length
                    )}`}
                </div>
                <div
                  className="float-left header-network-info"
                  style={{ paddingTop: 8, paddingLeft: 30 }}
                >
                  <p className="network-name float-right">
                    {networkInfo && networkInfo.networkIdName}
                  </p>
                </div>
              </div>
            </Row>
          </Dropdown>
        )}
        {!selectedAddress && (
          <Dropdown overlay={menuConnect}>
            <Row className="network-info-body pointer">
              <div style={{ paddingRight: 100 }}>
                <img
                  width="40"
                  className="float-left"
                  alt="wallet"
                  height="40"
                  src={notConnectedIcon}
                />
                <div className="padL10 float-left">
                  <span style={{ fontWeight: 700 }}>Not Connected</span>
                  <br />
                  &nbsp;
                  <span className="error-clr header-network-info">
                    Connect Wallet
                  </span>
                </div>
              </div>
            </Row>
          </Dropdown>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { common } = state;
  return {
    common,
  };
};

const mapDispatchToProps = (() => ({
  showWalletList,
  initializeMetaMaskNetwork,
  onDisconnect,
  initializeWalletConnectNetwork,
}))();
export default connect(mapStateToProps, mapDispatchToProps)(InitializeWallet);
