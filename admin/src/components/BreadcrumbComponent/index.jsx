
import React from 'react';
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from 'antd';


const BreadcrumbComponent = (props) => {
    const { title,descriptionTitle } = props
    return (
        <Breadcrumb separator=">" style={{ paddingBottom: 20, paddingLeft: 40 }}>
            <Breadcrumb.Item href="">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{title || ''}</Breadcrumb.Item>
            <Breadcrumb.Item>
                {descriptionTitle}
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default BreadcrumbComponent