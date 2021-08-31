import { Button, Input, InputNumber, Form, Select, DatePicker } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import { getCategory, getProductbyId } from '../../axios';
import { addNewProduct, UpdateNewProduct } from '../../axios/product';
import { storage } from '../../firebase'
import { useLocation } from 'react-router-dom';


export default function AddCustomer() {
  const [category, setCategory] = useState()
  const [currentData, setcurrentData] = useState({})
  const location = useLocation()
  const query = queryString.parse(location.search);
  let imageUrl = '';
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  useEffect(() => {
    getCategory()
      .then(res => setCategory(res.data))
      .catch(err => console.log(err))
    if (query.product_id) {
      getProductbyId(query.product_id)
        .then(res => { setcurrentData(res.data) })
        .catch(err => { console.log(err) })
    }
  }, [])
  const data = [
    { id: 0, name: 'Normal' },
    { id: 1, name: 'Favorite' },
    { id: 2, name: 'Hot' }
  ]
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
    // const data = {
    //   product_name: values.name,
    //   category_id: values.category,
    //   product_quantity: values.quantity,
    //   product_price: values.price,
    //   product_description: values.description,
    //   product_image: imageUrl,
    //   product_hot: values.hot
      
    // }
    // console.log(imageUrl);
    // if (query.product_id) {
    //   UpdateNewProduct(query.product_id, data)
    //     .then(res => {
    //       console.log(res)
    //     })
    // } else {
    //   addNewProduct(data)
    //     .then(res => { console.log(res) 
    //     })
    //     .catch(error => { console.log(error.response.data) })
    // }
  }
  return (
    <>
      {currentData ? currentData.product_name : ''}
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
            value: currentData ? currentData.product_name : '',
          },
          {
            name: ["username"],
            value: currentData ? currentData.category_id : '',
          },
          {
            name: ["password"],
            value: currentData ? currentData.product_quantity : '',
          },
          {
            name: ["email"],
            value: currentData ? currentData.product_price : '',
          },
          {
            name: ["phone"],
            value: currentData ? currentData.product_description : '',
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
        <Form.Item 
        name='password'
        label="Password"
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
        <Form.Item name="date-picker" label="Date of Birth" >
        <DatePicker format="YYYY-MM-DD"/>
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
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px', borderRadius: '4px', fontSize: '16px' }}>
            Submit
          </Button>
        </Form.Item>
       
      </Form>

    </>
  )
}
