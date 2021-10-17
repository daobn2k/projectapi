import { Typography, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getOrderDetail } from "../../../api";
import { parseMoney } from "../../../comon/parseMoney";
import "./order.css";
import { LeftOutlined } from "@ant-design/icons";
export default function ListDetail({ order_code, deleteOrderCode }) {
  const [currentData, setCurrentData] = useState();
  const columns = [
    {
      title: "Name",
      dataIndex: "product",
      key: "product",
      render: (e) => {
        return e.product_name;
      },
    },
    {
      title: "Price",
      dataIndex: "product",
      key: "product",
      render: (e) => {
        return parseFloat(e.product_price).toLocaleString();
      },
    },
    {
      title: "Quantity",
      dataIndex: "order_detail_quantity",
      key: "order_detail_quantity",
    },
    {
      title: "Total",
      key: "total",
      render: (e) => {
        return parseFloat(
          e.order_detail_quantity * e.product.product_price
        ).toLocaleString();
      },
    },
  ];

  useEffect(() => {
    if (order_code) {
      loadingDataOrderDetail(order_code);
    }
  }, [order_code]);
  const loadingDataOrderDetail = (id) => {
    getOrderDetail(id).then((res) => setCurrentData(res.data));
  };

  return (
    <>
      <Typography.Text className="goback" onClick={deleteOrderCode}>
        {" "}
        <LeftOutlined style={{ marginRight: 8 }} />
        Back To Order
      </Typography.Text>
      <Table
        columns={columns}
        dataSource={currentData}
        pagination={{ pageSize: 5 }}
        footer={() => {
          const result =
            Array.isArray(currentData) && currentData.length > 0
              ? currentData
                  .map((e) => e.product.product_price * e.order_detail_quantity)
                  .reduce((previousValue, r) => previousValue + r)
              : "";

          return (
            <Typography.Title style={{ fontSize: "14px", lineHeight: "20px" }}>
              Total: {parseMoney(result)} VNĐ
            </Typography.Title>
          );
        }}
      />
    </>
  );
}
