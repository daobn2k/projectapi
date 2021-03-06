import React from 'react'
import { Col, Row } from 'antd'
import { Route } from 'react-router-dom'
import ListDepartment from '../components/department/ListDepartment'

export default function Department() {
  return (
    <React.Fragment>
      <Row style={{ width: '100%', height: '100%' }}>
        <Col style={{ width: '100%', height: '100%',margin: '24px 16px'
    ,padding: 24 }}>
          <Route path="/department/list" component={ListDepartment} />
        </Col>

      </Row>
    </React.Fragment>
  )
}
