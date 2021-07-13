import { Col, Form, Input } from "antd";
import React from "react";

export default class CreateLaunchpadForm1 extends React.Component {
  render() {
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
              <Input className="input-style" placeholder="Enter token address" />
            </Form.Item>
          </div>
          {/* <div>
            <div className="input-label">
              Auto Distribute
              <div className="input-label-sub-head">
                Funds will distribute automatically
                <br />
                <span
                  className="input-label-sub-head"
                  style={{ color: "#FF483B", fontWeight: 600 }}
                >
                  {" "}
                  <i>*This cannot be changed later</i>
                </span>
              </div>
            </div>
          </div> */}
        </Col>
      </>
    );
  }
}
