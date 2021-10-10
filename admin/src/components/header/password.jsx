import React from "react";
import { Form, Input, Row, Col } from "antd";

export default function ChangePassword({ userInfo }) {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="complex-form"
      layout="vertical"
      onFinish={onFinish}
      fields={[
        {
          name: ["username"],
          value: userInfo ? userInfo.username : "",
        },
      ]}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="username"
            label="Username"
            className="hide-content-multi"
          >
            <Input size="large" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="oldpassword"
            label="Old Password"
            className="hide-content-multi"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your  new password",
              },
            ]}
          >
            <Input.Password size="large" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            label="New Password"
            className="hide-content-multi"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your confirm password",
              },
            ]}
          >
            <Input.Password size="large" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            className="hide-content-multi"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your old password",
              },
            ]}
          >
            <Input.Password size="large" disabled={true} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}