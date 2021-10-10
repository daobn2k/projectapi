import { notification, Space, Table, Tag, Input, Spin, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { getOrder } from "../../axios";
import { LoadingOutlined } from "@ant-design/icons";
import Detail from "./detail";
import moment from "moment";
import { DeleteOrder, SearchOrder } from "../../axios/order";
import "./order.css";
const { Search } = Input;
export default function OrderList() {
  const [loading, setLoading] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [editData, setEditData] = useState();
  const handleCancel = () => {
    setIsOrderVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "user_id",
      key: "user_id",
      render: (e) => {
        return e.name;
      },
    },
    {
      title: "Phone",
      dataIndex: "user_id",
      key: "user_id",
      render: (e) => {
        return e.phone;
      },
    },
    {
      title: "Address",
      dataIndex: "user_id",
      key: "user_id",
      render: (e) => {
        return e.address;
      },
    },
    {
      title: "Code",
      dataIndex: "order_code",
      key: "order_code",
    },
    {
      title: "Date",
      dataIndex: "order_date",
      key: "order_date",
      render: (e) => {
        return moment(e).format("DD/MM/YYYY");
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={status === "0" ? "cyan" : status === "1" ? " magenta" : "blue"}
        >
          {status === "0"
            ? "Not delivered"
            : status === "1"
            ? "Processing"
            : "delivered"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (e, index) => {
        console.log(e);
        return (
          <Space size="middle" key={index}>
            <AiOutlineEdit onClick={() => handleEdit(e)} />
            <AiFillDelete onClick={() => handleDelete(e.id)} />
          </Space>
        );
      },
    },
  ];
  const [currentData, setCurrentData] = useState([]);

  const LoadingOrder = () => {
    setLoading(true);
    getOrder()
      .then((res) => {
        setCurrentData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    LoadingOrder();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    DeleteOrder(id)
      .then((res) => {
        notification.success({
          description: "Delete Order SuccessFully !",
          placement: "topRight ",
        });
        setLoading(false);
        setTimeout(LoadingOrder(), 3000);
      })
      .catch((err) => {
        notification.warning({
          description: "Delete Order Failed !",
          placement: "topRight ",
        });
        setLoading(false);
      });
  };

  const handleEdit = (e) => {
    setEditData(e);
    setIsOrderVisible(true);
  };

  const handleSearch = (e) => {
    console.log(e);
    SearchOrder({ key: e })
      .then((res) => setCurrentData(res.data))
      .catch((err) => console.log(err));
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin indicator={antIcon} spinning={loading} delay={2}>
      <Space size={14} className="Space">
        <div className="top-table">
          <Search
            allowClear
            placeholder="Search Order By Name"
            optionFilterProp="children"
            className="input-search"
            // onSearch={handleSearch}
            enterButton
          ></Search>
          <DatePicker
            placeholder="Search By Date"
            onChange={(_, dateString) => handleSearch(dateString)}
          />
        </div>
        <Table
          columns={columns}
          dataSource={currentData}
          pagination={{ pageSize: 5 }}
        />
      </Space>
      <Detail
        isOrderVisible={isOrderVisible}
        handleCancel={handleCancel}
        editData={editData}
      />
    </Spin>
  );
}
