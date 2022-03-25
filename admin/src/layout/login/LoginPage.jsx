import React from "react";
import "./loginPage.css";
import { Row, Col, Form, Input, Checkbox, Button, notification } from "antd";
import { Link } from "react-router-dom";
import { Login } from "../../axios/login";
import { useHistory } from "react-router-dom";
import { store } from "../../storage";
export default function LoginPage() {
  const history = useHistory();
  const onFinish = (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    Login(data)
      .then((res) => {
        if (res.data.message === "SUCCESS") {
          store.setCurrentUser(res.data.data);
          history.push({
            pathname: "/",
          });
        }
      })
      .catch((err) =>
        notification.error({
          duration: 2,
          message: `Error user or password `,
          description: "Please check your password or account !",
        })
      );
  };
  return (
    <Row className="Container">
      <Col className="Card" span={8} sm={12} xl={8}>
        <h1 className="CardTitle"> Login</h1>
        <Form
          name="basic"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input className="Input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className="Input"
              style={{
                marginLeft: "5px",
                width: "99%",
              }}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className="Button" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Link to="/auth/sign" className="Link">
            Create New Account ?{" "}
          </Link>
        </div>
      </Col>
    </Row>
  );
}
