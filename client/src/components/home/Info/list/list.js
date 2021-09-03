import {  Card, Col, Row} from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { FaCarSide } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import {ReloadOutlined} from '@ant-design/icons'
import './list.css'

export default function ListInfo() {
    return (
        <div className="ListItem"
        >
        
        <Row gutter={24} 
        style={{    
          justifyContent: 'center',
          height: "100%",
          width: "100%",
          maxWidth: '1140px',
          alignItems: "center"
        }}>
      
                  <Col span={8} >
                      <Card bordered={false}>
                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 40
                      }}>
                      <FaCarSide/>
                      </div>
                      <Meta 
                      title='Worldwide Delivery'
                      description={
                        <p>Far far away, behind the word mountains, far from the countries.</p>
                      }
                      >
                      </Meta>
                      </Card>
                  </Col>  
                  <Col span={8} >
                      <Card bordered={false}>
                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 40
                      }}>
                      <RiSecurePaymentLine/>
                      </div>
                      <Meta 
                      title='Secure Payments'
                      description={
                        <p>Far far away, behind the word mountains, far from the countries.</p>
                      }
                      >
                      </Meta>
                      </Card>
                  </Col> 
                  <Col span={8} >
                      <Card bordered={false}>
                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 40
                      }}>
                     <ReloadOutlined />
                      </div>
                      <Meta 
                      title='Simple Returns'
                      description={
                        <p>Far far away, behind the word mountains, far from the countries.</p>
                      }
                      >
                      </Meta>
                      </Card>
                  </Col> 
        </Row>
      </div>
    )
}
