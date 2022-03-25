import { Col, Row } from 'antd'
import React from 'react'
import { Route } from 'react-router-dom'
import AddRequest from '../components/request/newRequest'
import ListRequest from '../components/request/requestList'

export default function RequestPage() {
  return (
    <Row style={{ width: '100%', height: '100%' }}>
      <Col style={{ width: '100%', height: '100%', padding: 24 }}>
        <Route path="/request/list" component={ListRequest} />
        <Route path="/request/add" component={AddRequest} />
      </Col>
    </Row>
  )
}
