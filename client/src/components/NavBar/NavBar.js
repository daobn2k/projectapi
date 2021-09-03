import { Badge } from 'antd'
import React, { useState } from 'react'
import { Nav,NavbarContainer,NavLogo,NavIcon,NavMenu,NavItem,NavLinks, IconShoppingCart, IconHeart, IconSettingUser, NavMenuIcon} from './NavBar.element'

const listMenu =[
    {id:1,to:'/',title:'Home'},
    {id:2,to:'/product',title:'Product'},
    {id:3,to:'/cart',title:'Cart'},
    {id:4,to:'/about',title:'About'},
    {id:5,to:'/contact',title:'Contact'},
]

const NavBar = () => {
    const [navbar, setNavbar] = useState(false)
    const ChangeBackground = () =>{
        if(window.scrollY >= 40) {
            setNavbar(true)
        }
        else{
            setNavbar(false)
        }
    }
    window.addEventListener('scroll',ChangeBackground)
    return (
        <>
         <Nav style={{
             position:navbar?'fixed':'sticky',
             background:navbar?'#fff':'',
             boxShadow: navbar?'0 0px 3px 0px rgb(0 0 0 / 20%)':''
             ,
             
             }}>
            <NavbarContainer>
                <NavLogo >
                    <NavIcon  style={{color:navbar?'#666':'#fff'}}/>
                    
                    GOOD CAR
                </NavLogo>
                <NavMenu>
                {listMenu.map((e,index) =>{
                    return(
                        <NavItem key={index}>
                        <NavLinks to={e.to} >
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
                            <IconHeart />
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                            <IconSettingUser />
                        </NavLinks>
                    </NavItem>
            
                </NavMenuIcon>  
            </NavbarContainer>
        </Nav>   
        </>
    )
}

export default NavBar
