import React, { Fragment, useState ,useEffect} from "react";
import { Form, Input, Row, Col, DatePicker, Button ,Select } from "antd";
import moment from "moment";
import { getDataDeaprtment } from "../../axios/department";
import { getDataEducation } from "../../axios/education";
import { getDataRole } from "../../axios/role";
import * as _ from "lodash" 
const { Option } = Select;

export default function DeatailProfile({
  userInfo,
  isEdit,
  editProfile,
  onCancel,
}) {
  const [listRole, setListRole] = useState([])
  const [listEducation, setListEducation] = useState([])
  const [listDepartment, setListDepartment] = useState([])
  
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

  useEffect(() => {
    getDataListDeaprtment()
    getDataListEducation()
    getDataListRole()
  }, [])

  const getDataListDeaprtment = async () => {
    const result = await getDataDeaprtment()
    if (result.status === 200) {
      setListDepartment(result.data.data)
    }
  }
  const getDataListEducation = async () => {
    const result = await getDataEducation()
    if (result.status === 200) {
      setListEducation(result.data.data)
    }
  }
  const getDataListRole = async () => {
    const result = await getDataRole()
    if (result.status === 200) {
      setListRole(result.data.data)
    }
  }
  const handleSearch = () =>{}
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
        {
          name:["education_id"],
          value:userInfo.education_id && userInfo.education_id._id ? userInfo.education_id._id : "",
        },
        {
          name:["department_id"],
          value:userInfo.department_id && userInfo.department_id._id ? userInfo.department_id._id : "",
        },
        {
          name:["role_id"],
          value:userInfo.role_id && userInfo.role_id._id ? userInfo.role_id._id : "",
        }
      ]}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Họ và tên"
            className="hide-content-multi"
          >
            <Input size="large" disabled={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Số điện thoại" className="hide-content-multi">
            <Input size="large" disabled={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dob"
            label="Ngày sinh"
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
            label="Địa chỉ"
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
          <Form.Item name="role_id" label="Chức vụ" className="hide-content-multi">
             <Select
                showSearch
                placeholder="Chọn chức vụ"
                onSearch={handleSearch}
                allowClear
                disabled={isEdit}
              >
                {
                  !_.isEmpty(listRole) && listRole.map((item, index) => {
                    return (
                      <Option value={item._id} key={index}>{item.name}</Option>
                    )
                  })
                }
              </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="department_id" label="Phòng ban" className="hide-content-multi">
              <Select
                showSearch
                placeholder="Chọn chức vụ"
                onSearch={handleSearch}
                allowClear
                disabled={isEdit}
              >
                {
                  !_.isEmpty(listDepartment) && listDepartment.map((item, index) => {
                    return (
                      <Option value={item._id} key={index}>{item.name}</Option>
                    )
                  })
                }
              </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="education_id" label="Trình độ" className="hide-content-multi">
              <Select
                showSearch
                placeholder="Chọn trình độ học vấn"
                onSearch={handleSearch}
                allowClear
                disabled={isEdit}
              >
                {
                  !_.isEmpty(listEducation) && listEducation.map((item, index) => {
                    return (
                      <Option value={item._id} key={index}>{item.name}</Option>
                    )
                  })
                }
              </Select>
          </Form.Item>
        </Col>
        <Col span={24} className="col-24">
          {}
          {!isEdit && (
            <Fragment>
              <Form.Item className="hide-content-multi">
                <Button className="button_save" htmlType="submit" >
                  Lưu
                </Button>
              </Form.Item>
              <Form.Item className="hide-content-multi">
                <Button className="button_cancel" onClick={onCancel}>
                  Hủy bỏ
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Col>
      </Row>
    </Form>
  );
}
