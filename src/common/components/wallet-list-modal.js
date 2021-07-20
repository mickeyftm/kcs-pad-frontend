import { Modal, Row } from 'antd';
import React from 'react';
import metaMaskLogo from '../../assets/icons/metamask.svg';
import walletConnectLogo from '../../assets/icons/wallet-connect-logo.svg';

const WalletListModal = ({ showWalletList, isWalletList, initializeWalletConnectNetwork, initializeMetaMaskNetwork }) => {
    return (
        <>
            <Modal
                centered
                visible={isWalletList}
                onOk={() => showWalletList(false)}
                onCancel={() => showWalletList(false)}
                footer={null}
                closable={false}
            >
                <Row className="padB10">
                    <button type="button" onClick={() => {
                        initializeMetaMaskNetwork()
                        showWalletList()
                    }} class="btn btn-light width100 round">
                        <img className="metamask-logo padB10" alt="logo" src={metaMaskLogo} />
                        <div className="connect-wallet-head">
                            MetaMask<br />
                            <span className="app-clr">Connect to your MetaMask Wallet</span>
                        </div>
                    </button>
                </Row>
                <Row>
                    <button type="button" onClick={() => {
                        initializeWalletConnectNetwork()
                        showWalletList()
                    }}
                        class="btn btn-light width100 round">
                        <img className="metamask-logo padB10" alt="logo" src={walletConnectLogo} />
                        <div className="connect-wallet-head">
                            WalletConnect<br />
                            <span className="app-clr">Scan with WalletConnect to connect</span>
                        </div>
                    </button>
                </Row>
            </Modal>
        </>
    );
};
export default WalletListModal;
