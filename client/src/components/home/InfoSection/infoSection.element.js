import styled from "styled-components";
import { Button } from 'antd';
import { ArrowLeftOutlined,ArrowRightOutlined } from '@ant-design/icons';


export const Section = styled.section`
height:100vh;
max-height: 1100px;
position: relative;
overflow:hidden;
`
export const SectionWrapper = styled.div`
width:100%;
height:100%;
display:flex;
justify-content: center;
align-items:center;
overflow:hidden;
position:relative;

`

export const Slide = styled.div`
z-index: 1;
width: 100%;
height:100%;
`


export const Slider = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height: 100%;
display:flex;
align-items: center;
justify-content: center;
`
export const Content = styled.div`
right: 375px;
position: relative;
z-index: 10;
display: flex;
flex-direction: column;
max-width: 400px;
width:calc(100%-100px);
color:#fff;
    h1{
        color:#fff;
        font-size: 32px;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow:0px 0px 20px rgba(0,0,0,0.4);
        text-align:left;
        margin-bottom: 0.8rem;
    }
    p{
        margin-bottom:1.2rem;

    }
`

export const ButtonStyled = styled(Button)`
max-width: 160px;
width:100%;
height: 40px;
font-size: 18px;
line-height: 22px;
`
export const ImageSlider = styled.img`
position:absolute;
top:0;
left:0;
width:100%;
height: 100vh;
/* object-fit: cover; */
`


export const SliderButton =styled.div`

`

export const SliderPrev = styled(ArrowRightOutlined)`
position: absolute;
bottom:50%;
right:0;
z-index: 10;

width:50px;
height:50px;
color:#fff;
border-radius:50%;
padding:10px;
background:#000d1a;
cursor: pointer;
user-select: none;
margin-right: 1rem;
transition:0.3s;
display:flex;
align-items: center;
justify-content: center;

&:hover{
    background:#cd853f;
    transform:scale(1.05);
}
`
export const SliderNext = styled(ArrowLeftOutlined)`
position: absolute;
bottom:50%;
left:10px;
z-index: 10;

display:flex;
justify-content: center;
align-items:center;
width:50px;
height:50px;
color:#fff;
border-radius:50%;
padding:10px;
background:#000d1a;
cursor: pointer;
user-select: none;
margin-right: 1rem;
transition:0.3s;
&:hover{
    background:#cd853f;
    transform:scale(1.05);
}
`


