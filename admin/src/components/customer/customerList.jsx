import {
  notification,
  Space,
  Table,
  Input,
  Button,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { GetUser } from "../../axios";
import { DeleteAccount } from "../../axios/account";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { convertTimeStampUTCToLocal } from "../../shared";
const { Search } = Input;
export default function ListCustomer() {
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: "125px",
      fixed: "left",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      width: "100px",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      width: "125px",
      render: (date, re, index) => {
        return (
          <Typography key={index}>
            {convertTimeStampUTCToLocal(date)}
          </Typography>
        );
      },
    },
    // {
    //   title: "Ảnh đại diện",
    //   dataIndex: "avatar",
    //   key:'avatar',
    //   align:'center',
    //   width:'150px',
    //   render: (e) => {
    //     return <Avatar key={e} width={50} src={e} />;
    //   },
    // },
    {
      title: "Phòng ban",
      dataIndex: "department_id",
      key: "department_id",
      width: "150px",
      render: (item, re, index) => {
        return (
          <Typography key={`${index}`}>
            {item && item.name ? item.name : ""}
          </Typography>
        );
      },
    },
    {
      title: "Trình độ học vấn",
      dataIndex: "education_id",
      key: "education_id",
      width: "175px",
      render: (item, re, index) => {
        return (
          <Typography key={`${index}`}>
            {item && item.name ? item.name : ""}
          </Typography>
        );
      },
    },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      key: "email",
      width: "200px",
    },
    {
      title: "Địa chỉ cư trú",
      dataIndex: "address",
      key: "address",
      width: "250px",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "150px",
    },
    {
      title: "Chức vụ",
      dataIndex: "role_id",
      key: "role_id",
      width: "200px",
      render: (item, record, index) => {
        return (
          <Typography key={index}>
            {item && item.name ? item.name : ""}
          </Typography>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: 75,
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
  const [totalPage, setTotalPage] = useState();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    keyword: "",
  });
  const GetInfoUser = (payload) => {
    setLoading(true);
    GetUser(payload)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setData(data.data);
          setTotalPage(data.total);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
      })
      .catch((err) => {
        notification.error({
          description: "Xóa nhân viên thất bại",
          placement: "topRight",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    history.push({
      pathname: `/customer/add`,
      state: { id: id },
    });
  };

  const handleSearch = (e) => {
    setParams({
      ...params,
      keyword: e,
    });
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
  };

  return (
    <Spin indicator={antIcon} spinning={false}>
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
            total: totalPage || 0,
            pageSize: 10,
            onChange: onChangePage,
          }}
          scroll={{ x: 2000 }}
        />
      </Space>
    </Spin>
  );
}
