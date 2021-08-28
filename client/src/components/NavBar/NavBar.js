import React from 'react'


import { Nav,NavbarContainer,NavLogo,NavIcon,NavMenu,NavItem,NavLinks, IconShoppingCart, IconHeart, IconSettingUser, NavMenuIcon} from './NavBar.element'
const NavBar = () => {
    return (
        <>
         <Nav>
            <NavbarContainer>
                <NavLogo>
                    <NavIcon />
                    
                    ULTRA
                </NavLogo>
                <NavMenu>
                    <NavItem>
                        <NavLinks to ='/'>
                            Home
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                            Shop
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                            Features
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                            About
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to ='/'>
                            Contact
                        </NavLinks>
                    </NavItem>
                </NavMenu>      
                <NavMenuIcon>
                    <NavItem>
                        <NavLinks to ='/'>
                        <IconShoppingCart />
                            
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
