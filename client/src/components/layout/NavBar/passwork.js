import React from "react";
import { Form, Input, Row, Col, Button } from "antd";

export default function ChangePassword({
  userInfo,
  isEditDetail,
  onEditCancel,
  editPassword,
}) {
  const onFinish = (values) => {
    const data = {
      current: values.oldpassword,
      new: values.password,
    };
    editPassword(data);
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
            label="User Name"
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
        <Col span={24} className="col-24">
          {!isEditDetail && (
            <React.Fragment>
              <Form.Item className="hide-content-multi">
                <Button className="button_save" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
              <Form.Item className="hide-content-multi">
                <Button className="button_cancel" onClick={onEditCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </React.Fragment>
          )}
        </Col>
      </Row>
    </Form>
  );
}
