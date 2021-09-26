import { Button } from "antd"
import styled from "styled-components"

export const CardTop = styled.div`
width: 100%;
`
export const CardBottom = styled.div`
    width: 100%;
    padding-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #c8c8c8;
    color: #333;
    font-size: 15px;
    font-weight: 400;
`


export const CardPayment = styled.div`
max-width: 260px;
flex:1;
`
export const CardTotal = styled.div`
display:flex;
justify-content: space-between;
`

export const TitleCard = styled.h1`
   font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: #333;
    margin-bottom: 12px;
`

export const TextCard = styled.p`
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #333;
`
export const ButtonPayment = styled(Button)`
    width: 100%;
    margin-top: 10px;
    height: 46px;
    line-height: 20px;
    font-size: 16px;
    background-color: #f74877;

    color:#fff;
    &:hover{
    color:#fff;
    background-color: #f74877;

    transform:scale(1.05);
}
`