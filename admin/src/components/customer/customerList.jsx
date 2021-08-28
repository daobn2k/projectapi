import { Image, Space, Table } from 'antd'
import React from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'

const data = [
    {
      key: '1',
      name: 'John Brown',
      category: 32,
      description: 'New York No. 1 Lake Park',
      price:3000
    },
    {
      key: '2',
      name: 'Jim Green',
      category: 42,
      description: 'London No. 1 Lake Park',
      price:3000
    },
    {
      key: '3',
      name: 'Joe Black',
      category: 32,
      description: 'Sidney No. 1 Lake Park',
      price:3000
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      renden:() =>{

      }
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render:() =>{
          <Image 
          src=""
          />
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
        <AiOutlineEdit />
         <AiFillDelete />

        </Space>
      ),
    },
  ];
export default function ListCustomer() {
    return (
        <div>
      
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    )
}
