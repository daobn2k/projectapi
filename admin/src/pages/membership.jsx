import React from 'react'
import { Col, Row } from 'antd'
import { Route } from 'react-router-dom'
import AddMember from '../components/member/addMember'
import ListMember from '../components/member/memberList'

export default function MemberShip() {
  return (
    <>
      <Row style={{ width: '100%', height: '100%' }}>
        <Col style={{ width: '100%', height: '100%',margin: '24px 16px'
    ,padding: 24 }}>
          <Route path="/member/list" component={ListMember} />
          <Route path="/member/add" component={AddMember} />
        </Col>

      </Row>
    </>
  )
}
