import { Button, Input, InputNumber, Form, Select } from 'antd';
import queryString from 'query-string';
import './product.css'
import React, { useEffect, useState } from 'react'
import { getCategory, getProductbyId } from '../../axios';
import { addNewProduct, UpdateNewProduct } from '../../axios/product';
import { storage } from '../../firebase'
import { useLocation } from 'react-router-dom';


export default function AddProduct() {
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
  }, [query.product_id])
  const data = [
    { id: 0, name: 'Normal' },
    { id: 1, name: 'Favorite' },
    { id: 2, name: 'Hot' }
  ]
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
              // setUrl(url)
              imageUrl = url
            })
        }
      )
    }
  }

  const onFinish = (values) => {

    const data = {
      product_name: values.name,
      category_id: values.category,
      product_quantity: values.quantity,
      product_price: values.price,
      product_description: values.description,
      product_image: imageUrl,
      product_hot: values.hot
      
    }
    console.log(data);  
    if (query.product_id) {
      UpdateNewProduct(query.product_id, data)
        .then(res => {
          console.log(res)
        })
    } else {
      addNewProduct(data)
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
            value: currentData ? currentData.product_name : '',
          },
          {
            name: ["category"],
            value: currentData ? currentData.category_id : '',
          },
          {
            name: ["quantity"],
            value: currentData ? currentData.product_quantity : '',
          },
          {
            name: ["price"],
            value: currentData ? currentData.product_price : '',
          },
          {
            name: ["description"],
            value: currentData ? currentData.product_description : '',
          },
          {
            name: ["hot"],
            value: currentData ? currentData.product_hot : '',
         
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
        <Form.Item name='category' label="Category" >
          <Select
            style={{ height: '40px', borderRadius: '4px', fontSize: 14, lineHeight: 22, cursor: 'pointer' }}
            options={category && category.map((o) => {
              return { id: o.id, value: o.id, label: o.name };
            })}
          >
          </Select>
        </Form.Item>
        <Form.Item name='quantity' label="Quantity" >
          <InputNumber style={{ borderRadius: '4px', cursor: 'pointer' }} />
        </Form.Item>
        <Form.Item name='price' 
         rules={[
          {
            required: true,
            message: 'Please input your price!',
          },
        ]}
        hasFeedback
        label="Price"
        >
          <Input style={{ height: '40px', borderRadius: '4px', fontSize: 14, lineHeight: 22, cursor: 'pointer' }} />
        </Form.Item>
        <Form.Item 
          name='description'
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input your description!',
            },
          ]}
          hasFeedback
         >
          <Input.TextArea style={{ borderRadius: '4px', fontSize: 14, cursor: 'pointer' }} />
        </Form.Item>
        <Form.Item name='hot' label="Favorite" >
          <Select
            style={{ height: '40px', borderRadius: '4px', fontSize: 14, lineHeight: 22, cursor: 'pointer' }}
            options={data.map((o) => {
              return { id: o.id, value: o.id, label: o.name };
            })}
          >
          </Select>
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
