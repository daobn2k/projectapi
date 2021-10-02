import React from "react";
import { Form, Input, Button, DatePicker, Checkbox } from "antd";
export default function ModalSignIn({ handleSignin }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const onFinish = (valueForms) => {
    handleSignin(valueForms);
  };
  return (
    <>
      <Form
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          hasFeedback
          name="name"
          label="Full Name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="UserName"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          hasFeedback
        >
          <Input style={{ borderRadius: "4px", cursor: "pointer" }} />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {},
          ]}
        >
          <Input.Password style={{ borderRadius: "4px", cursor: "pointer" }} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Repassword"
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
                return Promise.reject(new Error("Please Check Password"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="dob" label="Date of Birth">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input style={{ borderRadius: "4px", cursor: "pointer" }} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input style={{ borderRadius: "4px", cursor: "pointer" }} />
        </Form.Item>
        <Form.Item
          name="accept"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 20 }}
        >
          <Checkbox>Accept terms of use</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
