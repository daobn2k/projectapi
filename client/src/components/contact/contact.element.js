import { Button } from "antd"
import styled from "styled-components"

export const CardTop = styled.div`
width: 100%;

`
export const CardPayment = styled.div`
display: flex;
flex:1;
justify-content: center;
align-items: center;
`
export const CardTotal = styled.div`
display:flex;
flex-direction: column;

`

export const TitleCard = styled.h1`
    font-size: 18px;
    line-height: 20px;
    font-weight: 400;   
    color: #222;
    margin-bottom: 15px;

    display:flex;
    align-items: center;
`

export const TextCard = styled.p`
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #333;
    margin-bottom: 15px;

`
export const TextLink = styled.a`
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #333;
    margin-bottom: 15px;
`
export const ButtonPayment = styled(Button)`
   width: 100%;
    margin-top: 10px;
    height: 46px;
    line-height: 20px;
    font-size: 16px;
    background:#000;
    color:#fff;
    &:hover{
    color:#cd853f;
    background:#000;
    transform:scale(1.05);
}
`