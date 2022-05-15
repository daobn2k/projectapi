import { Button, Modal, Typography } from "antd";
import React from "react";
import "./header.css";
const { Text } = Typography;

export default function LogOut({ isModalVisible, handleOk, handleCancel }) {
  return (
    <Modal
      width={394}
      zIndex={700}
      visible={isModalVisible}
      footer={null}
      closable={false}
      className="Modal"
    >
      <div className="" style={{display:'flex',alignItems:'center',justifyContent: 'center'}}>
        <Text className="TextModal">
          Bạn có muốn đăng xuất ra ?
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: 15,
          padding: "0 10px",
        }}
      >
        <Button
          className="ButtonModal"
          type="ghost"
          style={{
            marginRight: 15,
            color: "#21C0F6",
            border: "1.5px solid #21C0F6",
          }}
          onClick={handleCancel}
        >
          Hủy bỏ
        </Button>
        <Button className="ButtonModal" type="primary" onClick={handleOk}>
          Đồng ý
        </Button>
      </div>
    </Modal>
  );
}
