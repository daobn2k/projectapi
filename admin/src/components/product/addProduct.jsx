import { Button, Input, InputNumber,Form, Select, Upload } from 'antd';
import {
  UploadOutlined
}
from '@ant-design/icons';

import  './product.css'
import React, { useEffect, useState } from 'react'
import { getCategory } from '../../axios';
import { addNewProduct } from '../../axios/product';
import { storage} from '../../firebase'


export default function AddProduct() {
  const [category, setCategory] = useState()
  const [url,setUrl] = useState()
  const [image,setImage] = useState()
  const layout = {
    labelCol: { span:8},
    wrapperCol: { span: 8 },
  };
      
  useEffect(() => {
    getCategory()
    .then(res=> setCategory(res.data.data))
    .catch(err=>console.log(err))
  }, [])
 
   
    // const normFile = (e) => {
    //   if(e.file){
    //   const upLoadTask = storage.ref(`images/${e.file.name}`).put(e.file);
    //     upLoadTask.on(
    //       "state_changed",
    //       snapshot => {},
    //       error =>{
    //         console.log(error);
    //       },
    //       () =>{
    //         storage
    //         .ref("images")
    //         .child(e.file.name)
    //         .getDownloadURL()
    //         .then(url =>{
    //           setUrl(url)
    //         })
    //       }
    //     )
    //   }
    // };
    const handleChange = (e) =>{
      console.log(e.target.files[0])
        if(e.target.files[0]){
          const upLoadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
          upLoadTask.on(
            "state_changed",
            snapshot => {},
            error =>{
              console.log(error);
            },
            () =>{
              storage
              .ref("images")
              .child(e.target.files[0].name)
              .getDownloadURL()
              .then(url =>{
               setUrl(url)
              })
            }
          )
        }
    }

    const onFinish = (values) =>{
      const data = {
        product_name:values.product.name,
        category_id:1,
        product_quantity:values.product.quantity,
        product_price:values.product.price,
        product_description:values.product.description,
        product_image:url,
        product_hot:1
      }
      addNewProduct(data)
      .then(res=>{console.log(res)})
      .catch(error=>{console.log(error.response.data)})
    }
    console.log(url)

    return (
        <>
    <Form {...layout} name="nest-messages" onFinish={onFinish} >
    <Form.Item name={['product', 'name']} label="Name" >
        <Input  style={{height:'40px',borderRadius:'4px',fontSize:14,lineHeight:22,cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item name={['product', 'category']} label="Category" >
         <Select 
         style={{height:'40px',borderRadius:'4px',fontSize:14,lineHeight:22,cursor:'pointer'}}
         options={category && category.map((o) => {
          return { id: o.id, value: o.id, label: o.name };
        })}
         >
          </Select>
      </Form.Item>
      <Form.Item name={['product', 'quantity']} label="Quantity" >
        <InputNumber  style={{borderRadius:'4px',cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item name={['product', 'price']} label="Price">
        <Input  style={{height:'40px',borderRadius:'4px',fontSize:14,lineHeight:22,cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item name={['product', 'description']} label="Description">
        <Input.TextArea  style={{borderRadius:'4px',fontSize:14,cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item
       name="image"
       label="Image"
       valuePropName="image"
      >
        <input name="upload" type="file" onChange={handleChange}></input>
        
      </Form.Item>
    
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" style={{width:'100%',height:'40px',borderRadius:'4px',fontSize:'16px'}}>
          Submit
        </Button>
      </Form.Item>
     
    </Form>
   
        </>
    )
}
