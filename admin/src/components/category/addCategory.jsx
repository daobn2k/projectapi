import { Button, Input, Form, Image, Breadcrumb, notification} from 'antd';
import queryString from 'query-string';
import './product.css'
import React, { useEffect, useState } from 'react'
import { getCategorybyId } from '../../axios';
import { storage } from '../../firebase'
import { useLocation,useHistory } from 'react-router-dom';
import { addCategory, UpdateCategory } from '../../axios/category';
import {HomeOutlined} from '@ant-design/icons'

export default function AddCategory() {
  const [currentData, setcurrentData] = useState({})
  const location = useLocation()
  const history = useHistory()
  const query = queryString.parse(location.search);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12},
  };
  useEffect(() => {
  
    if (query.category_id) {
      getCategorybyId(query.category_id)
        .then(res => { setcurrentData(res.data) })
        .catch(err => { console.log(err) })
    }
  }, [query.category_id])

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
              setcurrentData({...currentData,image:url})
            })
        }
      )
    }
  }

  const onFinish = () => {
    if (query.category_id) {
      UpdateCategory(query.category_id, currentData)
        .then(res => {
          notification.success({
            message:'Category update successfully',
            placement:'topRight',
            duration:2
          })
        })
        .catch(err=>{
          notification.err({
            message:'Category update failed',
            placement:'topRight',
            duration:2
          })
        })
    } else {
      addCategory(currentData)
        .then(res => { 
          if(res) {
            notification.success({
              message:' Created category successfully',
              placement:'topRight',
              duration:2
            })
             history.push({
            pathname:'/category/list'
          })
          }
        })
        .catch(error => { 
      
          notification.error({
            message: `Notification`,  
            description:"  Created category failed",
            placement:'topRight',
          });
             })
    }
  }
  console.log(currentData)
  return (
    <div>
    <Breadcrumb separator=">" style={{paddingBottom:20,paddingLeft:20}}>
    <Breadcrumb.Item href="">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item>Category</Breadcrumb.Item>
    <Breadcrumb.Item>{query.category_id ? 'Edit Category': 'Add Category'}</Breadcrumb.Item>
  </Breadcrumb>
    <div
    className ="FormAddCategory"style={{display:"flex"}}
    >
     
      <Form
      style={{width:'50%'}}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        fields={[
          {
            name: ["name"],
            value: currentData ? currentData.name : ''
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
          label="Name"
          onChange ={(e)=>setcurrentData({...currentData,name:e.target.value})}
          >
          <Input
             
            style={{ height: '40px', borderRadius: '4px', fontSize: 14, lineHeight: 22, cursor: 'pointer' }}
          />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="image"
        >
          <input name="upload" type="file" onChange={handleChange}></input>

        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
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
      src={currentData.image}/>):''

      }        
    </div>
    </div>
  )
}
