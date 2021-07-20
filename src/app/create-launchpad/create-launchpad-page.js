import { Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import "./../../assets/css/create-launchpad.css";
import LaunchpadLayout from "../../common/layout/launchpad-layout";
import CreateLaunchpadComponents from "../../modules/create-launchpad/create-launchpad-components";
import {
  getKCSPadAddress,
  getKCSPadContract,
} from "../../common/utils/contracts/kcspad-contract-utils";
import { KCS, v1 } from "../../common/constants/app-constants";
import {
  getERC20TokenContract,
  readOnlyProvider,
  readWriteProvider,
} from "../../common/utils/contracts/common-contract-utils";
import Web3 from "web3";
import _ from "lodash";

import {
  kcsPadWebSocket,
  supportedChainCurrencies,
} from "../../common/app-config/chain-config";
import {
  errorNotification,
  successNotification,
} from "../../common/store/actions/common-action";
import { parseCurrency } from "../../common/utils/general-utils";
import { ethers } from "ethers";
import { NATIVE_CURRENCY_NAME } from "../../common/constants/CONTRACT_CONSTANTS";
class CreateLaunchpadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 3,
      formData: {},
      loader: false,
      tokenDecimals: 0,
      tokenSymbol: "",
      tokenName: "",
      invalidToken: true,
      currency: "KCS",
      listCurrency: [
        {
          currency_name: "EMT",
          currency_contract_address:
            "0x47Ddd1dACC9340668102Efe30f55f4E01566fC89",
          currency_decimal: 10,
        },
        {
          currency_name: "KCS",
          currency_decimal: 18,
          currency_contract_address:
            "0x0000000000000000000000000000000000000000",
        },
      ],
    };
    this.formRef = React.createRef();
  }
  onChangeCurrency = (currency, value) => {
    this.setState({ currency: currency && currency[0] });
  };
  setSaleTokenDetail = (tokenName, tokenSymbol, tokenDecimals) => {
    this.setState({
      tokenName,
      tokenSymbol,
      tokenDecimals,
    });
  };
  createLaunchpad = (formValue) => {
    let { currentStep } = this.state;
    this.setState({ loader: true });
    if (currentStep === 0) {
      this.createLaunchpadVerifyToken(formValue);
    }
    if (currentStep === 1) {
      this.createLaunchpadContractCall(formValue);
    } else {
    }
  };

  async createLaunchpadVerifyToken(formValue) {
    const { networkInfo, selectedAddress } = this.props.common;
    const { networkId } = networkInfo;
    const { errorNotification, successNotification } = this.props;
    const walletConnector = localStorage.getItem("walletConnector");
    const erc20Contract = getERC20TokenContract(formValue.saleTokenAddress, {
      walletConnector,
      isReadOnly: false,
      networkId,
    });
    const factoryAddress = getKCSPadAddress(v1, networkId);
    const allowance = await erc20Contract.allowance(
      selectedAddress,
      factoryAddress
    );
    let { formData } = this.state;
    const merge = Object.assign(formData, formValue);
    if (allowance.gt(0)) {
      this.setState({
        currentStep: 1,
        formData: merge,
        loader: false,
      });
    } else {
      const totalSupply = await erc20Contract.totalSupply();
      erc20Contract.approve(factoryAddress, totalSupply).then(
        async (approvalResult) => {
          await approvalResult.wait();
          this.setState({
            currentStep: 1,
            formData: merge,
            loader: false,
          });
          successNotification(
            "Create Launchpad",
            "Sale token approved successfully."
          );
        },
        (error) => {
          this.setState({
            loader: false,
          });
          errorNotification("Create Launchpad", error.message);
        }
      );
    }
  }
  async createLaunchpadContractCall(formValue) {
    const { networkInfo } = this.props.common;
    let { formData } = this.state;
    const { errorNotification, successNotification } = this.props;

    const mergedFormValue = Object.assign(formData, formValue);
    this.setState({
      // currentStep: 2,
      formData: mergedFormValue,
    });
    const { networkId } = networkInfo;
    const walletConnector = localStorage.getItem("walletConnector");
    const kcsPadContract = getKCSPadContract(v1, {
      walletConnector,
      isReadOnly: false,
      networkId,
    });
    let identifier = Date.now();
    const currencyTokenDecimals = mergedFormValue.currencyTokenAddress[2];
    // const { saleTokenDecimal } = mergedFormValue;
    const saleTokenDecimal = mergedFormValue.tokenDecimals;
    console.log(saleTokenDecimal);
    const softCap = parseCurrency(mergedFormValue.softCap, saleTokenDecimal);
    const hardCap = parseCurrency(mergedFormValue.hardCap, saleTokenDecimal);
    const minPurchaseLimit = parseCurrency(
      mergedFormValue.minPurchaseLimit,
      currencyTokenDecimals
    );
    const maxPurchaseLimit = parseCurrency(
      mergedFormValue.maxPurchaseLimit,
      currencyTokenDecimals
    );
    const pricePerToken = parseCurrency(
      mergedFormValue.pricePerToken,
      currencyTokenDecimals
    );
    const startAfter = 86400;
    const runningPeriod = 86400 * 2;
    const createSaleParams = [
      identifier,
      [
        mergedFormValue.saleTokenAddress,
        mergedFormValue.currencyTokenAddress[1],
      ],
      [softCap, hardCap],
      [minPurchaseLimit, maxPurchaseLimit],
      [startAfter, runningPeriod],
      pricePerToken,
      parseFloat(mergedFormValue.saleFeePercentage) * 100,
      mergedFormValue.whitelistingStatus,
    ];
    console.log(createSaleParams);
    kcsPadContract.createSale(...createSaleParams).then(
      async (res) => {
        const tx = await res.wait();
        console.log(tx);
        if (tx.status === 1) {
          successNotification(
            "Create Launchpad",
            "Sale token approved successfully."
          );
        }
      },
      (error) => {
        this.setState({ loader: false });
        errorNotification("Create Launchpad", error.message);
      }
    );
  }
  goToStep = (step) => {
    this.setState({ currentStep: step });
  };
  render() {
    const { networkInfo } = this.props.common;
    const { networkId } = networkInfo;

    const walletConnector = localStorage.getItem("walletConnector");
    const {
      loader,
      currentStep,
      listCurrency,
      tokenSymbol,
      tokenDecimals,
      tokenName,
      invalidToken,
      currency,
    } = this.state;
    return (
      <>
        <LaunchpadLayout
          activeTab={"factory"}
          Container={
            <Spin spinning={loader}>
              <CreateLaunchpadComponents
                createLaunchpad={this.createLaunchpad}
                goToStep={this.goToStep}
                currentStep={currentStep}
                currency={currency}
                listCurrency={listCurrency}
                walletConnector={walletConnector}
                networkId={networkId}
                tokenDecimals={tokenDecimals}
                tokenSymbol={tokenSymbol}
                tokenName={tokenName}
                invalidToken={invalidToken}
                onChangeCurrency={this.onChangeCurrency}
                setSaleTokenDetail={this.setSaleTokenDetail}
                // changeSaleTokenInvalidState={this.changeSaleTokenInvalidState}
                getSaleTokenAddressDetails={(saleTokenAddress) =>
                  this.getSaleTokenAddressDetails(saleTokenAddress)
                }
              />
            </Spin>
          }
        />
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
  errorNotification,
  successNotification,
}))();
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLaunchpadPage);
