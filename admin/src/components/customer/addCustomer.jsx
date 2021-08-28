import { Button, Input, InputNumber,Form, Select, Upload } from 'antd';
import {
  UploadOutlined
}
from '@ant-design/icons';

import React from 'react'



export default function AddCustomer() {
  const layout = {
    labelCol: { span:8},
    wrapperCol: { span: 8 },
  };
  
 
    const onFinish = (values) =>{
      console.log(values);
    }

    const normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    
    return (
        <>
    <Form {...layout} name="nest-messages" onFinish={onFinish} >
    <Form.Item name={['product', 'name']} label="Name" >
        <Input  style={{height:'40px',borderRadius:'4px',fontSize:14,lineHeight:22,cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item name={['product', 'category']} label="Category" >
         <Select style={{height:'40px',borderRadius:'4px',fontSize:14,lineHeight:22,cursor:'pointer'}}>
            <Select.Option value="demo" >Demo</Select.Option>
          </Select>
      </Form.Item>
      <Form.Item name={['product', 'age']} label="Quantity" >
        <InputNumber  style={{borderRadius:'4px',cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item name={['product', 'website']} label="Price">
        <Input  style={{height:'40px',borderRadius:'4px',fontSize:14,lineHeight:22,cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item name={['product', 'introduction']} label="Description">
        <Input.TextArea  style={{borderRadius:'4px',fontSize:14,cursor:'pointer'}}/>
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
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
