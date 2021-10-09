import { notification, Space, Table, Tag, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { getOrder } from "../../axios";
import { DeleteProduct, SearchProduct } from "../../axios/product";
import { useHistory } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Detail from "./detail";
import moment from "moment";

const { Search } = Input;
export default function OrderList() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const handleCancel = () => {
    setIsProfileVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "product_image",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      title: "Quantity",
      dataIndex: "product_quantity",
      key: "quantity",
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
      render: (e, index) => (
        <Space size="middle" key={index}>
          <AiOutlineEdit onClick={() => handleEdit(e.order_code)} />
          <AiFillDelete onClick={() => handleDelete(e.order_code)} />
        </Space>
      ),
    },
  ];
  const [currentData, setCurrentData] = useState([]);

  const LoadingProduct = () => {
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
    LoadingProduct();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    DeleteProduct(id)
      .then((res) => {
        notification.success({
          message: `Notification Delete`,
          description: "Delete Product SuccessFully !",
          placement: "topRight ",
        });
        setLoading(false);
        setTimeout(LoadingProduct(), 3000);
      })
      .catch((err) => {
        notification.error({
          message: `Notification Delete`,
          description: "Delete Product Failed !",
          placement: "topRight ",
        });
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    history.push({
      pathname: `/product/add`,
      search: "?" + new URLSearchParams({ product_id: id }).toString(),
    });
  };

  const handleSearch = (e) => {
    SearchProduct({ key: e })
      .then((res) => setCurrentData(res.data))
      .catch((err) => console.log(err));
  };

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
          ></Search>
        </div>
        <Table
          columns={columns}
          dataSource={currentData}
          pagination={{ pageSize: 5 }}
        />
      </Space>
      <Detail isProfileVisible={isProfileVisible} handleCancel={handleCancel} />
    </Spin>
  );
}
