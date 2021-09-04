import React from 'react'
import './loginPage.css'
import { Row, Col, Form, Input, Checkbox, Button } from 'antd'
import {Link} from "react-router-dom";
import { Login } from '../../axios/login';
export default function LoginPage() {

    const onFinish = (values) => {
        const data = {
            username:values.username,
            password:values.password
        }
        console.log(data)
        Login(data)
        .then(res=>{
            console.log(res)
        }).catch(err=>
            console.log(err)
        )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Row
            className="Container"

        >
            <Col
                className="Card"
                span={8}
                sm={12}
                xl={8}
            >
                <h1 className="CardTitle">Login</h1>
                <p className="CardText">Sign in by entering the information below</p>

                <Form
                    name="basic"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
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
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password className="Input" style={{
                            marginLeft: "5px",
                            width: "99%"
                        }} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"

                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button className="Button" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{textAlign:'center'}}>
                <Link to="/auth/sign"className="Link" >Create New Account ? </Link>
                </div>
            </Col>
        </Row>
    )
}
