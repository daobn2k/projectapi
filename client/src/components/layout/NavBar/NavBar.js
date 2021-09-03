import { Badge, Button } from 'antd'
import React, { useState } from 'react'
import { Nav,NavbarContainer,NavLogo,NavIcon,NavMenu,NavItem,NavLinks, IconShoppingCart, IconHeart, IconSettingUser, NavMenuIcon} from './NavBar.element'
import {UserOutlined} from '@ant-design/icons'
const listMenu =[
    {id:1,to:'/',title:'Home'},
    {id:2,to:'/product',title:'Product'},
    {id:3,to:'/cart',title:'Cart'},
    {id:4,to:'/about',title:'About'},
    {id:5,to:'/contact',title:'Contact'},
]


const NavBar = () => {
    const [navbar, setNavbar] = useState(false)
    const [activeIndex, setActiveIndex] = useState(1)

    const ChangeBackground = () =>{
        if(window.scrollY >= 40) {
            setNavbar(true)
        }
        else{
            setNavbar(false)
        }
    }
    window.addEventListener('scroll',ChangeBackground)

    function chooseValue(item) {
        setActiveIndex(item.id)
        }
    return (
        <>
         <Nav style={{
             position:navbar?'fixed':'sticky',
             background:navbar?'#fff':'#F7F7F7',
             boxShadow: navbar?'0 0px 3px 0px rgb(0 0 0 / 20%)':'',
             
             }}>
            <NavbarContainer>
                <NavLogo >
                    <NavIcon  style={{color:navbar?'#666':'#fff'}}/>
                    
                    GOOD CAR
                </NavLogo>
                <NavMenu>
                {listMenu.map((e,index) =>{
                    return(
                        <NavItem 
                        key={index}
                        onClick={()=>chooseValue(e)}
                        >
                        <NavLinks 
                        to={e.to} 
                        style={{
                            color:activeIndex === e.id ? '#333':'#888',
                            borderBottom: activeIndex === e.id ?'1px solid transparent':'',
                            borderColor: activeIndex === e.id ?'#797979':''
                        }}
                        
                        >
                                {e.title}
                        </NavLinks>
                        </NavItem>
                    )
                })}
                </NavMenu>      
                <NavMenuIcon>
                    <NavItem>
                        <NavLinks to ='/' >
                        <Badge size="small"  count={5}>
                        <IconShoppingCart  />
                        </Badge>
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                            <IconHeart style={{color:"#404040"}}/>
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                            <IconSettingUser style={{color:"#404040"}}/>
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                          <UserOutlined style={{color:"#404040"}}/>
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <Button>Sign In</Button>
                    </NavItem>
            
                </NavMenuIcon>  
            </NavbarContainer>
        </Nav>   
        </>
    )
}

export default NavBar
