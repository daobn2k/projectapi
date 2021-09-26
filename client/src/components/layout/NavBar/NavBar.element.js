import styled from "styled-components";
import { ShoppingCartOutlined,HeartOutlined,SettingOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { Button } from "antd/lib/radio";

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

font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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

export const CartDetail = styled.div`
display:flex;
`
export const TitleCart = styled.h1`
    font-size: 16px;
    color: #555;
    line-height: 1.3;
    font-weight: bold;
`
export const TextCart = styled.p`
    font-size: 14px;
    color: #888;
    line-height: 1.5;
`
export const ButtonPayment = styled(Button)`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 46px;   
    line-height: 20px;
    font-size: 16px;
    background-color: #f74877;
    border-radius:4px;
    color:#fff;
    &:hover{
    color:#fff;
    transform:scale(1.05);
}
`