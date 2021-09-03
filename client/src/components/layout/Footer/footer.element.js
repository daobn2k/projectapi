import { Col, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const {Title} = Typography
export const FooterRow = styled(Row)`
height:400px;
justify-content: space-around;
align-items: center;
padding: 120px  50px;
`
export const FooterCol = styled(Col)`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding:0 50px !important;
`

export const FooterTitle = styled(Title)`
    font-size: 18px !important;
    font-weight: 700;
    margin-bottom: 30px !important; 
`
export const FooterListIcon = styled.div`
display:flex;
`
export const FooterList = styled.div`
display:flex;
flex-direction: column;
`
export const FooterItem = styled(Link)`
    color: #a09e9c;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 15px;
`

export const FooterInput = styled(Input)`
    width: 100%;
    height: 40px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
`