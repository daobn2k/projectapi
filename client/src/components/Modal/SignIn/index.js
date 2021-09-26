import React from 'react'
import {Form , Input , Button, DatePicker} from 'antd'
export default function ModalSignIn({handleSignin}) {
    const layout = {
        labelCol: { span: 6},
        wrapperCol: { span: 18 },
      };
      const onFinish = (valueForms) => {
        handleSignin(valueForms)
        }
    return (
        <Form
        style={{
          width:'100%',
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",}}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item 
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
            hasFeedback
            name="name"
            label="Full Name"
            >
            <Input/>
          </Form.Item>
    
          <Form.Item 
            name='username'
           label="UserName" 
           rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
            hasFeedback>
          <Input style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </Form.Item>
       
          <Form.Item 
          name='password'
          hasFeedback
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            }
          ]}
          >
            <Input.Password style={{ borderRadius: '4px', cursor: 'pointer' }}/>
          </Form.Item>
          <Form.Item name="dob" label="Date of Birth" format="YYYY-MM-DD">
          <DatePicker />
          </Form.Item>
          <Form.Item 
        name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]} 
          >
          <Input style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </Form.Item>
          <Form.Item   
           name="phone"
           label="Phone"
           rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
          <Input style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Avatar"
            valuePropName="image"
          >
            <input name="upload" type="file" ></input>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px', borderRadius: '4px', fontSize: '16px' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
    )
}
