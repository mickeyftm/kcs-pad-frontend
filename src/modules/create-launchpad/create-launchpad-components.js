import React from "react";
import { Button, Form } from "antd";
import DjangoCSRFToken from "django-react-csrftoken";
import stepCompleted from "./../../assets/icons/step-completed.png";
import stepPending from "./../../assets/icons/step-pending.png";
import CreateLaunchpadForm1 from "./widgets/create-launchpad-form1";
import CreateLaunchpadForm2 from "./widgets/create-launchpad-form2";
import CreateLaunchpadForm3 from "./widgets/create-launchpad-form3";
import {
  getChecksumAddress,
  getERC20TokenContract,
} from "../../common/utils/contracts/common-contract-utils";
import moment from "moment";
import {
  EMPTY_ADDRESS,
  NATIVE_CURRENCY_NAME,
} from "../../common/constants/CONTRACT_CONSTANTS";
class CreateLaunchpadComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decimals: 0,
      tokenSymbol: "",
      tokenName: "",
      invalidToken: true,
      rawTokenAddress: "",
      validInputtedTokenAddress: "",
      isDropdownMenuVisible: false,
      invaliAddress: false,
      loadTokenAddress: false,
      formInitialized: false,
    };
    this.formRef = React.createRef();
  }
  setDropdownVisibility = (isDropdownMenuVisible) => {
    this.setState({ isDropdownMenuVisible: !isDropdownMenuVisible });
  };
  async getCurrencyTokenInfo(currencyTokenAddress, isDropdown) {
    if (!isDropdown) {
      const { filterTokenDropdownList } = this.props;
      filterTokenDropdownList(currencyTokenAddress);
      const walletConnector = localStorage.getItem("walletConnector");
      const { networkId } = this.props;
      let tokenName = "";
      let tokenSymbol = "";
      if (currencyTokenAddress !== EMPTY_ADDRESS) {
        this.setState({ loadTokenAddress: true });
        try {
          const tokenContract = getERC20TokenContract(currencyTokenAddress, {
            isReadOnly: true,
            networkId,
            walletConnector,
          });
          tokenName = await tokenContract.name();
          tokenSymbol = await tokenContract.symbol();
          this.formRef.current.setFieldsValue({
            currencyTokenAddress: `${tokenName} (${tokenSymbol}) - ${currencyTokenAddress}`,
          });
          this.setState({
            loadTokenAddress: false,
          });
        } catch (error) {
          this.formRef.current.setFields([
            {
              name: "currencyTokenAddress",
              errors: ["Unable to fetch contract details"],
            },
          ]);
          this.setState({ loadTokenAddress: false });
        }
      } else {
        this.formRef.current.setFields([
          {
            name: "currencyTokenAddress",
            errors: "",
          },
        ]);
        this.formRef.current.setFieldsValue({
          currencyTokenAddress: `${NATIVE_CURRENCY_NAME[networkId]} - Mainnet Native Currency`,
        });
      }
    } else {
      const obj = JSON.parse(currencyTokenAddress);
      this.formRef.current.setFieldsValue({
        currencyTokenAddress: obj.value,
      });
    }
  }
  changeSaleTokenInvalidState = () => {
    this.setState({
      invalidToken: true,
    });
  };
  handleChange = (e) => {
    console.log(e);
    // this.formRef.current.resetFields();
  };
  render() {
    const getSaleTokenAddressDetails = async (saleTokenAddress) => {
      const { walletConnector, networkId } = this.props;
      try {
        const tokenContract = getERC20TokenContract(saleTokenAddress, {
          walletConnector,
          isReadOnly: true,
          networkId,
        });
        const decimals = await tokenContract.decimals();
        const tokenName = await tokenContract.name();
        const tokenSymbol = await tokenContract.symbol();
        this.setState({
          tokenName,
          tokenSymbol,
          decimals,
          invalidToken: false,
        });
        return false;
      } catch {
        this.setState({
          invalidToken: true,
        });
        return true;
      }
    };
    const { currentStep, goToStep, createLaunchpad, listScatterTokens } =
      this.props;
    const {
      tokenSymbol,
      decimals,
      tokenName,
      invalidToken,
      invaliAddress,
      loadTokenAddress,
      formInitialized,
      isDropdownMenuVisible,
    } = this.state;
    const steps = [
      {
        content: (
          <CreateLaunchpadForm1
            decimals={decimals}
            tokenSymbol={tokenSymbol}
            tokenName={tokenName}
            invalidToken={invalidToken}
            changeSaleTokenInvalidState={this.changeSaleTokenInvalidState}
            getSaleTokenAddressDetails={(saleTokenAddress) =>
              getSaleTokenAddressDetails(saleTokenAddress)
            }
          />
        ),
      },
      {
        content: (
          <CreateLaunchpadForm2
            isDropdownMenuVisible={isDropdownMenuVisible}
            setDropdownVisibility={this.setDropdownVisibility}
            invaliAddress={invaliAddress}
            loadTokenAddress={loadTokenAddress}
            formInitialized={formInitialized}
            listScatterTokens={listScatterTokens}
            handleChange={this.handleChange}
            getCurrencyTokenInfo={(currencyTokenAddress, isDropdown) =>
              this.getCurrencyTokenInfo(currencyTokenAddress, isDropdown)
            }
          />
        ),
      },
      {
        content: <CreateLaunchpadForm3 />,
      },
    ];
    return (
      <>
        <div
          className="create-launchpad-form-layout"
          style={
            currentStep === 3
              ? { height: 440, paddingBottom: 50 }
              : { paddingBottom: 50 }
          }
        >
          <div className="create-launchpad-txt">Create Launchpad </div>
          <div className="form-steps">
            <div className="row">
              <div className="float-left col padding0">
                <div className="float-left">
                  <img
                    className="pointer"
                    src={currentStep < 1 ? stepPending : stepCompleted}
                    onClick={() => goToStep(0)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 1
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    Verify Token
                  </div>
                </div>
                <div style={{ marginLeft: 40 }}>
                  <hr
                    className={
                      currentStep < 1
                        ? "from-step-line"
                        : "from-step-line bg-clr-blue"
                    }
                  />
                </div>
              </div>
              <div className="float-left col padding0">
                <div
                  className={
                    currentStep < 2
                      ? "not-allowed float-left"
                      : "pointer float-left"
                  }
                >
                  <img
                    className={currentStep < 2 ? "disable" : "pointer"}
                    src={currentStep < 2 ? stepPending : stepCompleted}
                    onClick={() => goToStep(1)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 2
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    DeFi Launchpad Info
                  </div>
                </div>
                <div style={{ marginLeft: 40 }}>
                  <hr
                    className={
                      currentStep < 2
                        ? "from-step-line"
                        : "from-step-line bg-clr-blue"
                    }
                  />
                </div>
              </div>{" "}
              <div className="float-left col padding0">
                <div
                  className={
                    currentStep < 2
                      ? "not-allowed float-left"
                      : "pointer float-left"
                  }
                >
                  <img
                    className={currentStep < 2 ? "disable" : "pointer"}
                    src={currentStep < 2 ? stepPending : stepCompleted}
                    onClick={() => goToStep(1)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 2
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    Add Additional Info
                  </div>
                </div>
                <div style={{ marginLeft: 40 }}>
                  <hr
                    className={
                      currentStep < 2
                        ? "from-step-line"
                        : "from-step-line bg-clr-blue"
                    }
                  />
                </div>
              </div>
              <div className="float-left padding0">
                <div
                  className={
                    currentStep < 3
                      ? "not-allowed float-left"
                      : "pointer float-left"
                  }
                >
                  <img
                    className={currentStep < 3 ? "disable" : "pointer"}
                    src={currentStep < 3 ? stepPending : stepCompleted}
                    onClick={() => goToStep(2)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 3
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    Review
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gather-steps-content">
            <Form
              name="startGatherForm"
              id="startGatherForm"
              ref={this.formRef}
              initialValues={{
                saleTokenAddress: "0x47Ddd1dACC9340668102Efe30f55f4E01566fC89",
                currencyTokenAddress:
                  "0x47Ddd1dACC9340668102Efe30f55f4E01566fC89",
                softCap: "1",
                hardCap: "10",
                minPurchaseLimit: "2",
                maxPurchaseLimit: "4",
                pricePerToken: "10",
                whitelistingStatus: true,
                saleFeePercentage: "2",
                startAfter: 0,
                startAfterTime: moment("00:04:00", "HH:mm:ss"),
                runningPeriod: 0,
                runningPeriodTime: moment("00:04:00", "HH:mm:ss"),
              }}
              onFinish={createLaunchpad}
            >
              <DjangoCSRFToken />
              {currentStep !== 3 && (
                <>
                  {" "}
                  {steps[currentStep].content}
                  <div className="padT30">
                    <Button type="secondary" size="large" htmlType="submit">
                      <span className="continue-txt">
                        {currentStep === 2 ? "Submit" : "Continue"}
                      </span>
                    </Button>
                  </div>
                  {/* <div className="padT10 padB30">
                    <span
                      className="gather-sub-head"
                      style={{ color: "#FF483B", fontWeight: 600 }}
                    >
                      {" "}
                      <i>
                        *Warning : GatherDAO does not support deflationary
                        tokens
                      </i>
                    </span>
                  </div> */}
                </>
              )}
              {currentStep === 3 && (
                <div className="center padT30">
                  <br />
                  Error Message
                </div>
              )}
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default CreateLaunchpadComponents;
