import React from 'react';
import ListCustomer from '../customer/customerList';
import './index.css';
import { Row, Col } from 'antd';

const DashBoardComponent = () => {
    return (
        <div className="root-dashboard">
          <Row className='db-row'>
              <Col span={10}>
                  <ListCustomer isShow={false} />
              </Col>
              <Col span={10}>
                  <ListCustomer isShow={false} />
              </Col>
          </Row>
        </div>
    );
};

export default DashBoardComponent;
