import { Button, Input, Form} from 'antd';
import queryString from 'query-string';
import './product.css'
import React, { useEffect, useState } from 'react'
import { getCategorybyId } from '../../axios';
import { storage } from '../../firebase'
import { useLocation } from 'react-router-dom';
import { addCategory, UpdateCategory } from '../../axios/category';


export default function AddCategory() {
  const [currentData, setcurrentData] = useState({})
  const location = useLocation()
  const query = queryString.parse(location.search);
  let imageUrl = '';
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  useEffect(() => {
  
    if (query.category_id) {
      getCategorybyId(query.category_id)
        .then(res => { setcurrentData(res.data) })
        .catch(err => { console.log(err) })
    }
  }, [])

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

    const data = {
     name: values.name,
      image: imageUrl

    }
    console.log(data)
    if (query.category_id) {
      UpdateCategory(query.category_id, data)
        .then(res => {
          console.log(res)
        })
    } else {
      addCategory(data)
        .then(res => { console.log(res) 
        })
        .catch(error => { console.log(error.response.data) })
    }
  }
  console.log(currentData)
  return (
    <>
      <Form
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
          label="Name" >
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

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px', borderRadius: '4px', fontSize: '16px' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
         
      </>
  )
}
