import React, { Fragment } from "react";
import { Form, Input, Row, Col, DatePicker, Button } from "antd";

import moment from "moment";
export default function DeatailProfile({
  userInfo,
  isEdit,
  editProfile,
  onCancel,
}) {
  const onFinish = (values) => {
    const date = moment(values.dob).format("YYYY/MM/DD");
    const data = {
      ...values,
      dob: date,
      image: userInfo.image,
      password: userInfo.password,
      username: userInfo.username,
    };
    editProfile(data);
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
          name: ["email"],
          value: userInfo ? userInfo.email : "",
        },
        {
          name: ["dob"],
          value: userInfo && moment(userInfo.dob),
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
            <Input size="large" disabled={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Phone" className="hide-content-multi">
            <Input size="large" disabled={isEdit} />
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
              disabled={isEdit}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label="Address"
            className="hide-content-multi"
          >
            <Input size="large" disabled={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="Email" className="hide-content-multi">
            <Input size="large" disabled={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="role" label="Role" className="hide-content-multi">
            <Input
              size="large"
              disabled={true}
              style={{ textTransform: "uppercase" }}
            />
          </Form.Item>
        </Col>
        <Col span={24} className="col-24">
          {}
          {!isEdit && (
            <Fragment>
              <Form.Item className="hide-content-multi">
                <Button className="button_save" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
              <Form.Item className="hide-content-multi">
                <Button className="button_cancel" onClick={onCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Col>
      </Row>
    </Form>
  );
}
