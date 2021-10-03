import React, { useEffect } from "react";
import { Form, Input, Row, Col, DatePicker } from "antd";
import moment from "moment";
export default function DeatailProfile({ userInfo, isEditDetail }) {
  useEffect(() => {}, []);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="complex-form"
      layout="vertical"
      onFinish={onFinish}
      fields={[
        {
          name: ["name"],
          value: userInfo ? userInfo.name : "",
        },
        {
          name: ["username"],
          value: userInfo ? userInfo.username : "",
        },
        {
          name: ["dob"],
          value: userInfo ? moment(userInfo.dob) : "",
        },
        {
          name: ["email"],
          value: userInfo ? userInfo.email : "",
        },
        {
          name: ["phone"],
          value: userInfo ? userInfo.phone : "",
        },
        {
          name: ["address"],
          value: userInfo ? userInfo.address : "",
        },
        {
          name: ["role"],
          value: userInfo ? userInfo.role : "",
        },
      ]}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Full Name"
            className="hide-content-multi"
          >
            <Input size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            className="hide-content-multi"
            rules={[
              {
                // required: true,
              },
              {
                pattern: /^((09|03|07|08|05)([0-9]{8}))$/g,
                message: "Phải đúng định dạng số điện thoại",
              },
            ]}
          >
            <Input size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dob"
            label="Date of birth"
            className="hide-content-multi"
          >
            <DatePicker
              placeholder="yy/mm/dd"
              size="large"
              dropdownClassName="date-picker"
              style={{ width: "100%" }}
              disabled={isEditDetail}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label="Address"
            className="hide-content-multi"
          >
            <Input size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="username"
            label="User Name"
            className="hide-content-multi"
          >
            <Input size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="role" label="Role" className="hide-content-multi">
            <Input size="large" disabled={isEditDetail} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
