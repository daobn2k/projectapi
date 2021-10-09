import {
    Col,
    Modal,
    Typography,
  } from "antd";
  import React from "react";
//   import { LocalStorage } from "../../storage";
  export default function Detail({ isProfileVisible,handleCancel }) {
 

    const onCancel = () => {
        handleCancel()
    };
    return (
      <Modal
        width={1265}
        zIndex={700}
        visible={isProfileVisible}
        closable={false}
        onCancel={onCancel}
        className="ModalProfile"
        title={
          <div className="header-model">
            <Typography.Title className="header-title">History Order Detail User</Typography.Title>
          </div>
        }
      >
        <Col span={24} style={{ marginRight: 24 }} className="col-6">

        </Col>
      </Modal>
    );
  }
  