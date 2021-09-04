import { Button, Input,  Form , DatePicker, notification, Image, Breadcrumb } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import {  getUserbyId } from '../../axios';
import { storage } from '../../firebase'
import {  useLocation,useHistory } from 'react-router-dom';
import { addNewAccount, UpdateAccount } from '../../axios/account';
import {HomeOutlined} from '@ant-design/icons'

import './customer.css'
import moment from 'moment'

export default function AddCustomer() {
  const [currentData, setcurrentData] = useState({
    name: '',
      dob: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      role: "user",
      image:''
  })
  const location = useLocation()
  const query = queryString.parse(location.search);
  const history = useHistory()
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  useEffect(() => {
    if (query.customer_id) {
      getUserbyId(query.customer_id)
        .then(res => { 
       
          setcurrentData(res.data)
         }) 
        .catch(err => {})
    }
  }, [query.customer_id])

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const upLoadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
      upLoadTask.on(
        "state_changed",
        snapshot => { },
        error => {
         
        },
        () => {
          storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then(url => {
              setcurrentData({...currentData,image:url})
            })
        }
      )
    }
  }

  const onFinish = () => {
    if (query.customer_id) {
      UpdateAccount(query.customer_id, currentData)
        .then(res => {
          notification.success({
            message: `Notification`,  
            description:" Update Info SuccessFully",
            placement:'topRight',
          });
        }).catch(err=>{
          notification.error({
            message: `Notification`,  
            description:" Error Can't Update Data",
            placement:'topRight',
          });
        })
    } else {
      addNewAccount(currentData)
        .then(res => {
          if(res){
            history.push({
              pathname:'/customer/list'
            })
          }
      }).catch(err=>{
        notification.error({
          message: `Notification`,  
          description:" Accout Or Email Is Currently Inactive",
          placement:'topRight',
        });
      })
        
       
    }
  }
  return (
    <div>
    <Breadcrumb separator=">" style={{paddingBottom:20,paddingLeft:40}}>
    <Breadcrumb.Item href="">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item>Customer</Breadcrumb.Item>
    <Breadcrumb.Item>{query.customer_id ? 'Edit Customer': 'Add Customer'}</Breadcrumb.Item>
  </Breadcrumb>
    <div  className ="FormAddCustomer"style={{display:"flex"}}>
      <Form
      style={{
        width:'50%',
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",}}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        fields={[
          {
            name: ["name"],
            value: currentData ? currentData.name : '',
          },
          {
            name: ["username"],
            value: currentData ? currentData.username : '',
          },
          {
            name: ["datepicker"],
            value: currentData ? moment(currentData.dob) : '',
          },
          {
            name: ["email"],
            value: currentData ? currentData.email : '',
          },
          {
            name: ["phone"],
            value: currentData ? currentData.phone : '',
          },
          {
            name: ["image"],
            value: currentData ? currentData.image : '',
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
          label="Full Name"
          onChange = {(e)=> setcurrentData({...currentData,name:e.target.value})}
          >
        
          <Input/>
        </Form.Item>
  
        <Form.Item 
          name='username'
         label="UserName" 
         onChange = {(e)=> setcurrentData({...currentData,username:e.target.value})}
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
        onChange = {(e)=> setcurrentData({...currentData,password:e.target.value})}

        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          }
         
        ]}
        >
          <Input.Password style={{ borderRadius: '4px', cursor: 'pointer' }}/>
        </Form.Item>
       
        <Form.Item name="datepicker" label="Date of Birth" format="YYYY-MM-DD">
          
        <DatePicker onChange={(date,dateString)=> setcurrentData({...currentData,dob:dateString})} />
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
        ]} 
        onChange = {(e)=> setcurrentData({...currentData,email:e.target.value})}
        
        >
        <Input style={{ borderRadius: '4px', cursor: 'pointer' }} />
        </Form.Item>
        <Form.Item   
         name="phone"
         label="Phone"
         rules={[{ required: true, message: 'Please input your phone number!' }]}
        onChange = {(e)=> setcurrentData({...currentData,phone:e.target.value})}

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
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px', borderRadius: '4px', fontSize: '16px' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {
    currentData.image?
    ( <Image 
      style={
        {
          width:'100%',
          height:'300px'
        }
      }
      src={currentData.image}/>):null
      }
    </div>
    </div>
  )
}
