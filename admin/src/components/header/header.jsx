import React, { useState } from 'react'
import { Layout } from 'antd'
import { BellOutlined,ShoppingCartOutlined, CarryOutOutlined, MailOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons'
import { AiOutlineMenu,AiOutlineSetting } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import LogOut from './logout'
// import Avatar from 'antd/lib/avatar/avatar'
import './header.css'
import { LocalStorage } from '../../storage'
import { useHistory } from 'react-router'
const { Header } = Layout
export default function HeaderComponent( {toggle}) {
      const [isModalVisible, setIsModalVisible] = useState(false);
      const history = useHistory()
      const showModal = () => {
      setIsModalVisible(true);
      };

      const handleOk = () => {
            LocalStorage.clearAll()
            history.push({
                  pathname:'/auth/login'
            })
            setIsModalVisible(false);
      };

      const handleCancel = () => {
      setIsModalVisible(false);
      };
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
                 
            </li>
              <li className="NavItem" onClick={showModal}>
                   <FiLogOut className="NavIcon"/>
            </li>
                </ul>
            </nav>
            <LogOut isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}/>
        </Header>
    )
}
