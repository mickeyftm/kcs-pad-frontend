import {
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Spin,
  Switch,
  TimePicker,
} from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import errorOutline from "./../../../assets/icons/error_outline.svg";
import { getChecksumAddress } from "../../../common/utils/contracts/common-contract-utils";

export default class CreateLaunchpadForm2 extends React.Component {
  render() {
    const {
      isDropdownMenuVisible,
      setDropdownVisibility,
      loadTokenAddress,
      getCurrencyTokenInfo,
      handleChange,
    } = this.props;
    let { listScatterTokens } = this.props;
    const isListLength0 = listScatterTokens.length === 0 ? false : true;
    listScatterTokens = (
      <Menu
        onClick={({ key }) => {
          getCurrencyTokenInfo(key, true);
          this.setState({ showInputData: true });
          setDropdownVisibility(isDropdownMenuVisible);
        }}
        className="network-info-dropdown width100"
      >
        {listScatterTokens.map((item) => {
          return (
            <Menu.Item
              className="scatter__dropdown-list"
              key={JSON.stringify({
                tokenAddress: item.tokenAddress,
                value: item.value,
              })}
            >
              {item.value}
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <>
        <Col>
          <br />
          <br />
          <div className="padT20 marB10">
            <label className="input-label">Token Address</label>
            <Dropdown
              overlay={listScatterTokens}
              disabled={loadTokenAddress}
              onClick={() => setDropdownVisibility(isDropdownMenuVisible)}
              visible={
                isDropdownMenuVisible ? isListLength0 : isDropdownMenuVisible
              }
            >
            <Form.Item
              name="currencyTokenAddress"
              rules={[
                {
                  required: true,
                  message: "Currency token address cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (value && !getChecksumAddress(value)) {
                      console.log(value);
                      console.log(getChecksumAddress(value));
                      return Promise.reject(`Invalid currency token address!`);
                      // } else if (value && getSaleTokenAddressDetails(value)) {
                      //   return Promise.reject(`Unable to get token details!`);
                    } else {
                      getCurrencyTokenInfo(value);
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                suffix={
                  <Spin
                    spinning={loadTokenAddress}
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 24,
                          float: "right",
                          color: "#2042a8",
                        }}
                      />
                    }
                  ></Spin>
                }
                allowClear
                className="input-style"
                placeholder="Please select or insert your currency token address"
              />
            </Form.Item>
            </Dropdown>
            {/* {(rawTokenAddress === "" || invaliAddress) && formInitialized && (
              <Row className="gd__error-outline marT10">
                <Col span={2}>
                  <img src={errorOutline} alt="errorOutline" />
                </Col>
                <Col span={22}>
                  {invaliAddress
                    ? "Invalid token address"
                    : "Please input token address!"}
                </Col>
              </Row>
            )} */}
          </div>
          <div>
            <div className="input-label">
              Presale rate*
              <div className="input-label-sub-head">
                If I spend 1 BNB how many tokens will I receive?
              </div>
            </div>
            <Form.Item
              name="pricePerToken"
              rules={[
                {
                  required: true,
                  message: "Presale rate cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (parseFloat(value) <= 0) {
                      return Promise.reject(
                        `Presale rate must be greater than 0!`
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                className="input-style"
                onChange={(e) => handleChange(e)}
                placeholder="Enter Price Per Token"
              />
            </Form.Item>
          </div>
          {/* <div>
            <div className="input-label">
              Total Raise
              <div className="input-label-sub-head">Fund raising limit</div>
            </div>
            <Form.Item
              name="gatherName"
              rules={[
                {
                  required: true,
                  message: "Token address cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (value.length > 100) {
                      return Promise.reject(`Token address cannot be blank!`);
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input className="input-style" placeholder="Enter Gather Name" />
            </Form.Item>
          </div> */}
          <div>
            <div className="input-label">
              Softcap (BNB)*
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
            </div>
            <Form.Item
              name="softCap"
              rules={[
                {
                  required: true,
                  message: "Softcap cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (parseFloat(value) <= 0) {
                      return Promise.reject(`Softcap must be greater than 0!`);
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input className="input-style" placeholder="Enter Softcap" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">
              HardCap (BNB)
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
            </div>
            <Form.Item
              name="hardCap"
              rules={[
                {
                  required: true,
                  message: "Hardcap cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (parseFloat(value) <= 0) {
                      return Promise.reject(`Hardcap must be greater than 0!`);
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input className="input-style" placeholder="Enter Hardcap" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">
              Minimum buy (BNB)*
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
            </div>
            <Form.Item
              name="minPurchaseLimit"
              rules={[
                {
                  required: true,
                  message: "Minimum buy cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (parseFloat(value) <= 0) {
                      return Promise.reject(
                        `Minimum buy must be greater than 0!`
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input className="input-style" placeholder="Enter Minimum buy" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">
              HardCap (BNB)
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
            </div>
            <Form.Item
              name="maxPurchaseLimit"
              rules={[
                {
                  required: true,
                  message: "Maximum buy cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (parseFloat(value) <= 0) {
                      return Promise.reject(
                        `Maximum buy must be greater than 0!`
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input className="input-style" placeholder="Enter Maximum buy" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">Start After</div>
            <Input.Group compact>
              <Form.Item
                name="startAfter"
                style={{ width: "50%" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your days!",
                  },
                ]}
              >
                <Input className="input-style" placeholder="Days" />
              </Form.Item>
              <Form.Item
                name="startAfterTime"
                style={{ width: "50%" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your time!",
                  },
                ]}
              >
                <TimePicker className="input-style" style={{ width: "100%" }} />
              </Form.Item>
            </Input.Group>
          </div>
          <div>
            <div className="input-label">Running Period</div>
            <Input.Group compact>
              <Form.Item
                name="runningPeriod"
                style={{ width: "50%" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your days!",
                  },
                ]}
              >
                <Input className="input-style" placeholder="Days" />
              </Form.Item>
              <Form.Item
                name="runningPeriodTime"
                style={{ width: "50%" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your time!",
                  },
                ]}
              >
                <TimePicker className="input-style" style={{ width: "100%" }} />
              </Form.Item>
            </Input.Group>
          </div>
          <div className="form-inline-i form-inline-i_token-address">
            <div className="input-label">Sale Fee Percentage</div>
            <Form.Item
              name="saleFeePercentage"
              rules={[
                {
                  required: true,
                  message: "Please input Sale Fee Percentage!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (
                      parseFloat(value) > 0 &&
                      Math.floor(parseFloat(value)) !== parseFloat(value)
                    ) {
                      let decimalCount =
                        value.toString().split(".")[1].length || 0;
                      if (decimalCount > 2) {
                        return Promise.reject(`Upto 2 decimal places allowed`);
                      } else {
                        return Promise.resolve();
                      }
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                className="input-style"
                style={{ background: "#f5f6fa" }}
                type="number"
                suffix="%"
                placeholder="Enter gather fee"
              />
            </Form.Item>
          </div>
          <div>
            <Row>
              <Col span={12}>
                <div className="input-label">Whitelisting Status</div>
              </Col>
              <Col span={12}>
                <Form.Item style={{ float: "right" }} name="whitelistingStatus">
                  <Switch defaultChecked />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>
      </>
    );
  }
}
