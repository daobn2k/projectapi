import { Col, Modal, Typography } from "antd";
import React from "react";
import "./order.css";

export default function Detail({ isOrderVisible, handleCancel, editData }) {
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
      <Col span={24} style={{ marginRight: 24 }} className="col-6"></Col>
    </Modal>
  );
}
