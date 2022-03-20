import React from "react";
import { Image, Layout, Menu } from "antd";
import {
  AiOutlineUser,
  AiOutlineAreaChart,
  AiFillShop,
} from "react-icons/ai";
import { AppstoreOutlined ,FileWordOutlined} from "@ant-design/icons";
import { BsDot } from "react-icons/bs";
import "./sider.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SiderComponent({ collapsed }) {

  return (
    <Sider
      style={{ background: "#222A44" }}
      className="SiderBar"
      collapsed={collapsed}
    >
      <div className="Logo">
        <Image
          src="/image/carfoot.png"
          preview={false}
          style={{
            width: collapsed ? "50px" : "100px",
            height: collapsed ? "50px" : "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ width: "100%" }}>
        <Menu
          className="MenuBar"
          style={{ background: "#222A4" }}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key="1"
            style={{ color: "#fff" }}
            icon={<AppstoreOutlined />}
            className="MenuItem"
          >
            <Link to="/">Thống kê chung</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            style={{ color: "#fff" }}
            icon={<AiOutlineAreaChart />}
            className="MenuItem"
          >
            <Link to="/">Biểu đồ</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            style={{ color: "#fff" }}
            icon={<AiFillShop />}
            className="MenuItem"
          >
            <Link to="/">Quản lý</Link>
          </Menu.Item>

          <SubMenu
            className="SubMenu"
            key="sub1"
            icon={<AiOutlineUser />}
            title="Nhân viên"
          >
            <Menu.Item
              key="4"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/customer/list">Danh sách nhân viên</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="SubMenu"
            key="sub2"
            title="Công việc"
            icon={<FileWordOutlined />}
          >
            <Menu.Item
              key="5"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/request/list">Danh sách công việc</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Sider>
  );
}
