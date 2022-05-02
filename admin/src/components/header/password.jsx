import React, { Fragment } from "react";
import { Form, Input, Row, Col, Button } from "antd";

export default function ChangePassword({
  userInfo,
  isEdit,
  onCancel,
  editPassword,
}) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const data = {
      old_pass: values.oldpassword,
      new_pass: values.password,
    };
    editPassword(data);
    form.resetFields()
  };
  return (
    <Form
      name="complex-form"
      form={form}
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
            label="Tên đăng nhập"
            className="hide-content-multi"
          >
            <Input size="large" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="oldpassword"
            label="Mật khẩu hiện tại"
            className="hide-content-multi"
            rules={[
              {
                required: true,
                message: "Điền mật khẩu cũ "
              },
              {
                validator(_, value) {
                  if (!value || value.length > 6 || value.length < 16) {
                    return Promise.resolve();
                  }
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
            label="Mật khẩu mới"
            dependencies={["oldpassword"]}
            className="hide-content-multi"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Điền mật khẩu mới của bạn",
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
                      "Mật khẩu không giống nhau"
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
            label="Mật khẩu xác nhận"
            className="hide-content-multi"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Điền mật khẩu xác nhận của bạn",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Mật khẩu không giống với mật khẩu mới"
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
                  Lưu
                </Button>
              </Form.Item>
              <Form.Item className="hide-content-multi">
                <Button className="button_cancel" onClick={onCancel}>
                  Hủy bỏ
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Col>
      </Row>
    </Form>
  );
}
