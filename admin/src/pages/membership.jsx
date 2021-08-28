import React from 'react'
import { Col, Row } from 'antd'
import { Route } from 'react-router-dom'
import AddCustomer from '../components/customer/addCustomer'
import ListCustomer from '../components/customer/customerList'

export default function MemberShip() {
    return (
        <>
              <Row style={{width:'100%',height:'100%'}}>
            <Col style={{width:'100%',height:'100%'}}>
            <Route path="/member/list" component={ListCustomer} />
       
               <Route path="/member/add" component ={AddCustomer} />
       
          </Col>

        </Row>
        </>
    )
}
