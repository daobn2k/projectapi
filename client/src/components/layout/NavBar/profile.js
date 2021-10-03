import { Avatar, Button, Col, Image, Modal, Space, Typography } from "antd";
import React, { useState } from "react";

import { EditOutlined } from "@ant-design/icons";

import "./header.css";
import DeatailProfile from "./detail";
import ChangePassword from "./passwork";

const TYPECHANGE = [
  { type: "INFO", title: "Detail Profile", image: "/image/User.png" },
  {
    type: "PASSWORD",
    title: "Change Password",
    image: "/image/LockSimple.png",
  },
  { type: "CONTACT", title: "Contact", image: "/image/Phone.png" },
];
export default function ModalProfileForm({
  userInfo,
  visibleProfile,
  onCancel,
}) {
  const [isEditDetail, setIsEditDetail] = useState(true);
  const [type, setType] = useState("INFO");

  return (
    <Modal
      width={1200}
      zIndex={10000}
      visible={visibleProfile}
      footer={null}
      closable={false}
      onCancel={onCancel}
      className="ModalProfile"
      title={
        <div className="header-model">
          <Typography.Title className="header-title">Profile</Typography.Title>
          {isEditDetail ? (
            <Button
              className="header-button"
              icon={<EditOutlined />}
              onClick={() => setIsEditDetail(false)}
            >
              Edit
            </Button>
          ) : (
            <div className="Edit-button">
              <Button
                className="header-button left"
                icon={<EditOutlined />}
                onClick={() => setIsEditDetail(true)}
              >
                Save
              </Button>
              <Button
                className="header-button"
                onClick={() => setIsEditDetail(true)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      }
    >
      <Col span={6} style={{ marginRight: 24 }} className="col-6">
        <Avatar size={88} src={userInfo ? userInfo.image : ""} />
        <Typography.Title className="title">
          {userInfo ? userInfo.name : ""}
        </Typography.Title>
        <Space size={16} direction="vertical" className="space-profile">
          {TYPECHANGE.map((e, index) => {
            return (
              <React.Fragment>
                <Button
                  className="btn_profile"
                  style={{
                    background: e.type === "INFO" ? "#036B59" : "",
                    color: e.type === "INFO" ? "#ffffff" : "",
                  }}
                  key={index}
                  onClick={() => setType(e.type)}
                >
                  <Image
                    src={e.image}
                    style={{ height: 24, width: 24 }}
                    preview={false}
                  />
                  {e.title}
                </Button>
              </React.Fragment>
            );
          })}
        </Space>
      </Col>
      <Col span={18} style={{ flex: 1 }} className="col-18">
        {type === "INFO" && (
          <DeatailProfile userInfo={userInfo} isEditDetail={isEditDetail} />
        )}
        {type === "PASSWORD" && (
          <ChangePassword userInfo={userInfo} isEditDetail={isEditDetail} />
        )}
        {/* {type === "CONTACT" && <DeatailProfile />} */}
      </Col>
    </Modal>
  );
}
