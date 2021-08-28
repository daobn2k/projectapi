import React from 'react'
import { Layout } from 'antd'
import { BellOutlined,ShoppingCartOutlined, CarryOutOutlined, MailOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons'
import { AiOutlineMenu,AiOutlineSetting } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
// import Avatar from 'antd/lib/avatar/avatar'
import './header.css'
const { Header } = Layout
// const { Title,Text } = Typography
export default function HeaderComponent( {toggle}) {
    
    return (
        <Header className="HeaderComponent">
            <nav className="NavBar">
                <ul className="NavList">
              <li className="NavItem" onClick={toggle}>
                    <  AiOutlineMenu
 className="NavIcon" /> 
                    </li>
              <li className="NavItem">
                    <MailOutlined className="NavIcon"/>
                    </li>   
              <li className="NavItem">
                    < CarryOutOutlined className="NavIcon"/>
                    </li>
              <li className="NavItem">
                    <StarOutlined className="NavIcon"/>
                    </li>
                </ul>
                <ul className="NavList" style={{justifyContent:'flex-end'}}>
              <li className="NavItem">
                    <SearchOutlined className="NavIcon"/> 
                    </li>
              <li className="NavItem">
                    <BellOutlined className="NavIcon"/>
                    </li>
              <li className="NavItem">
           < ShoppingCartOutlined className="NavIcon"/>
                    </li>
              <li className="NavItem">
                   <AiOutlineSetting className="NavIcon"/>
                    {/* <Text className="NavText">Hi</Text>
                    <Title level={5} className="NavTitle">Vũ Văn Đạo</Title>
                    <Avatar className="NavImageUser"
                    src="/logo192.png"
                    /> */}
            </li>
              <li className="NavItem">
                   <FiLogOut className="NavIcon"/>
                    {/* <Text className="NavText">Hi</Text>
                    <Title level={5} className="NavTitle">Vũ Văn Đạo</Title>
                    <Avatar className="NavImageUser"
                    src="/logo192.png"
                    /> */}
            </li>
                </ul>
            </nav>
        </Header>
    )
}
