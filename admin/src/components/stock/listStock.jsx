import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DeleteProduct, SearchProduct } from "../../axios/product";
import { getStock } from "../../axios";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { Space, Spin, Input, Button, notification, Tag, Table } from "antd";

import { useHistory } from "react-router";
import "./stock.css";
const { Search } = Input;

export default function Stock() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const columns = [
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
      // render: (e) => (
      //   <a
      //     style={{ color: "#404040" }}
      //     key={e.id}
      //     href={`/product/detail?${e.id}`}
      //   >
      //     {" "}
      //     {e.name}
      //   </a>
      // ),
    },
    {
      title: "Price Import",
      dataIndex: "stock_purchaseprice",
      key: "stock_purchaseprice",
    },
    {
      title: "Quantity Import",
      dataIndex: "stock_quantity",
      key: "quantity",
    },
    {
      title: "Date Import",
      dataIndex: "stock_date",
      key: "stock_date",
    },
    {
      title: "Status",
      key: "product_hot",
      dataIndex: "product_hot",
      render: (product_hot) => (
        <Tag
          color={
            product_hot === 0 ? "cyan" : product_hot === 1 ? " magenta" : "blue"
          }
        >
          {product_hot === 0
            ? "Normal"
            : product_hot === 1
            ? " Normal"
            : "Normal"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (e) => (
        <Space size="middle">
          <AiOutlineEdit key={e.id} onClick={() => handleEdit(e.id)} />
          <AiFillDelete key={e.id} onClick={() => handleDelete(e.id)} />
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
    DeleteProduct(id)
      .then((res) => {
        notification.success({
          message: `Notification Delete`,
          description: "Delete Product SuccessFully !",
          placement: "topRight ",
        });
        setLoading(false);
        // setTimeout(LoadingProduct(), 3000);
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

  console.log(currentData);
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
        <Table columns={columns} dataSource={currentData} />
      </Space>
    </Spin>
  );
}
