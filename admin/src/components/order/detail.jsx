import { Col, Modal, Typography, Table, Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { getOrderDetail } from "../../axios";
import { UpdateNewOrder } from "../../axios/order";
import moment from "moment";
import "./order.css";

export default function Detail({ isOrderVisible, handleCancel, editData }) {
  const [currentData, setCurrentData] = useState();
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

  const result =
    Array.isArray(currentData) &&
    currentData
      .map((e) => e.product.product_price * e.order_detail_quantity)
      .reduce((previousValue, r) => previousValue + r);
  const parseMoney = (number) => parseFloat(number).toLocaleString();

  const handleChange = async () => {
    const data = {
      order_code: editData.order_code,
      order_user_id: editData.order_user_id,
      order_date: moment(editData.order_date).format("YYYY/MM/DD"),
      status: "1",
    };

    console.log(editData);
    const result = await UpdateNewOrder(editData.id, data);

    if (result.status === 200) {
      handleCancel();
      notification.success("sucess");
    } else {
      notification.error("failed ");
    }
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
          footer={() => {
            return (
              <div className="footer-detail">
                <Button
                  type="primary"
                  className="btn-change"
                  onClick={handleChange}
                >
                  Save
                </Button>
                <Typography.Title style={{ fontSize: "18px" }}>
                  Total: {`${parseMoney(result)} VNĐ`}
                </Typography.Title>
              </div>
            );
          }}
        />
      </Col>
    </Modal>
  );
}
