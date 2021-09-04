import { Image, notification, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'
import { GetCategory } from '../../axios';
import { useHistory} from "react-router-dom";
import { DeleteCategory } from '../../axios/category';

export default function ListCategory() {
  const history = useHistory()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (e,item)=>
      
      <a style={{color:"#404040"}} key={item.id} href={`/category/detail?${item.id}`}> {e}</a> 
      
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render:(e,index) =>{
         return (<Image 
          preview={false}
          key={index}
          src={e}
          style={{
            width: 50,
            height: 50
          }}
          />)
      }
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
      GetCategory()
      .then( res => {
        setCurrentData(res.data)
      })
    }, [currentData])  

  
   
    const handleDelete = (id) =>{
      DeleteCategory(id)
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
          pathname:`/category/add`,
          search:'?' + new URLSearchParams({category_id:id}).toString()
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
