import { Col, Form, Input, Select } from "antd";
import React from "react";
const { Option } = Select;

export default class CreateLaunchpadForm2 extends React.Component {
  render() {
    return (
      <>
        <Col>
          <br />
          <br />
          <div>
            <div className="input-label">
              Presale rate*
              <div className="input-label-sub-head">
                If I spend 1 BNB how many tokens will I receive?
              </div>
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
          </div>
          <div>
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
          </div>
          <div>
            <div className="input-label">
              Minimum buy (BNB)*
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
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
          </div>
          <div>
            <div className="input-label">
              Maximum buy (BNB)*
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
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
          </div>
          <div>
            <div className="input-label">
              Start time (UTC)*
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
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
          </div>
          <div>
            <div className="input-label">
              End time (UTC)*
              {/* <div className="input-label-sub-head">
                Softcap must be >= 50% of Hardcap!
              </div> */}
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
          </div>
          <div>
            <div className="input-label">
              Liquidity lockup (minutes)*
              <div className="input-label-sub-head">
                Lock up time must be greater than 5 minutes
              </div>
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
          </div>
        </Col>
      </>
    );
  }
}
