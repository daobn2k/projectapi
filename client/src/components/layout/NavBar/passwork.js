import React from "react";
import { Form, Input, Row, Col } from "antd";

export default function ChangePassword({ userInfo, isEditDetail }) {
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
            label="Full Name"
            className="hide-content-multi"
          >
            <Input size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="oldpassword"
            label="Old Password"
            className="hide-content-multi"
          >
            <Input.Password size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            label="New Password"
            className="hide-content-multi"
          >
            <Input.Password size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            className="hide-content-multi"
          >
            <Input.Password size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
