import styled from "styled-components";
import { ShoppingCartOutlined,HeartOutlined,SettingOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";

export const Nav = styled.nav`
width: 100%;
background-color: transparent;
height: 64px;
display: flex;
align-items: center;
position:absolute;
padding: 0px 70px;
font-size:1.2rem;
top:0;
z-index:999;

`


export const NavbarContainer = styled.div`
display:flex;
height: 100%;
width:100%;
`

export const NavLogo = styled.div`
color:#333;
justify-self: center;
cursor: pointer;
text-decoration: none;
font-size:1.5rem;
display:flex;
align-items: center;

`

export const NavIcon = styled.img`
margin-right:0.5rem;
`

export const NavMenu =styled.ul`
height:64px;
display:flex;
align-items:center;
text-align:center;
justify-content: center;
margin-bottom:0;
`

export const NavItem =styled.li`
list-style:none;
display:flex;
justify-content: center;

`

export const NavLinks =styled(Link)`
display: flex;
align-items: center;
text-decoration:none;
font-size:1rem;
margin-right: 30px;
cursor: pointer;
&:hover{
    color:#cd853f;
    transform:scale(1.05);
}
`
export const NavMenuIcon =styled.ul`
flex:1;
height:64px;
display:flex;
align-items:center;
text-align:center;
justify-content: flex-end;
margin-bottom:0;
width:100%;
`

export const IconShoppingCart = styled(ShoppingCartOutlined)`
font-size:1.2rem;

`
export const IconHeart = styled(HeartOutlined)`
font-size:1.2rem;

`
export const IconSettingUser = styled(SettingOutlined)`
font-size:1.2rem;

`
