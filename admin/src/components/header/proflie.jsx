import { Avatar, Button, Col, Image, Modal, Space, Typography } from "antd";
import React, { useState } from "react";
import { LocalStorage } from "../../storage";
import DeatailProfile from "./deatail";
import { EditOutlined } from "@ant-design/icons";

import "./header.css";
import ChangePassword from "./password";
const TYPECHANGE = [
  { type: "INFO", title: "Detail Profile", image: "/image/User.png" },
  {
    type: "PASSWORD",
    title: "Change Password",
    image: "/image/LockSimple.png",
  },
  { type: "CONTACT", title: "Contact", image: "/image/Phone.png" },
];
export default function Profile({ isProfileVisible }) {
  const [type, setType] = useState("INFO");
  const userInfo = LocalStorage.getCurentUser();
  return (
    <Modal
      width={1265}
      zIndex={700}
      visible={isProfileVisible}
      footer={null}
      closable={false}
      className="ModalProfile"
      title={
        <div className="header-model">
          <Typography.Title className="header-title">Profile</Typography.Title>
          <Button className="header-button" icon={<EditOutlined />}>
            Edit
          </Button>
        </div>
      }
    >
      <Col span={6} style={{ marginRight: 24 }} className="col-6">
        <Avatar size={88} src={userInfo.image} />
        <Typography.Title className="title">{userInfo.name}</Typography.Title>
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
                  <Image src={e.image} preview={false} />
                  {e.title}
                </Button>
              </React.Fragment>
            );
          })}
        </Space>
      </Col>
      <Col span={18} style={{ flex: 1 }} className="col-18">
        {type === "INFO" && <DeatailProfile userInfo={userInfo} />}
        {type === "PASSWORD" && <ChangePassword userInfo={userInfo} />}
        {/* {type === "CONTACT" && <DeatailProfile />} */}
      </Col>
    </Modal>
  );
}
