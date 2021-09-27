import { Image, notification, Space, Table ,Input ,Button, Spin} from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'
import { Link, useHistory } from 'react-router-dom';
import { GetUser } from '../../axios';
import { DeleteAccount, SearchAccount } from '../../axios/account';
import { PlusOutlined ,LoadingOutlined} from "@ant-design/icons";

const {Search} = Input
export default function ListCustomer() {
  const [loading,setLoading] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'BirthDay',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Avatar',
      dataIndex: 'image',
      render:(e,index) =>{
        return (<Image 
          key={index}
          width={50}
          src={e}
          />)
      }
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (e) => (
        <Space size="middle">
        <AiOutlineEdit key={e.id} onClick={()=>handleEdit(e.id)}/>
         <AiFillDelete key={e.id} onClick={()=>handleDelete(e.id)}/>

        </Space>
      ),
    },
  ];
    const history = useHistory()
    const [data, setData] = useState()
    const GetInfoUser =  useCallback(
      () => {
        GetUser()
        .then(res =>
          {
            const ListUserData = res.data.filter( (e) => e.role === 'user')
            setData(ListUserData)
          }
        ).catch(err=>{
            console.log(err)
        })
      },
      [],
    )

    useEffect(() => {
      GetInfoUser()
    }, [GetInfoUser])

    const handleDelete = (id) =>{
      setLoading(true)
      DeleteAccount(id)
      .then(res=>{
        GetInfoUser()
        notification.success({
          message: `Notification Delete`,
          description:
            'Delete Product SuccessFully !',
          placement:'topRight ',
        });
        setLoading(false)
      })
      .catch(err=>{
        notification.error({
          message: `Notification Delete`,
          description:
            'Delete Product Failed !',
          placement:'topRight ',
        });
        setLoading(false)

      })
    }
  
    const handleEdit = (id) =>{
      history.push({
          pathname:`/customer/add`,
          search:'?' + new URLSearchParams({customer_id:id}).toString()
      })
    }

    const handleSearch = (e) => {
      SearchAccount({key:e})
      .then(res =>{
        const ListCustomer = res.data.filter( e => e.role === "user")
        console.log(ListCustomer)
        setData(ListCustomer)
      } )
      .catch(err => console.log(err))
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
      <Spin indicator={antIcon} spinning={loading}>
        <Space className="Space" size={14}>
       <div className="top-table">
        <Search
          allowClear 
          placeholder="Search to name"
          optionFilterProp="children"
          className="input-search"
          onSearch={handleSearch}
          enterButton 
        >
        </Search>
        <Link to="/customer/add">

        <Button  className="btn-add" icon={<PlusOutlined />} >
          New Account Customer
        </Button>
        </Link>
      </div>
        <Table
          columns={columns}
          dataSource={data}
        />
      </Space>
      </Spin>
    )
}
