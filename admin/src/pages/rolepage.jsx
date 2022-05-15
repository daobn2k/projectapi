import React from 'react';
import RolePageComponent from '../components/RolePageComponent';
import { Row, Col } from 'antd';
export default function RolePage() {
    return (
        <div>
            <Row style={{ width: '100%', height: '100%' }}>
                <Col
                    style={{
                        width: '100%',
                        height: '100%',
                        margin: '24px 16px',
                        padding: 24,
                    }}
                >
                    <RolePageComponent />
                </Col>
            </Row>
        </div>
    );
}
