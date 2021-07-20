import React, { useState } from "react";
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
import CreateLaunchpadForm4 from "./widgets/create-launchpad-form4";
export function CreateLaunchpadComponents({
  onChangeCurrency,
  currentStep,
  goToStep,
  createLaunchpad,
  listCurrency,
  tokenSymbol,
  tokenDecimals,
  tokenName,
  invalidToken,
  currency,
  walletConnector,
  networkId,
  setSaleTokenDetail,
}) {
  const [form] = Form.useForm();
  const [isInvalidTokenSale, setIsInvalidTokenSale] = useState(false);
  const [loadTokenDetail, setLoadTokenDetail] = useState(false);
  const getSaleTokenAddressDetails = async (saleTokenAddress) => {
    setLoadTokenDetail(true);
    try {
      const tokenContract = getERC20TokenContract(saleTokenAddress, {
        walletConnector,
        isReadOnly: true,
        networkId,
      });
      const tokenDecimals = await tokenContract.decimals();
      const tokenName = await tokenContract.name();
      const tokenSymbol = await tokenContract.symbol();
      setSaleTokenDetail(tokenName, tokenSymbol, tokenDecimals);
      setIsInvalidTokenSale(false);
      setLoadTokenDetail(false);
    } catch {
      setIsInvalidTokenSale(true);
      setSaleTokenDetail("", "", "");
      setLoadTokenDetail(false);
      form.setFields([
        {
          name: "saleTokenAddress",
          errors: ["Unable to fetch contract details"],
        },
      ]);
    }
  };
  // async getCurrencyTokenInfo(currencyTokenAddress, isDropdown) {
  //   if (!isDropdown) {
  //     const { filterTokenDropdownList } = this.props;
  //     filterTokenDropdownList(currencyTokenAddress);
  //     const walletConnector = localStorage.getItem("walletConnector");
  //     const { networkId } = this.props;
  //     let tokenName = "";
  //     let tokenSymbol = "";
  //     if (currencyTokenAddress !== EMPTY_ADDRESS) {
  //       this.setState({ loadTokenAddress: true });
  //       try {
  //         const tokenContract = getERC20TokenContract(currencyTokenAddress, {
  //           isReadOnly: true,
  //           networkId,
  //           walletConnector,
  //         });
  //         tokenName = await tokenContract.name();
  //         tokenSymbol = await tokenContract.symbol();
  //         this.formRef.current.setFieldsValue({
  //           currencyTokenAddress: `${tokenName} (${tokenSymbol}) - ${currencyTokenAddress}`,
  //         });
  //         this.setState({
  //           loadTokenAddress: false,
  //         });
  //       } catch (error) {
  //         this.formRef.current.setFields([
  //           {
  //             name: "currencyTokenAddress",
  //             errors: ["Unable to fetch contract details"],
  //           },
  //         ]);
  //         this.setState({ loadTokenAddress: false });
  //       }
  //     } else {
  //       this.formRef.current.setFields([
  //         {
  //           name: "currencyTokenAddress",
  //           errors: "",
  //         },
  //       ]);
  //       this.formRef.current.setFieldsValue({
  //         currencyTokenAddress: `${NATIVE_CURRENCY_NAME[networkId]} - Mainnet Native Currency`,
  //       });
  //     }
  //   } else {
  //     const obj = JSON.parse(currencyTokenAddress);
  //     this.formRef.current.setFieldsValue({
  //       currencyTokenAddress: obj.value,
  //     });
  //   }
  // }
  // changeSaleTokenInvalidState = () => {
  //   this.setState({
  //     invalidToken: true,
  //   });
  // };
  const steps = [
    {
      content: (
        <CreateLaunchpadForm1
          tokenDecimals={tokenDecimals}
          tokenSymbol={tokenSymbol}
          loadTokenDetail={loadTokenDetail}
          tokenName={tokenName}
          isInvalidTokenSale={isInvalidTokenSale}
          getSaleTokenAddressDetails={getSaleTokenAddressDetails}
        />
      ),
    },
    {
      content: (
        <CreateLaunchpadForm2
          onChangeCurrency={onChangeCurrency}
          listCurrency={listCurrency}
          currency={currency}
          tokenSymbol={tokenSymbol}
        />
      ),
    },
    {
      content: <CreateLaunchpadForm3 />,
    },
    {
      content: <CreateLaunchpadForm4 />,
    },
  ];
  return (
    <>
      <div
        className="create-launchpad-form-layout"
        style={
          currentStep === 4
            ? { height: 440, paddingBottom: 50 }
            : { paddingBottom: 50 }
        }
      >
        <div className="create-launchpad-txt">Create Launchpad </div>
        <div className="form-steps">
          <div className="row">
            <div className="float-left">
              <div className="float-left">
                <img
                  className="pointer"
                  src={currentStep < 1 ? stepPending : stepCompleted}
                  onClick={() => goToStep(0)}
                  alt="step"
                />
              </div>
              <div
                className={
                  currentStep < 1 ? "steptxt-pending" : "steptxt-completed"
                }
              >
                Verify Token
              </div>
              <div style={{ marginLeft: 40 }}>
                <hr
                  className={
                    currentStep < 1
                      ? "form-step-line"
                      : "form-step-line-completed"
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
              </div>
              <div
                className={
                  currentStep < 2 ? "steptxt-pending" : "steptxt-completed"
                }
              >
                DeFi Launchpad Info
              </div>
              <div style={{ marginLeft: 40 }}>
                <hr
                  className={
                    currentStep < 2
                      ? "form-step-line"
                      : "form-step-line-completed"
                  }
                />
              </div>
            </div>{" "}
            <div className="float-left col padding0">
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
              </div>
              <div
                className={
                  currentStep < 3 ? "steptxt-pending" : "steptxt-completed"
                }
              >
                Add Additional Info
              </div>
              <div style={{ marginLeft: 40 }}>
                <hr
                  className={
                    currentStep < 3
                      ? "form-step-line"
                      : "form-step-line-completed"
                  }
                />
              </div>
            </div>
            <div className="float-left padding0">
              <div
                className={
                  currentStep < 4
                    ? "not-allowed float-left"
                    : "pointer float-left"
                }
              >
                <img
                  className={currentStep < 4 ? "disable" : "pointer"}
                  src={currentStep < 4 ? stepPending : stepCompleted}
                  onClick={() => goToStep(3)}
                  alt="step"
                />
              </div>
              {/* <div
                  className={
                    currentStep !== 3 ? "steptxt-pending" : "steptxt-completed"
                  }
                >
                  Review
                </div> */}
            </div>
          </div>
        </div>
        <div className="gather-steps-content">
          <Form
            name="startGatherForm"
            id="startGatherForm"
            form={form}
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
            onFinish={(formValue) =>
              createLaunchpad({ ...formValue, tokenDecimals })
            }
          >
            <DjangoCSRFToken />
            {currentStep !== 4 && (
              <div className="mt-10">
                {" "}
                {steps[currentStep].content}
                <div className="pt-10">
                  <Button
                    type="secondary"
                    disabled={isInvalidTokenSale}
                    size="large"
                    htmlType="submit"
                  >
                    <span className="continue-txt">
                      {currentStep === 2 ? "Submit" : "Continue"}
                    </span>
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 4 && (
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

export default CreateLaunchpadComponents;
