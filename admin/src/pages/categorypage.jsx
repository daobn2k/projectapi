import { Col, Row } from 'antd'
import React from 'react'
import { Route } from 'react-router-dom'
import AddCategory from '../components/category/addCategory'
import ListCategory from '../components/category/listCategory'

export default function CategoryPage() {
    return (
        <Row style={{width:'100%',height:'100%'}}>
        <Col style={{width:'100%',height:'100%',margin: '24px 16px'
,padding: 24}}>
    
        <Route path="/category/list" component={ListCategory} />
        <Route path="/category/add" component ={AddCategory} />
   
      </Col>
      </Row>
    )
}
