import { Image, notification, Space, Table,Button,Input, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'
import { GetCategory } from '../../axios';
import { Link, useHistory} from "react-router-dom";
import { DeleteCategory, SearchCategory } from '../../axios/category';
import { PlusOutlined ,LoadingOutlined } from "@ant-design/icons";
const {Search} = Input

export default function ListCategory() {
  const history = useHistory()
  const [currentData, setCurrentData] = useState()
  const [loading,setLoading] = useState(false)



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

  const LoadingData = () =>{
    GetCategory()
    .then( res => {
      setCurrentData(res.data)
    })
    .catch( err =>{
      console.log(err)
    })
  }
    useEffect(() => {
      LoadingData()
    }, [])  

  
   
    const handleDelete = (id) =>{
      setLoading(true)
      DeleteCategory(id)
      .then(res=>{
        if(res){
          setTimeout(
            LoadingData()
          ,3000)
          notification.success({
            message: `Notification Delete`,
            description:
              'Delete Product SuccessFully !',
            placement:'topRight ',
          });
        setLoading(false)
        }
      })
      .catch(err=>{
        setLoading(false)
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

    const handleSearch = (e) => {
      SearchCategory({key:e})
      .then(res => setCurrentData(res.data))
      .catch(err => console.log(err))
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <Spin indicator={antIcon} spinning={loading}>
        <Space size={14} className="Space">
       <div className="top-table">
        <Search
          allowClear 
          placeholder="Search to Select"
          optionFilterProp="children"
          className="input-search"
          onSearch={handleSearch}
          enterButton 
        >
        </Search>
        <Link to="/category/add">
        <Button  className="btn-add" icon={<PlusOutlined />} >
          New Category
        </Button>
        </Link>
      </div>
        <Table
          columns={columns}
          dataSource={currentData}
        />
      </Space>
      </Spin>
    )
}
