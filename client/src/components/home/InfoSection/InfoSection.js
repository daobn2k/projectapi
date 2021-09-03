import React, { useState } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons';

import {
  Section,
  SliderPrev,
  SliderNext,
  ImageSlider,
  SectionWrapper,
  Slide,
  Slider,
  Content,
  ButtonStyled,


} from './infoSection.element';



const InfoSection = () => {
  const data = [
    {
      title: 'RANGE ROVER SPORT',
      description: 'RANGE ROVER là thương hiệu xe đã có tuổi đời lâu năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
      price: '307.0002',
      image: '/image/rangerrover.jpg',
      alt: 'Car'
    },

    {
      title: 'Roll Roycle',
      description: 'Các dòng xe của Audi cơ bản là rất sang trọng, đắt tiền, kiêu sa và lướt...nhưng nếu so với BMW và Mercedes thì chỉ xếp thứ bậc tam, có nghĩa là xe Audi vẫn là hàng hạng sang...',
      price: '307.0001',
      image: '/image/rollroyclee.jpg',
      alt: 'Car'
    },

    {
      title: 'Bentley',
      description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
      price: '307.0003',
      image: '/image/bentleyfly.jpg',
      alt: 'Car'
    },

    {
      title: 'Mercesdes E-Class  ',
      description: 'Mercedes-Benz Việt Nam dành quà tặng 2 năm bảo dưỡng miễn phí (tương đương giá trị lên đến 29 triệu đồng) cho các khách hàng gửi yêu cầu báo giá trên Online Showroom và mua xe E-Class mới, từ nay đến hết 30/9/2021.',
      price: '307.0004',
      image: '/image/mecDes.png',
      alt: 'Car'
    },

  ]
  const [current, setCurrent] = useState(0)

  const length = data.length

  if (!Array.isArray(data) || data.length < 0) {
    return null;
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)

  }
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }


  return (
    <>
      <Section>
        <SectionWrapper>


      
          {data.map((e, index) => {
            return (
              <Slide key={index} className={index === current ? 'slide active' : 'silde'}>
    {index === current && (
       <Slider>
                    <ImageSlider
                      src={e.image} />
                  )
                  <Content>
                    <h1>{e.title}</h1>
                    <p>{e.price}</p>
                    <p>{e.description}</p>
                    <ButtonStyled


                    >
                      SHOP NOW
                      <ArrowRightOutlined style={{fontSize:14}}/>
                    </ButtonStyled>
                  </Content>
                </Slider>

    )}           
              </Slide>
            )
          })}
            <SliderNext onClick={nextSlide} />
            <SliderPrev onClick={prevSlide} />
         
        </SectionWrapper>
      </Section>

    </>
  )
}

export default InfoSection
