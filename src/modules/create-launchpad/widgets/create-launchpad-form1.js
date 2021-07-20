import { Col, Form, Input, Row } from "antd";
import React from "react";
import { getChecksumAddress } from "../../../common/utils/contracts/common-contract-utils";

export default class CreateLaunchpadForm1 extends React.Component {
  render() {
    const {
      tokenSymbol,
      decimals,
      tokenName,
      invalidToken,
      getSaleTokenAddressDetails,
      changeSaleTokenInvalidState,
    } = this.props;
    return (
      <>
        <Col>
          <br />
          <br />
          <div>
            <div className="input-label">
              Token address*
              <div className="input-label-sub-head">Reward token</div>
            </div>
            <Form.Item
              name="saleTokenAddress"
              rules={[
                {
                  required: true,
                  message: "Token address cannot be blank!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value = "") {
                    if (value && !getChecksumAddress(value)) {
                      changeSaleTokenInvalidState();
                      return Promise.reject(`Invalid sale token address!`);
                      // } else if (value && getSaleTokenAddressDetails(value)) {
                      //   return Promise.reject(`Unable to get token details!`);
                    } else {
                      getSaleTokenAddressDetails(value);
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                className="input-style"
                placeholder="Enter sale token address"
              />
            </Form.Item>
          </div>
          <div>
            {invalidToken ? (
              <span
                className="input-label-sub-head"
                style={{ color: "#FF483B", fontWeight: 600 }}
              >
                <i>*Unable to fetch token details!</i>
              </span>
            ) : (
              <>
                <Row className="px-2 pb-10">
                  <Col span={12} className="sale-token-detail-lft">
                    Name
                  </Col>
                  <Col span={12} className="sale-token-detail-rt">
                    {tokenName}
                  </Col>
                  <Col span={12} className="sale-token-detail-lft">
                    Token Symbol
                  </Col>
                  <Col span={12} className="sale-token-detail-rt">
                    {tokenSymbol}
                  </Col>
                  <Col span={12} className="sale-token-detail-lft">
                    Decimals
                  </Col>
                  <Col span={12} className="sale-token-detail-rt">
                    {decimals}
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Col>
      </>
    );
  }
}
