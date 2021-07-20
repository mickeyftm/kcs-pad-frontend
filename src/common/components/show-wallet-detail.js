import { message, Modal } from "antd";
import Identicon from "identicon.js";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isAddressConvertableToIcon } from "../utils/general-utils";

const ShowWalletDetail = ({
  isWalletDetail,
  showWalletDetail,
  selectedAddress,
  networkInfo,
}) => {
  const addressIcon = isAddressConvertableToIcon(selectedAddress)
    ? new Identicon(selectedAddress, 420).toString()
    : null;
  return (
    <>
      <Modal
        centered
        visible={isWalletDetail}
        onOk={() => showWalletDetail(false)}
        onCancel={() => showWalletDetail(false)}
        footer={null}
        closable={true}
      >
        <div className="center" style={{ paddingTop: 70, paddingBottom: 70 }}>
          <img
            width="60"
            alt="wallet"
            height="60"
            onClick={() => {
              this.showWalletDetail(true);
            }}
            style={{ borderRadius: 30 }}
            src={`data:image/png;base64,${addressIcon}`}
          />
          <CopyToClipboard
            text={selectedAddress}
            onCopy={() => {
              message.success({
                content: "Copied!",
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="padT20">
              <div className="create-gather-txt padB10">
                {networkInfo && networkInfo.networkIdName}
              </div>
              <span className="app-clr">
                {selectedAddress && selectedAddress}
              </span>
            </div>
          </CopyToClipboard>
        </div>
      </Modal>
    </>
  );
};
export default ShowWalletDetail;
