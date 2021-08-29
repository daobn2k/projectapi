import { Col, Row } from 'antd'
import React from 'react'
import { Route } from 'react-router-dom'
import AddProduct from '../components/product/addProduct'
import ListProduct from '../components/product/listProduct'

export default function ProductPage() {
    return (
        <>
        <Row style={{width:'100%',height:'100%'}}>
            <Col style={{width:'100%',height:'100%',margin: '24px 16px'
    ,padding: 24}}>
            <Route path="/product/list" component={ListProduct} />
       
          <Route path="/product/add" component ={AddProduct} />
       
          </Col>

        </Row>
        
        </>
    )
}
