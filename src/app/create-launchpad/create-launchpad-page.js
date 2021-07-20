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
class CreateLaunchpadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      formData: {},
      loader: false,
      listScatterTokens: [
        {
          label: "EMT",
          value: "EMT - 0x47Ddd1dACC9340668102Efe30f55f4E01566fC89",
          tokenAddress: "0x47Ddd1dACC9340668102Efe30f55f4E01566fC89",
        },
        {
          label: "KCS",
          value: "KCS -  Mainnet Native Currency",
          tokenAddress: "0x0000000000000000000000000000000000000000",
        },
      ],
      staticListScatterTokens: [
        {
          label: "EMT",
          value: "EMT - 0x47Ddd1dACC9340668102Efe30f55f4E01566fC89",
          tokenAddress: "0x47Ddd1dACC9340668102Efe30f55f4E01566fC89",
        },
        {
          label: "KCS",
          value: "KCS -  Mainnet Native Currency",
          tokenAddress: "0x0000000000000000000000000000000000000000",
        },
      ],
    };
  }
  filterTokenDropdownList = (key) => {
    const { staticListScatterTokens } = this.state;
    if (key !== "") {
      this.setState({
        listScatterTokens: _.filter(staticListScatterTokens, (item) => {
          return item.value.toLowerCase().indexOf(key) > -1;
        }),
      });
    } else {
      this.setState({
        listScatterTokens: staticListScatterTokens,
      });
    }
  };
  // componentDidMount() {
  //   console.log(
  //     ethers.utils.getAddress("0x6C9a2aF2f6C8f808AE6aE89A5B3C80f2414480aa")
  //   );
  //   console.log(
  //     ethers.utils.getContractAddress({
  //       from: "0x6a510e68d25e178d2f261cd5d7e27ee060025865",
  //       nonce: 15,
  //     })
  //   );
  // }
  createLaunchpad = (formValue) => {
    let { currentStep } = this.state;
    if (currentStep === 0) {
      this.createLaunchpadVerifyToken(formValue);
    }
    if (currentStep === 1) {
      this.createLaunchpadContractCall(formValue);
    } else {
    }
  };
  // componentDidMount() {
  //   this.createLaunchpadContractCall();
  // }
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
      });
    } else {
      const totalSupply = await erc20Contract.totalSupply();
      erc20Contract.approve(factoryAddress, totalSupply).then(
        async (approvalResult) => {
          await approvalResult.wait();
          this.setState({
            currentStep: 1,
            formData: merge,
          });
          successNotification(
            "Create Launchpad",
            "Sale token approved successfully."
          );
        },
        (error) => {
          errorNotification("Create Launchpad", error.message);
        }
      );
    }
  }
  async createLaunchpadContractCall(formValue) {
    const { config, selectedAddress, networkInfo } = this.props.common;
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
    const currencyTokenERC20Contract = getERC20TokenContract(
      // mergedFormValue.currencyTokenAddress,
      "0xAad328600d28Ba540b75066d697A0F4eD152F0eE",
      {
        walletConnector,
        isReadOnly: true,
        networkId,
      }
    );
    const currencyTokenDecimals = await currencyTokenERC20Contract.decimals();
    // const { saleTokenDecimal } = mergedFormValue;
    console.log(currencyTokenDecimals);
    const saleTokenDecimal = 18;
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
        "0xAad328600d28Ba540b75066d697A0F4eD152F0eE",
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

    const { loader, currentStep, listScatterTokens } = this.state;
    return (
      <>
        <LaunchpadLayout
          activeTab={"factory"}
          Container={
            <Spin spinning={loader}>
              <CreateLaunchpadComponents
                filterTokenDropdownList={this.filterTokenDropdownList}
                createLaunchpad={this.createLaunchpad}
                goToStep={this.goToStep}
                currentStep={currentStep}
                listScatterTokens={listScatterTokens}
                walletConnector={walletConnector}
                networkId={networkId}
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
