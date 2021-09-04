import React from 'react'
import './SignPage.css'
import { Row, Col, Form, Input, Button, notification, DatePicker, Modal } from 'antd'
import { addNewAccount } from '../../axios/account'
import { storage } from '../../firebase'
import { useHistory } from 'react-router'
export default function SignPage() {
  const history = useHistory();
  let datepicker = '';
  let imageUrl = '';
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };


  const handleChange = (e) => {
    if (e.target.files[0]) {
      const upLoadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
      upLoadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then(url => {
              imageUrl = url
            })
        }
      )
    }
  }

  const onFinish = (values) => {

    const data = {
      name: values.name,
      dob: datepicker,
      email: values.email,
      phone: values.phone,
      username: values.username,
      password: values.password,
      role: "user",
      image: imageUrl
    }
    addNewAccount(data)
      .then(res => {
          Modal.success({
            content: 'New Account Created Successfully',
            onOk(){
              history.push({
                pathname:'/auth/login'
              })
            },
          });
      }).catch(err => {
        notification.error({
          message: `Notification`,
          description: " Accout Or Email Is Currently Inactive",
          placement: 'topRight',
          duration:2
        });
      })
  }

  return (
    <Row
      className="Container"
    >
      <Col
        className="CardSignIn"
        span={12}
      > 
    
        <h1 className="CardTitle">Sign Up</h1>
  
        <Form

          name="nest-messages"
          onFinish={onFinish}
          {...layout}

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
            label="Full Name" >
            <Input />
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
            <Input  style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </Form.Item>

          <Form.Item
            name='password'
            hasFeedback
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The current password is the same as the new password!'));
                },
              }),
            ]}
          >
            <Input.Password style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="datepicker" label="Date of Birth" format="YYYY-MM-DD">

            <DatePicker onChange={(date, dateString) => datepicker = dateString} />
          </Form.Item>
          <Form.Item name="email"
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
            ]} >
            <Input style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="TelePhone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Avatar"
            valuePropName="image"
          >
            <input name="upload" type="file" onChange={handleChange}></input>

          </Form.Item>
          <Form.Item
            style={{display: "flex",
              justifyContent: "center"}}
          >
              
            <Button type="primary" htmlType="submit" className="ButtonSign" >
              Submit
            </Button>
          </Form.Item>

        </Form>


      </Col>
    </Row>
  )
}
