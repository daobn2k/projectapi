import {  Button, Card, Col, Image, Row, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useState } from 'react'
import {ShoppingCartOutlined } from '@ant-design/icons'
import './productView.css'
import { NavItem, NavLinks, NavMenu } from './product.element'
import Search from 'antd/lib/input/Search'
const { Text } = Typography
export default function ListProduct() {
    const [activeIndex, setActiveIndex] = useState(1)
    const listMenu = [
        { id: 1, title: 'All List Car' },
        { id: 2, title: 'Bently' },
        { id: 3, title: 'Mec' },
        { id: 4, title: 'Audi' },
        { id: 5, title: 'Ranger Rover' },
    ]
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

        {
            title: 'Xe Bentley',
            description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
            price: '307.0003',
            image: '/image/bentley-mulsanne-4.jpg',
            alt: 'Car'
        },
    ]

    function chooseValue(item) {
        setActiveIndex(item.id)
    }

    const onSearch = value => console.log(value);
    return (
        <div className="site-card-wrapper">
            <div className="Fitler_List">

                <NavMenu>
                    {listMenu.map((e, index) => {
                        return (
                            <NavItem
                                key={index}
                                onClick={() => chooseValue(e)}
                            >
                                <NavLinks className={activeIndex === e.id ? 'filter active' : 'filter'}>
                                    {e.title}
                                </NavLinks>
                            </NavItem>
                        )
                    })}
                </NavMenu>
               
                    <Search
                        placeholder="Input Car Search ... "
                        onSearch={onSearch}
                        enterButton
                        style={{
                            maxWidth:'400px',
                            borderRadius: '10px',
                            fontSize:14,
                            lineHeight:20,

                            }}
                    />
            </div>
            <Row gutter={24} >
                {data.map((e, index) => {
                    return (
                        <Col key={index} span={6}>
                            <Card
                                cover={<Image src={e.image} style={{ height: ' 200px' }} />}
                                bordered={false}>
                                <Meta title={e.title} description={
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}

                                    >
                                        <Text style={{
                                            fontSize: 14,
                                            marginBottom: 8,

                                        }}>{e.price}</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            marginBottom: 8,
                                        }}>{e.description}</Text>
                                        <Button type="primary" className="BTN"> <ShoppingCartOutlined />Buy Now</Button>
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
