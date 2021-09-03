import { Button, Input,  Form , DatePicker } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import {  getUserbyId } from '../../axios';
import { storage } from '../../firebase'
import { useLocation } from 'react-router-dom';
import { addNewAccount } from '../../axios/account';


export default function AddCustomer() {
  let datepicker = ''
  const [currentData, setcurrentData] = useState([{}])
  const location = useLocation()
  const query = queryString.parse(location.search);
  let imageUrl = '';
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  useEffect(() => {
    if (query.account_id) {
      getUserbyId(query.account_id)
        .then(res => { 
       
          setcurrentData(res.data)
         }) 
        .catch(err => { console.log(err) })
    }
  }, [query.account_id])

  const handleChange = (e) => {
    console.log(e.target.files[0])
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
              // setUrl(url)
              imageUrl = url
            })
        }
      )
    }
  }

  const onFinish = (values) => {
    console.log(values)
    const data = {
      name: values.name,
      dob: datepicker,
      email: values.email,
      phone: values.phone,
      username: values.username,
      password: values.password,
      role: "membership",
      image:imageUrl
    }
    // if (query.product_id) {
    //   UpdateNewProduct(query.product_id, data)
    //     .then(res => {
    //       console.log(res)
    //     })
    // } else {
      addNewAccount(data)
        .then(res => { console.log(res) 
        })
        .catch(error => { console.log(error.response.data) })
    // }
  }
    console.log(currentData)
  return (
    <>
      <Form
      style={{height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",}}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        fields={[
          {
            name: ["name"],
            value: currentData ? currentData[0].name : '',
          },
          {
            name: ["username"],
            value: currentData ? currentData[0].username : '',
          },
          {
            name: ["dob"],
            value: currentData ? currentData[0].dob : '',
          },
          {
            name: ["email"],
            value: currentData ? currentData[0].email : '',
          },
          {
            name: ["phone"],
            value: currentData ? currentData[0].phone : '',
          },
          {
            name: ["image"],
            value: currentData ? currentData[0].image : '',
          },
       
        ]}
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
       {query.account_id ? (<Form.Item 
        name='Currentpassword'
        label="CurrentPassword"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        initialValue=''
        hasFeedback
        >
          <Input.Password style={{ borderRadius: '4px', cursor: 'pointer' }}/>
        </Form.Item>):''} 
        <Form.Item 
        name='password'
        dependencies={['CurrentPassword']}
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
          <Input.Password style={{ borderRadius: '4px', cursor: 'pointer' }}/>
        </Form.Item>
        <Form.Item
        name="confirm"
        label="Confirm Password"
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
          
        <DatePicker onChange={(date,dateString)=> datepicker = dateString} />
        </Form.Item>
        <Form.Item   name="email"
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
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px', borderRadius: '4px', fontSize: '16px' }}>
            Submit
          </Button>
        </Form.Item>
       
      </Form>

    </>
  )
}
