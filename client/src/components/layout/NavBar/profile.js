import {
  Avatar,
  Button,
  Col,
  Image,
  Modal,
  notification,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";

import { EditOutlined } from "@ant-design/icons";

import "./header.css";
import DeatailProfile from "./detail";
import ChangePassword from "./passwork";
import List from "./List";
import { storage } from "../../../comon/storage";
import { changePassword, UpdateAccount } from "../../../api/account";
import { getUserbyId } from "../../../api";

const TYPECHANGE = [
  { type: "INFO", title: "Detail Profile", image: "/image/User.png" },
  {
    type: "PASSWORD",
    title: "Change Password",
    image: "/image/LockSimple.png",
  },
  { type: "ORDER", title: "Order", image: "/image/Phone.png" },
];
export default function ModalProfileForm({ visibleProfile, onCancel }) {
  const [isEditDetail, setIsEditDetail] = useState(true);
  const [type, setType] = useState("INFO");
  const [userInfo, setUserInfo] = useState();
  const user = storage.getCurrentUser();

  React.useEffect(() => {
    if (user && user.id !== "") {
      loadingInfo(user.id);
    }
  }, []);

  const loadingInfo = (id) => {
    getUserbyId(id).then((res) => setUserInfo(res.data));
  };

  const editProfile = (values) => {
    UpdateAccount(user.id, values)
      .then((res) => {
        notification.success({
          message: `Notification`,
          description: " Update Info SuccessFully",
          placement: "topRight",
        });
        loadingInfo(user.id);
        setIsEditDetail(true);
      })
      .catch((err) => {
        notification.error({
          message: `Notification`,
          description: " Error Can't Update Data",
          placement: "topRight",
        });
        setIsEditDetail(true);
      });
  };

  const editPassword = (data) => {
    changePassword(user.id, data)
      .then((res) => {
        notification.success({
          message: `Notification`,
          description: " Change Password Success",
          placement: "topRight",
        });
        loadingInfo(user.id);
        setIsEditDetail(true);
      })
      .catch((err) => {
        notification.error({
          message: `Notification`,
          description: " Error Can't Change Pass",
          placement: "topRight",
        });
        setIsEditDetail(true);
      });
  };
  const onEditCancel = () => {
    setIsEditDetail(true);
  };
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
          {isEditDetail && (
            <Button
              className="header-button"
              icon={<EditOutlined />}
              onClick={() => setIsEditDetail(false)}
            >
              Edit
            </Button>
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
          <DeatailProfile
            userInfo={userInfo}
            isEditDetail={isEditDetail}
            editProfile={editProfile}
            onEditCancel={onEditCancel}
          />
        )}

        {type === "PASSWORD" && (
          <ChangePassword
            userInfo={userInfo}
            isEditDetail={isEditDetail}
            editPassword={editPassword}
            onEditCancel={onEditCancel}
          />
        )}

        {type === "ORDER" && <List />}
      </Col>
    </Modal>
  );
}
