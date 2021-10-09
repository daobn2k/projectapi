import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getStock } from "../../axios";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { Space, Spin, Input, Button, notification, Tag, Table } from "antd";

import { useHistory } from "react-router";
import "./stock.css";
import { DeleteStock, SearchStock } from "../../axios/stock";
const { Search } = Input;

export default function Stock() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Employee Create",
      dataIndex: "employee",
      align: "center",
      render: (e) => {
        return e.name;
      },
    },
    {
      title: "Title Import",
      dataIndex: "stock_product",
      render: (e, item) => (
        <a
          style={{ color: "#404040" }}
          key={item.id}
          href={`/product/detail?${item.id}`}
        >
          {" "}
          {e}
        </a>
      ),
    },
    {
      title: "Category Import",
      dataIndex: "stock_category_id",
      key: "stock_category_id",
    },
    {
      title: "Price Import",
      dataIndex: "stock_purchaseprice",
      key: "stock_purchaseprice",
    },
    {
      title: "Quantity Import",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
    },
    {
      title: "Date Import",
      dataIndex: "stock_date",
      key: "stock_date",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === 0 ? "cyan" : status === 1 ? " magenta" : "blue"}>
          {status === 0 ? "Active" : status === 1 ? " InActive" : "Inventory"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (e) => (
        <Space size="middle">
          <AiOutlineEdit
            key={e.stock_id}
            onClick={() => handleEdit(e.stock_id)}
          />
          <AiFillDelete
            key={e.stock_id}
            onClick={() => handleDelete(e.stock_id)}
          />
        </Space>
      ),
    },
  ];
  const [currentData, setCurrentData] = useState([]);

  const LoadingStock = () => {
    getStock()
      .then((res) => {
        setCurrentData(res.data);
      })
      .catch();
  };
  useEffect(() => {
    LoadingStock();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    DeleteStock(id)
      .then((res) => {
        notification.success({
          message: `Notification Delete`,
          description: "Delete Product SuccessFully !",
          placement: "topRight ",
        });
        setTimeout(LoadingStock(), 3000);
        setLoading(false);
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
    history.push(`/storage/edit/${id}`);
  };

  const handleSearch = (e) => {
    SearchStock({ key: e })
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
          <Link to="/storage/add">
            <Button className="btn-add" icon={<PlusOutlined />}>
              New Import
            </Button>
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={currentData}
          pagination={{ pageSize: 5 }}
        />
      </Space>
    </Spin>
  );
}
