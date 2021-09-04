import styled from "styled-components"


export const NavMenu =styled.ul`
height:64px;
display:flex;
align-items:center;
text-align:center;
justify-content: center;
margin-bottom:0;
padding:0;
`

export const NavItem =styled.li`
list-style:none;
display:flex;
justify-content: center;

`

export const NavLinks =styled.p`
color: #888;
display: flex;
align-items: center;
text-decoration:none;
font-size:1rem;
margin-right: 30px;
cursor: pointer;
transition: all 0.4s;
&:hover{
    border-bottom: 1px solid transparent;
    color: #333;
    border-color: #797979;
}
`