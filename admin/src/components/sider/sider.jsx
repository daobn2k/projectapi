import React from "react";
import { Image, Layout, Menu } from "antd";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineFolderOpen,
  AiOutlineAreaChart,
  AiFillShop,
} from "react-icons/ai";
import { MdShoppingBasket } from "react-icons/md";
import { AppstoreOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { BsDot } from "react-icons/bs";
import "./sider.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SiderComponent({ collapsed }) {
  console.log(collapsed);
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
            <Link to="/"> Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            style={{ color: "#fff" }}
            icon={<AiOutlineAreaChart />}
            className="MenuItem"
          >
            <Link to="/">Alternative</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            style={{ color: "#fff" }}
            icon={<AiFillShop />}
            className="MenuItem"
          >
            <Link to="/">Management</Link>
          </Menu.Item>

          <SubMenu
            className="SubMenu"
            key="sub1"
            icon={<AiOutlineUser />}
            title="Customers"
          >
            <Menu.Item
              key="4"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/customer/list">Customer List</Link>
            </Menu.Item>

            <Menu.Item
              key="5"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/customer/add"> New Customer</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="SubMenu"
            key="sub2"
            icon={<AiOutlineShoppingCart />}
            title="Product"
          >
            <Menu.Item
              key="6"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/product/list">Product List </Link>
            </Menu.Item>

            <Menu.Item
              key="7"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/product/add"> New Product</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="SubMenu"
            key="sub3"
            icon={<MdShoppingBasket />}
            title="Category"
          >
            <Menu.Item
              key="8"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/category/list"> Category List</Link>
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/category/add"> New Category</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="SubMenu"
            key="sub4"
            icon={<AiOutlineFolderOpen />}
            title="Orders"
          >
            <Menu.Item
              key="10"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/order/list"> Order List</Link>
            </Menu.Item>
            <Menu.Item
              key="11"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/order/detail"> Order Detail</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="SubMenu"
            key="sub5"
            icon={<UsergroupAddOutlined />}
            title="Membership"
          >
            <Menu.Item
              key="12"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/member/list"> List Member</Link>
            </Menu.Item>
            <Menu.Item
              key="13"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/member/add"> New Member</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="SubMenu"
            key="sub6"
            icon={<UsergroupAddOutlined />}
            title="Storage"
          >
            <Menu.Item
              key="14"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/storage/list"> Warehouse</Link>
            </Menu.Item>
            <Menu.Item
              key="15"
              icon={<BsDot />}
              style={{ color: "#fff", paddingLeft: 20 }}
            >
              <Link to="/storage/add"> New Warehouse</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Sider>
  );
}
