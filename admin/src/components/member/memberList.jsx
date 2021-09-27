import { Button, Image, notification, Space, Table ,Input} from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'
import { Link, useHistory } from 'react-router-dom';
import { GetUser } from '../../axios';
import { DeleteAccount, SearchAccount } from '../../axios/account';
import {PlusOutlined} from '@ant-design/icons'


const {Search} = Input
export default function ListMember() {

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
          style={{borderRadius:0,height:'50px',objectFit:'cover'}}
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
            const ListUserData = res.data.filter( (e) => e.role === 'membership')
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
      DeleteAccount(id)
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
          pathname:`/customer/add`,
          search:'?' + new URLSearchParams({customer_id:id}).toString()
      })
    }


    const handleSearch = (e) => {
      SearchAccount({key:e})
      .then(res =>{
        const ListCustomer = res.data.filter( e => e.role === "membership")
        console.log(ListCustomer)
        setData(ListCustomer)
      } )
      .catch(err => console.log(err))
    }


    return (
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
        <Link to="/member/add">
        <Button  className="btn-add" icon={<PlusOutlined />} >
          New Account Membership
        </Button>
        </Link>
      </div>
        <Table
          columns={columns}
          dataSource={data}
        />
      </Space>
    )
}
