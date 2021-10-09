import { Col, Row } from 'antd'
import React from 'react'
import { Route } from 'react-router-dom'
import OrderList from '../components/order/OrderList'

export default function OrderPage() {
    return (
        <React.Fragment>
        <Row style={{width:'100%',height:'100%'}}>
            <Col style={{width:'100%',height:'100%',margin: '24px 16px'
    ,padding: 24}}>
            <Route path="/order/list" component={OrderList} />
          </Col>
        </Row>
        </React.Fragment>
    )
}
