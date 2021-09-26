import React from 'react'
import {Form ,Input ,Button , Typography, Space} from 'antd'
import {GooglePlusOutlined} from '@ant-design/icons'
import { FaFacebookF } from "react-icons/fa"

const { Title, Text } = Typography

export default function ModalLogin({handleLogin}) {

    const onFinish=(valuesForm) => {
        handleLogin(valuesForm)
    }
    return (
        <div>
            <Title className="TitleLogin">Welcome to Login </Title>
            <Form onFinish={onFinish}>
                <Form.Item 
                span={12}  
                name="username" 
                label="Username"

                rules={[
                    {
                        required:true,
                        message:'Please input your username'
                    }
                ]}
                hasFeedback
                >
                        <Input className="input" placeholder="Username"/>
                </Form.Item>
                <Form.Item 
                span={12} 
                name="password"
                label="Password"
                rules={[
                    {
                        required:true,
                        message:'Please input your password '
                    }
                ]}
                hasFeedback
                >
                        <Input.Password className="input"  placeholder="Username"/>
                </Form.Item>
                <Form.Item  className="item-btnModal" wrapperCol={8}>
                        <Button className="btnFormModal" type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
            <Text className="signin-with">- Or Sign In With -</Text>
            <Space size={10} className="space-btn">
                <Button className="btn-signin" style={{background:"#3C589C"}} icon={<FaFacebookF className="fbicon"/>}>FACEBOOK</Button>
                <Button className="btn-signin" style={{background:"#DF4B3B"}} icon={<GooglePlusOutlined />}>GOOGLE</Button>
            </Space>
        </div>
    )
}
