import { Col, Form, Input, Row, Switch, TimePicker, Select } from "antd";
import React from "react";
const { Option } = Select;
export default class CreateLaunchpadForm2 extends React.Component {
  render() {
    const { listCurrency, onChangeCurrency, currency, tokenSymbol } =
      this.props;
    return (
      <>
        <Col>
          <div>
            <label className="input-label">Token Address</label>
            <Form.Item
              name="currencyTokenAddress"
              rules={[
                {
                  required: true,
                  message: "Please select currency token address!",
                },
              ]}
            >
              <Select
                className="input-style"
                placeholder="Select Gather Currency"
                onSelect={(event, value) => onChangeCurrency(event, value)}
              >
                {listCurrency &&
                  listCurrency.map((item) => {
                    const val = [
                      item.currency_name,
                      item.currency_contract_address,
                      item.currency_decimal,
                    ];
                    return <Option value={val}>{item.currency_name}</Option>;
                  })}
              </Select>
            </Form.Item>
          </div>
          <div>
            <div className="input-label">
              Presale rate
              <div className="input-label-sub-head">
                If I spend 1 {currency} how many tokens will I receive?
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
              Softcap ({tokenSymbol})
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
              HardCap ({tokenSymbol})
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
              Minimum buy ({currency})
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
              Maximum buy ({currency})
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
