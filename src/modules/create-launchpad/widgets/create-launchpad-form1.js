import { Col, Form, Input, Row, Spin } from "antd";
import React from "react";
import { getChecksumAddress } from "../../../common/utils/contracts/common-contract-utils";
import { LoadingOutlined } from "@ant-design/icons";

export default class CreateLaunchpadForm1 extends React.Component {
  render() {
    const {
      tokenSymbol,
      tokenDecimals,
      tokenName,
      getSaleTokenAddressDetails,
      loadTokenDetail,
    } = this.props;
    return (
      <>
        <Col>
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
                      return Promise.reject(`Invalid sale token address!`);
                    } else {
                      getSaleTokenAddressDetails(value);
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Spin
                spinning={loadTokenDetail}
                indicator={<LoadingOutlined className="token-loader" />}
              >
                <Input
                  className="input-style"
                  placeholder="Enter sale token address"
                />
              </Spin>
            </Form.Item>
          </div>
          <div>
            <>
              {tokenName && (
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
                    {tokenDecimals}
                  </Col>
                </Row>
              )}
            </>
          </div>
        </Col>
      </>
    );
  }
}
