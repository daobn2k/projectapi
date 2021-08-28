import React from 'react'
import { Carousel } from 'antd';
import { HeadTitle, Slider, SliderCard, SliderImage,DesText, ButtonStyled, ImageStyled } from './infoSection.element';


const InfoSection = () => {
    return (
        <Carousel autoplay>
    <Slider>

      <SliderImage>
     
        <ImageStyled 
        />
      </ SliderImage>
      <SliderCard>
            <HeadTitle >ADASDA</HeadTitle>
            <DesText>user interface specs for internal background projects, 
                lower the unnecessary cost of design differences and implementation
                and liberate the resources of design and front-end development.
            </DesText>
            <ButtonStyled>Buy Now</ButtonStyled>   
    </SliderCard>     
    </Slider>
    {/* <Slider>
      <SliderImage
      />
      <SliderCard>
            <h1> ádaasadd</h1>    
    </SliderCard>     
    </Slider>
    <Slider>
      <SliderImage
      />
      <SliderCard>
            <h1> ádaasadd</h1>    
    </SliderCard>     
    </Slider> */}
    
  </Carousel>
    )
}

export default InfoSection
