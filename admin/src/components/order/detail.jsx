import { Col, Modal, Typography, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getOrderDetail } from "../../axios";
import "./order.css";

export default function Detail({ isOrderVisible, handleCancel, editData }) {
  let i = 1;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: () => {
        return i++;
      },
    },
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

  const [currentData, setCurrentData] = useState();
  useEffect(() => {
    if (editData) {
      loadingDataOrderDetail(editData.order_code);
    }
  }, [editData]);
  const loadingDataOrderDetail = (id) => {
    getOrderDetail(id).then((res) => setCurrentData(res.data));
  };
  const onCancel = () => {
    handleCancel();
  };
  return (
    <Modal
      width={768}
      zIndex={700}
      visible={isOrderVisible}
      closable={false}
      footer={false}
      onCancel={onCancel}
      className="ModalOrder"
      title={
        <div className="header-model">
          <Typography.Title className="order-title">
            Order Detail User
          </Typography.Title>
        </div>
      }
    >
      <Col span={24} style={{ marginRight: 24 }} className="col-6">
        <Table
          columns={columns}
          dataSource={currentData}
          pagination={{ pageSize: 5 }}
        />
      </Col>
    </Modal>
  );
}
