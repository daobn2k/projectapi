import { Breadcrumb, Table, Space, Row, Col, Input } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd/lib/radio';

import React from 'react'
import { ButtonPayment, CardBottom, CardPayment, CardTop, CardTotal, TextCard, TitleCard } from './cart.element';

export default function Cart() {

    const columns = [
        {
            title: 'Product',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            align:'center',
            dataIndex: 'quantity',
            key: 'quantity',
            render:()=>(
                <div style={{
                    display: "flex",
                    justifyContent:'center' 
                }}>
                     <Button 
                     style={{
                         width:40,
                        fontSize:16,
                        marginRight:8
                    }}>+</Button>   
                     <Input style={{width:40,textAlign: "center"}} defaultValue="1" disabled />
                     <Button 
                     style={{
                         width:40,
                        fontSize:16,
                        marginLeft:8

                    }}>-</Button>
                </div>
            )
        },
        {
            title: 'TOTAL',
            key: 'total',
            render: (text, record) => (
                <Space size="middle">
                </Space>
            ),
        },
        {
            title: 'Action',
            align:'center',
            key: 'action',
            render: (text, record) => (
                <div style={{textAlign:'center'}}>
                    <DeleteOutlined />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <div >
            <Breadcrumb separator=">"
                style={{
                    fontSize: 15,
                    padding: '16px 0'
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>

                <Breadcrumb.Item>Shopping Cart</Breadcrumb.Item>
            </Breadcrumb>
            <Row
            >
                <Col
                    span={24}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </Col>
            </Row>
            <Row
            >
                <Col
                    span={24}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <div style={{ display: 'flex', }}>
                        <Input
                            placeholder="Enter Your Coupo"
                            style={{
                                width: "220px",
                                height: "48px",
                                color: " #333",
                                padding: "0px 20px",
                                fontSize: 16,
                                boxShadow: "0px 0px 5px #0000000a",
                            }}
                        />
                        <Button
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                height: "48px",
                                padding: "0px 20px",
                                background: "#fff",
                                boxShadow: "0px 0px 5px #0000000a",
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            APPLY
                        </Button>
                    </div>
                    <CardPayment>
                        <CardTop>
                            <CardTotal>
                                <TitleCard>Card Subtotal</TitleCard>
                                <TextCard>$330.00</TextCard>
                            </CardTotal>
                            <CardTotal>
                                <TitleCard>ShippingFree</TitleCard>
                                <TextCard>Free</TextCard>
                            </CardTotal>
                            <CardTotal>
                                <TitleCard>You Save</TitleCard>
                                <TextCard>$20.00</TextCard>
                            </CardTotal>
                        </CardTop>
                        <CardBottom>
                            <CardTotal>
                                <TitleCard>You Pay</TitleCard>
                                <TextCard>$310.00</TextCard>
                            </CardTotal>
                            <CardTotal>
                                <ButtonPayment >
                                        CHECKOUT
                                </ButtonPayment>
                            </CardTotal>
                        </CardBottom>
                    </CardPayment>
                </Col>
            </Row>
        </div>
    )
}
