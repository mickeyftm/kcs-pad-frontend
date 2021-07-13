import { Col, Form, Input } from "antd";
import React from "react";
export default class CreateLaunchpadForm3 extends React.Component {
  render() {
    return (
      <>
        <Col>
          <div className="form-inline-i form-inline-i_token-address">
            <label className="input-label">
              Add Admin Wallets (max 3)
              <div className="gather-sub-head">
                Add admin wallet address (Optional)
              </div>
            </label>
            <div className="gather-admin-pr">
              <Form.Item name="adminAddress1">
                <Input
                  className="input-style"
                  onChange={(e) => this.setState({ admin1: e.target.value })}
                  placeholder="First Admin Wallet Address"
                />
              </Form.Item>
            </div>
          </div>
          <div className="gather-admin-pr">
            <Form.Item name="adminAddress2">
              <Input
                className="input-style"
                onChange={(e) => this.setState({ admin2: e.target.value })}
                placeholder="Second Admin Wallet Address"
              />
            </Form.Item>
          </div>
          <div className="gather-admin-pr">
            <Form.Item name="adminAddress3">
              <Input
                className="input-style"
                placeholder="Third Admin Wallet Address"
              />
            </Form.Item>
          </div>
        </Col>
      </>
    );
  }
}
