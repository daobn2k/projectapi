import React from 'react'
import { Col, Row } from 'antd'
import { Route } from 'react-router-dom'
import AddCustomer from '../components/customer/addCustomer'
import ListCustomer from '../components/customer/customerList'
export default function Customer() {
    return (
        <React.Fragment>
              <Row style={{width:'100%',height:'100%'}}>
            <Col style={{width:'100%',height:'100%',margin: '24px 16px'
    ,padding: 24}}>
            <Route path="/customer/list" component={ListCustomer} />
       
               <Route path="/customer/add" component ={AddCustomer} />
       
          </Col>

        </Row>
        </React.Fragment>
    )
}
