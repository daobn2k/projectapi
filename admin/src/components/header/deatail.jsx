import React, { useEffect } from "react";
import { Form, Input, Row, Col, DatePicker } from "antd";
import { getUserbyId } from "../../axios";
import moment from "moment";
export default function DeatailProfile({ userInfo }) {
  const [info, setInfo] = React.useState({});
  useEffect(() => {
    getUserbyId(userInfo.id)
      .then((res) => {
        setInfo(res.data);
      })
      .catch();
  }, []);

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
          value: info ? info.name : "",
        },
        {
          name: ["username"],
          value: info ? info.username : "",
        },
        {
          name: ["dob"],
          value: info ? moment(info.dob) : "",
        },
        {
          name: ["email"],
          value: info ? info.email : "",
        },
        {
          name: ["phone"],
          value: info ? info.phone : "",
        },
        {
          name: ["address"],
          value: info ? info.address : "",
        },
        {
          name: ["role"],
          value: info ? info.role : "",
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
            <Input size="large" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Phone" className="hide-content-multi">
            <Input size="large" disabled={true} />
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
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label="Address"
            className="hide-content-multi"
          >
            <Input size="large" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="username"
            label="User Name"
            className="hide-content-multi"
          >
            <Input size="large" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="role" label="Role" className="hide-content-multi">
            <Input size="large" disabled={true} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
