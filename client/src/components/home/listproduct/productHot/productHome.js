import { Button, Card, Col, Image, Row,Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import './product.css'
import {ShoppingCartOutlined} from '@ant-design/icons'
const { Title,Text } = Typography

export default function ProductHot() {
    const data = [
        {
          title: 'Xe Bentley',
          description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
          price: '307.0002',
          image: '/image/mecbenz.jpg',
          alt: 'Car'
        },
    
        {
          title: 'Xe Mercesdes',
          description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
          price: '307.0001',
          image: '/image/zero-take-t4yzxOtDZgQ-unsplash.jpg',
          alt: 'Car'
        },
    
        {
          title: 'Xe Bentley',
          description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
          price: '307.0003',
          image: '/image/bentley-mulsanne-4.jpg',
          alt: 'Car'
        },
      ]
    return (
        <div className="site-card-wrapper">
        <Title 
        style={{
            marginBottom: "1.5rem",
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1.23,
        }}
        >
        Hot Product Spring 2021
        </Title>
        <Row gutter={24}>
         {data.map( (e,index)=>{
             return(
                  <Col key={index} span={8}>
                        <Card                        
                         cover={<Image src ={e.image} style={{height:' 300px'}}/>} 
                         bordered={false}>
                        <Meta title={e.title} description={
                            <div 
                            style={{
                                display:'flex',
                                flexDirection:'column'
                             }}
                            
                            >
                                <Text style={{
                                    fontSize:14,
                                    marginBottom:8,

                                }}>{e.price}</Text>
                                <Text style={{
                                    fontSize:14,
                                    marginBottom:8,
                                }}>{e.description}</Text>
                                <Button type="primary" className="BTN"><ShoppingCartOutlined />Add To Cart</Button>
                            </div>
                        } />
                        </Card>
                  </Col>  
             )
         })}
         
        
        </Row>
      </div>
    )
}
