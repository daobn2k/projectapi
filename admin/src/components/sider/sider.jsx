import React from 'react'
import { Image, Layout, Menu,Typography } from 'antd'
import { AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineFolderOpen,
  AiOutlineAreaChart,
  AiFillShop

} from "react-icons/ai"
import { MdShoppingBasket} from "react-icons/md"
import {
    AppstoreOutlined,
    UsergroupAddOutlined,
  } from '@ant-design/icons';
import { BsDot } from "react-icons/bs";
  import './sider.css'
import { Link } from 'react-router-dom';
const {Sider} = Layout
const { SubMenu } = Menu;
const {Title ,Text} = Typography



export default function SiderComponent({collapsed}) {
    return (
        <Sider style={{background:'#222A44'}} className="SiderBar" collapsed={collapsed} >
         
          <div className="Logo">
            <Image
              src="/image/avatar.jpg"
              preview={false}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}          
            />
            <div style={{flex:1}}>
            <Title className="Title">   Vũ Văn Đạo</Title>
            <Text className="Text">   MemberShip</Text>
            </div>
           

          </div>
          <div style={{width:'100%'}}>
              
          <Menu 
          className="MenuBar"
          style={{background:'#222A44'}} 
          mode="inline"
          theme='dark'
          defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" style={{color:"#fff"}}icon={<AppstoreOutlined />} className="MenuItem">
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" style={{color:"#fff"}}icon={<AiOutlineAreaChart />} className="MenuItem">
              Alternative
            </Menu.Item>
            <Menu.Item key="3" style={{color:"#fff"}}icon={<AiFillShop />} className="MenuItem">
             Management
            </Menu.Item>
        
            <SubMenu className="SubMenu" key="sub1" icon={<AiOutlineUser />} title="Customers">
            <Menu.Item key="4" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>
              <Link to ="/customer/list">Customer List</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>
              
              <Link to ="/customer/list">View Customer</Link>

            </Menu.Item>
            <Menu.Item key="6" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>
              <Link to ="/customer/add"> New Customer</Link>

            </Menu.Item>
            </SubMenu>
            <SubMenu  className="SubMenu" key="sub2" icon={<AiOutlineShoppingCart />} title="Product">
            <Menu.Item key="7" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>
              <Link to="/product/list"> </Link>Product List</Menu.Item>
            <Menu.Item key="8" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>
              <Link to="/product/list"> </Link>New Product</Menu.Item>
            <Menu.Item key="9"  icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>
              <Link to="/product/add"> </Link>New Product</Menu.Item>
            </SubMenu>
            <SubMenu className="SubMenu" key="sub3" icon={<MdShoppingBasket />} title="Category">
            <Menu.Item key="10" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>Customer List</Menu.Item>
            <Menu.Item key="11" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>View Customer</Menu.Item>
            <Menu.Item key="12" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>new Customer</Menu.Item>
            </SubMenu>
            <SubMenu className="SubMenu" key="sub4" icon={<AiOutlineFolderOpen />} title="Orders">
            <Menu.Item key="13" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>Customer List</Menu.Item>
            <Menu.Item key="14" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>View Customer</Menu.Item>
            <Menu.Item key="15" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>new Customer</Menu.Item>
            </SubMenu>
            <SubMenu className="SubMenu" key="sub5" icon={<UsergroupAddOutlined />} title="Membership">
            <Menu.Item key="16" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>List Membership</Menu.Item>
            <Menu.Item key="17" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>View Membership</Menu.Item>
            <Menu.Item key="18" icon={< BsDot/>} style={{color:"#fff",paddingLeft:20}}>New Membership</Menu.Item>
            </SubMenu>
          </Menu>
          </div>
          
        </Sider>
    )
}
