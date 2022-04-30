import React from "react";
import "./loginPage.css";
import { Row, Col, Form, Input, Checkbox, Button, notification } from "antd";
import { Link } from "react-router-dom";
import { Login } from "../../axios/login";
import { checkInWork } from "../../axios/timesheet";
import { useHistory } from "react-router-dom";
import { store } from "../../storage";
import moment from "moment";
export default function LoginPage() {
  const history = useHistory();
  const onFinish = (values) => {
    Login(values)
      .then((res) => {
        if(res.data.message === 'SUCCESS'){
         store.setCurrentUser(res.data.data);
         return checkInWork({
            start_date_time:moment(new Date()),
            user_id:res.data.data._id
          })
        }
      })
      .then(res =>{
        if (res.data.message === "SUCCESS") {
          store.setCurrentTimeSheet(res.data.data)
          history.push({
            pathname: "/",
          });
        }
      })
      .catch((err) =>
        notification.error({
          duration: 2,
          message: `Tài khoản hoặc mật khẩu đăng nhập sai`,
          description: "Kiểm tra lại tài khoản hoặc mật khẩu",
        })
      );
  };
  return (
    <Row className="Container login">
      <Col className="Card" span={8} sm={12} xl={8}>
        <h1 className="CardTitle"> Đăng nhập</h1>
        <Form
          name="basic"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          {...layout}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên tài khoản",
              },
            ]}
          >
            <Input className="Input" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mật khẩu",
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
            <Checkbox>Ghi nhớ tài khoản </Checkbox>
          </Form.Item>

          <Form.Item className="item-button-form-login">
            <Button className="Button" type="primary" htmlType="submit">
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Link to="/auth/sign" className="Link">
              Tạo tài khoản mới ?
          </Link>
        </div>
      </Col>
    </Row>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};