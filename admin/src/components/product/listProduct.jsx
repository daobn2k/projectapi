import { Image, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'
import { GetProduct } from '../../axios';


  const columns = [
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category_id',
      key: 'category_id',
      render:(e) =>
        e
    },
    {
      title: 'Image',
      dataIndex: 'product_image',
      key: 'image',
      render:(e) =>{
        console.log(e)
         return (<Image 
          src={e}
          />)
      }
    },
    {
      title: 'Description',
      dataIndex: 'product_description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'product_quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
        <AiOutlineEdit />
         <AiFillDelete />

        </Space>
      ),
    },
  ];
export default function ListProduct() {
    const [currentData, setCurrentData] = useState()

    useEffect(() => {
      GetProduct()
      .then( res => {
        setCurrentData(res.data)
      }).catch(err =>{
        console.log(err)
      })
    }, [])  
    return (
        <>
      
        <Table
          columns={columns}
          dataSource={currentData}
        />
      </>
    )
}
