import { Col, Form, Input } from "antd";
import React from "react";
export default class CreateLaunchpadForm3 extends React.Component {
  render() {
    return (
      <>
        <Col>
          <div>
            <div className="input-label">
              Logo URL
              <div className="input-label-sub-head">
                URL must end with a supported image extension png, jpg, jpeg or
                gif
              </div>
            </div>
            <Form.Item
              name="logo"
              rules={[
                {
                  required: true,
                  message: "Logo cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Logo..." />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">Website</div>
            <Form.Item
              name="website"
              rules={[
                {
                  required: true,
                  message: "Website cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Enter website URL" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">Facebook</div>
            <Form.Item
              name="facebook"
              rules={[
                {
                  required: true,
                  message: "Facebook cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Enter facebook URL" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">Twitter</div>
            <Form.Item
              name="twitter"
              rules={[
                {
                  required: true,
                  message: "Twitter cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Enter twitter URL" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">Github</div>
            <Form.Item
              name="github"
              rules={[
                {
                  required: true,
                  message: "Github cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Enter github URL" />
            </Form.Item>
          </div>
          <div>
            <div className="input-label">Telegram</div>
            <Form.Item
              name="telegram"
              rules={[
                {
                  required: true,
                  message: "Telegram cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Enter telegram URL" />
            </Form.Item>
          </div>{" "}
          <div>
            <div className="input-label">Instagram</div>
            <Form.Item
              name="instagram"
              rules={[
                {
                  required: true,
                  message: "Instagram cannot be blank!",
                },
              ]}
            >
              <Input
                className="input-style"
                placeholder="Enter instagram URL"
              />
            </Form.Item>
          </div>{" "}
          <div>
            <div className="input-label">Discord</div>
            <Form.Item
              name="discord"
              rules={[
                {
                  required: true,
                  message: "Discord cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Enter discord URL" />
            </Form.Item>
          </div>{" "}
          <div>
            <div className="input-label">Reddit</div>
            <Form.Item
              name="reddit"
              rules={[
                {
                  required: true,
                  message: "Reddit cannot be blank!",
                },
              ]}
            >
              <Input className="input-style" placeholder="Enter reddit URL" />
            </Form.Item>
          </div>
        </Col>
      </>
    );
  }
}
