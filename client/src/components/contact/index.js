import { Breadcrumb,Row, Col, Input,Typography } from 'antd'
import React from 'react'
import { ButtonPayment,CardPayment, CardTop, CardTotal, TextCard, TextLink, TitleCard } from './contact.element';
import {IoLocationOutline} from 'react-icons/io5'
import {GoMail} from 'react-icons/go'
import {FiPhone} from 'react-icons/fi'
const { TextArea } = Input;
const {Title} = Typography

export default function Contact() {


    return (
        <div >
            <Breadcrumb separator=">"
                style={{
                    fontSize: 15,
                    padding: '16px 0'
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Contact</Breadcrumb.Item>
            </Breadcrumb>
        
            <Row
            >
                <Col
                    span={24}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        border: '1px solid #e6e6e6' 
                    }}
                >
                    <div style={{ display: 'flex', flexDirection:'column',width:'50%',padding:'50px 70px',borderRight:"1px solid #e6e6e6"   }}>
                        <Title level={3} align="center" style={{paddingBottom:30}}>Send Us A Message</Title>    
                        <Input
                            placeholder="Your Email Adress"
                            prefix={<GoMail style={{
                                fontFamily: "Poppins-Regular",
                                height: "50px",
                                color: " #333",
                                fontSize: 16,
                                lineHeight: 1.6923,
                                boxShadow: "0px 0px 5px #0000000a",
                            }}/>}
                            style={{
                                fontFamily: "Poppins-Regular",
                                height: "50px",
                                color: " #333",
                                fontSize: 13,
                                padding:' 0 25px',
                                lineHeight: 1.6923,
                                boxShadow: "0px 0px 5px #0000000a",
                                marginBottom:20
                            }}
                        />
                        <TextArea rows={4} 
                        style={{
                            padding:'28px 25px',
                            marginBottom:30
                        
                        }}
                        placeholder='How Can We Help?'
                        />
                        <ButtonPayment
                            style={{    
                                width:'100%',
                                fontSize: 16,
                                height: "48px",
                                padding: "0px 20px",
                                background: "#fff",
                                boxShadow: "0px 0px 5px #0000000a",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent:'center',
                                borderRadius:"8px",
                                color:"#333"
                            }}
                        >
                            SEND MESSAGE
                        </ButtonPayment>
                    </div >
                    <CardPayment>
                        <CardTop style={{padding:'50px 100px'}}>
                            <CardTotal>
                                <TitleCard>
                                <IoLocationOutline style={{marginRight:10}}/>
                                Address</TitleCard>
                                <TextCard>Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US</TextCard>
                            </CardTotal>
                            <CardTotal>
                                <TitleCard>
                                <FiPhone style={{marginRight:10}}/>
                                Lets Talk</TitleCard>
                                <TextLink href="tel:0942858890">0942858890</TextLink>
                            </CardTotal>
                            <CardTotal>
                                <TitleCard>
                                <GoMail style={{marginRight:10}}/>
                                Sale Support</TitleCard>
                                <TextLink href="google.com">vvdao096@gmail.com</TextLink>
                            </CardTotal>
                        </CardTop>
                    </CardPayment>
                </Col>
            </Row>
        </div>
    )
}
