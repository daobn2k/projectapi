import React, { Fragment, useEffect } from "react";
import { Form, Input, Row, Col, DatePicker, Button } from "antd";
import { getUserbyId } from "../../axios";
import moment from "moment";
export default function DeatailProfile({
  userInfo,
  isEdit,
  editProfile,
  onCancel,
}) {
  const [info, setInfo] = React.useState({});
  useEffect(() => {
    getUserbyId(userInfo.id)
      .then((res) => {
        setInfo(res.data);
      })
      .catch();
  }, []);

  const onFinish = (values) => {
    const date = moment(values.dob).format("DD/MM/YYYY");
    const data = {
      ...values,
      dob: date,
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
          <Form.Item
            name="username"
            label="User Name"
            className="hide-content-multi"
          >
            <Input size="large" disabled={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="role" label="Role" className="hide-content-multi">
            <Input size="large" disabled={isEdit} />
          </Form.Item>
        </Col>
        <Col span={24} className="col-24">
        {

        } 
        {
          !isEdit && (
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
          )
        }
        
        </Col>
      </Row>
    </Form>
  );
}
