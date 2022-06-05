import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Space } from "antd";
import {
  BellOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
import { FiLogOut } from "react-icons/fi";
import LogOut from "./logout";
import "./header.css";
import { store } from "../../storage";
import { useHistory } from "react-router";
import Profile from "./proflie";
import { logoutUser } from "../../axios/login";
import { NotificationCommon } from "../../common/Notification";
import moment from "moment";
import { updateTimeSheet } from "../../axios/timesheet";

const { Header } = Layout;
export default function HeaderComponent({ toggle }) {
  const currentAccount = store.getCurentUser();
  const times = store.getCurrentTimeSheet();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const history = useHistory();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    logoutUser({id:currentAccount._id}).then(res=>{
      if(res.data.message === 'SUCCESS'){
        return updateTimeSheet(times._id,{
          ...times,
          end_date_time:moment(new Date())
        })
      }
    }).then(res=>{
      if(res.data.message === 'SUCCESS') {
        history.push('/auth/login')
      }
    }).catch(err => {
      NotificationCommon("error", "Đăng xuất thất bại");
    }).finally(()=>{
      store.clearAll()
    })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsProfileVisible(false);
  };

  const showProfile = () => {
    setIsProfileVisible(true);
  };
  const menu = (
    <Menu className="menu-dropdown">
      <Menu.Item key="1" className="item-menu" onClick={showProfile}>
        <Space size={8} className="space-item">
          <UserOutlined className="NavIcon" />
          Thông tin cá nhân
        </Space>
      </Menu.Item>
      <Menu.Item key="2" className="item-menu">
        <Space size={8} className="space-item">
          <AiOutlineSetting className="NavIcon" />
          Cài Đặt
        </Space>
      </Menu.Item>
      <Menu.Item key="3" className="item-menu" onClick={showModal}>
        <Space size={8} className="space-item">
          <FiLogOut className="NavIcon" />
          Đăng xuất
        </Space>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="HeaderComponent">
      <nav className="NavBar">
        <ul className="NavList">
          <li className="NavItem" onClick={toggle}>
            <AiOutlineMenu className="NavIcon" />
          </li>
          <li className="NavItem">
            <MailOutlined className="NavIcon" />
          </li>
        </ul>
        <ul className="NavList" style={{ justifyContent: "flex-end" }}>
          <li className="NavItem">
            <SearchOutlined className="NavIcon" />
          </li>
          <li className="NavItem">
            <BellOutlined className="NavIcon" />
          </li>
          <li className="NavImageUser">
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <Avatar src={currentAccount  && currentAccount.avatar ? currentAccount.avatar : ''} size={50} />
            </Dropdown>
          </li>
        </ul>
      </nav>
      <LogOut
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      <Profile
        isProfileVisible={isProfileVisible}
        handleCancel={handleCancel}
      />
    </Header>
  );
}
