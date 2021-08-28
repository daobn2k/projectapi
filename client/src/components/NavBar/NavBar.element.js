import styled from "styled-components";
import { Container } from "../../globalStyled";
import { RadarChartOutlined,ShoppingCartOutlined,HeartOutlined,SettingOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";



export const Nav = styled.nav`
background:#D7DBDC;
height: 80px;
display: flex;
justify-content: center;
align-items: center;
position: sticky;
font-size:1.2rem;
top:0;
z-index:999;
`


export const NavbarContainer = styled(Container)`
display:flex;
/* justify-content: space-between; */
height: 100%;
${Container}
`

export const NavLogo = styled.div`
color:#101522;
justify-self: flex-start;
cursor: pointer;
text-decoration: none;
font-size:2rem;
display:flex;
align-items: center;

`

export const NavIcon = styled(RadarChartOutlined)`
margin-right:0.5rem;
`

export const NavMenu =styled.ul`
display:flex;
align-items:center;
text-align:center;
justify-content: center;

`

export const NavItem =styled.li`
list-style:none;
display:flex;
justify-content: center;

`

export const NavLinks =styled(Link)`
color:#101522;
display: flex;
align-items: center;
text-decoration:none;
font-size:1rem;
padding:0.5rem 1rem;
cursor: pointer;

&:hover{
    color:#9AA3E1;
}


`
export const NavMenuIcon =styled.ul`
flex:1;
display:flex;
justify-content: flex-end;
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
