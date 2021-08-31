import { Image, notification, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'
import { GetProduct } from '../../axios';
import { DeleteProduct } from '../../axios/product';
import { useHistory} from "react-router-dom";
import queryString from 'query-string';     

export default function ListProduct() {
  const history = useHistory()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category.id',
      render:(e) =>
        e.name
    },
    {
      title: 'Image',
      dataIndex: 'product_image',
      render:(e) =>{
         return (<Image 
          key={e.id}
          width={100}
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
      title: 'Favorite',
      dataIndex: 'product_hot',
      key: 'product_hot',
    },
    {
      title: 'Action',
      key: 'action',
      render: (e) => (
        <Space size="middle">
        <AiOutlineEdit key={e.id} onClick={()=>handleEdit(e.id)}/>
        <AiFillDelete key={e.id}  onClick={()=>handleDelete(e.id)}/>
        </Space>
      ),
    },
  ];
    const [currentData, setCurrentData] = useState()

    useEffect(() => {
      GetProduct()
      .then( res => {
        setCurrentData(res.data)
      }).catch(err =>{
        console.log(err)
      })

    }, [currentData])  

  
   
    const handleDelete = (id) =>{
      DeleteProduct(id)
      .then(res=>{
        notification.success({
          message: `Notification Delete`,
          description:
            'Delete Product SuccessFully !',
          placement:'topRight ',
        });
      })
      .catch(err=>{
        notification.error({
          message: `Notification Delete`,
          description:
            'Delete Product Failed !',
          placement:'topRight ',
        });
      })
    }

    const handleEdit = (id) =>{
      history.push({
          pathname:`/product/add`,
          search:'?' + new URLSearchParams({product_id:id}).toString()
      })
    }
    return (
        <>
      
        <Table
          columns={columns}
          dataSource={currentData}
        />
      </>
    )
}
