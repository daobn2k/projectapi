import React, { Fragment } from "react";
import { Form, Input, Row, Col, Button } from "antd";

export default function ChangePassword({
  userInfo,
  isEdit,
  onCancel,
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
            rules={[
              {
                required: true,
                message: "Please input your  new password",
              },
              {
                validator(_, value) {
                  console.log(value);
                  if (!value || value.length > 6 || value.length < 16) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match , value can't not length < 6  or > 16!"
                    )
                  );
                },
              },
            ]}
          >
            <Input.Password
              size="large"
              disabled={isEdit}
              placeholder="*******"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            label="New Password"
            dependencies={["oldpassword"]}
            className="hide-content-multi"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your confirm password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue("oldpassword") !== value ||
                    value.length > 6 ||
                    value.length < 16
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match , value can't not length < 6  or > 16!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              disabled={isEdit}
              placeholder="*******"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            className="hide-content-multi"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match , value can't not length < 6  or > 16!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              disabled={isEdit}
              placeholder="*******"
            />
          </Form.Item>
        </Col>
        <Col span={24} className="col-24">
          {}
          {!isEdit && (
            <Fragment>
              <Form.Item className="hide-content-multi">
                <Button className="button_save" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
              <Form.Item className="hide-content-multi">
                <Button className="button_cancel" onClick={onCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Col>
      </Row>
    </Form>
  );
}
