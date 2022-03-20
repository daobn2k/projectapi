import {notification, Space, Table, Input, Button, Spin, Typography, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { GetUser } from "../../axios";
import { DeleteAccount, SearchAccount } from "../../axios/account";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { convertTimeStampUTCToLocal, listCheckRoleUser } from "../../shared";
const { Search } = Input;
export default function ListCustomer() {
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title:"Giới tính",
      dataIndex:'sex',
      key:'sex',
      render:(item,re,index) =>{
        return(
          <Typography key={index}>{item.name || ''}</Typography>
        )
      }
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      render:(date,re,index)=>{
        return(
          <Typography key={index}>{convertTimeStampUTCToLocal(date)}</Typography>
        )
      }
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key:'avatar',
      align:'center',
      render: (e) => {
        return <Avatar key={e} width={50} src={e} />;
      },
    },
    {
      title: "Phòng ban",
      dataIndex: "department_id",
      key: "department_id",
      render:(item,re,index)=>{
        return(
          <Typography key={`${index}`}>{item.name}</Typography>
        )
      }
    },
    {
      title: "Trình độ học vấn",
      dataIndex: "education_id",
      key: "education_id",
      render:(item,re,index)=>{
        console.log("item",item)
        return(
          <Typography key={`${index}`}>{item && item.name ? item.name : ''}</Typography>
        )
      }
    },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ cư trú",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title:'Chức vụ',
      dataIndex:'role_id',
      key:'role_id',
      render:(item,record,index)=>{
        return(
          <Typography key={index} >{item && item.name ? item.name : ''}</Typography>
        )
      }
    },
    {
      title: "Thao tác",
      key: "action",
      render: (e) => (
        <Space size="middle">
          <AiOutlineEdit key={e.id} onClick={() => handleEdit(e._id)} />
          <AiFillDelete key={e.id} onClick={() => handleDelete(e._id)} />
        </Space>
      ),
    },
  ];
  const history = useHistory();
  const [data, setData] = useState();
  const [totalPage,setTotalPage] = useState()
  const [params,setParams] = useState({
    page:1,
    perPage:5,
    keyword:''
  })
  const GetInfoUser = (payload) => {
    setLoading(true);
    GetUser(payload)
      .then((res) => {
        const { data,status } = res
        if(status === 200) {
          setData(data.data);
          setTotalPage(data.total)
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
         setLoading(false);
      })
  }

  useEffect(() => {
    GetInfoUser(params);
  }, [params]);

  const handleDelete = (id) => {
    setLoading(true);
    DeleteAccount(id)
      .then((res) => {
        notification.success({
          description: "Xóa nhân viên thành công",
          placement: "topRight",
        });
        GetInfoUser();
        setLoading(false);
      })
      .catch((err) => {
        notification.error({
          description: "Xóa nhân viên thất bại",
          placement: "topRight",
        });
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    history.push({
      pathname: `/customer/add`,
    state:{id:id},
    });
  };

  const handleSearch = (e) => {
    SearchAccount({ key: e })
      .then((res) => {
        const ListCustomer = res.data.filter((e) => e.role === "user");
        setData(ListCustomer);
      })
      .catch((err) => console.log(err));
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const onChangePage = (page)  =>{
   setParams({...params,page:page})
  }

  return (
    <Spin indicator={antIcon} spinning={loading}>
      <Space className="Space" size={14}>
        <div className="top-table">
          <Search
            allowClear
            placeholder="Tìm kiếm"
            optionFilterProp="children"
            className="input-search"
            onSearch={handleSearch}
            enterButton
          ></Search>
          <Link to="/customer/add">
            <Button className="btn-add" icon={<PlusOutlined />}>
              Thêm mới nhân viên
            </Button>
          </Link>
        </div>
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          pagination={{
            total: totalPage|| 0,
            pageSize: 5,
            onChange: onChangePage,
          }}
        />
      </Space>
    </Spin>
  );
}
