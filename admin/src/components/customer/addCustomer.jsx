// eslint-disable-next-line
import {
  Button,
  Input,
  Form,
  DatePicker,
  notification,
  Select
} from "antd";
import React, { useEffect, useState } from "react";
import { getUserbyId } from "../../axios";
import { useHistory, useLocation } from "react-router-dom";
import { addNewAccount, UpdateAccount } from "../../axios/account";
import "./customer.css";
import moment from "moment";
import BreadcrumbComponent from "../BreadcrumbComponent";
import * as _ from 'lodash'
import { listCertiFicate, listGender } from "../../shared";
import { getDataDeaprtment } from "../../axios/department";
import { getDataEducation } from "../../axios/education";
const { Option } = Select;
const { TextArea } = Input;

export default function AddCustomer() {
  const [listDepartment, setListDepartment] = useState([])
  const [listEducation, setListEducation] = useState([])
  const history = useHistory();
  const location =useLocation();

  const { state} = location

  const [form] = Form.useForm();

  useEffect(() => {
    if (state && state.id) {
      getUserbyId(state.id)
        .then((res) => {
          const { data ,status} = res
          if(status === 200){
            const listKey = Object.keys(data.data)
            handleSetData(listKey,res.data.data)
          }
        })
        .catch((err) => { });
    }
  }, [state]);

  const handleSetData = (listKey,data) => {
    
    listKey.forEach(item => {

      if(typeof data[item] === 'object'){
        const valueSet = {
          [item]: data[item] && data[item]._id ? data[item]._id : "",
        }
      return  form.setFieldsValue(valueSet);
      }
      if(item === 'dob'){
        const valueSet = {
          [item]: data && data[item]   ?  moment(data[item]) : "",
        }
      return  form.setFieldsValue(valueSet)
      }
      if(typeof data[item] !== 'object' && item !== 'create_date' && item !== 'dob'){
        const valueSet = {
          [item]: data && data[item] ? data[item] : "",
        }
      return  form.setFieldsValue(valueSet);
      }
    });
  }
  useEffect(() => {
    getDataListDeaprtment()
    getDataListEducation()
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
  const onFinish = (data) => {
    // const { avatar } = currentData
    const dataSubmit = { ...data, role: '1' }
    if (state && state.id) {
      UpdateAccount(state.id, dataSubmit)
        .then((res) => {
          notification.success({
            message: `Thông báo cật nhập`,
            description: " Cập nhật thông tin thành công",
            placement: "topRight",
          });
        })
        .catch((err) => {
          notification.error({
            message: `Thông báo cật nhập`,
            description: "Có lỗi xảy ra khi cập nhật thông tin",
            placement: "topRight",
          });
        });
    } else {
      addNewAccount(dataSubmit)
        .then((res) => {
          if (res.status === 200) {
            notification.success({
              message: `Thông báo tạo mới`,
              description: "Tạo mới nhân viên thành công",
              placement: "topRight",
            });
            history.push({
              pathname: "/customer/list",
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `Thông báo tạo mới`,
            description: "Vui lòng kiểm tra lại thông tin",
            placement: "topRight",
          });
        });
    }
  };

  const onSearch = (event) => {
    console.log("event", event)
  }

  const handleSearch = _.debounce(onSearch, 700)
  return (
    <div>
      <BreadcrumbComponent title="Nhân viên" descriptionTitle=
        {state && state.id ? "Chỉnh sửa thông tin nhân viên" : "Tạo mới nhân viên"}
      />
      <div className="FormAddCustomer" style={{ display: "flex" }}>
        <Form
          form={form}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền thông tin tài khoản",
                },
                {
                  maxLength: 256,
                  message: "Điền thông tin dưới 256 kí tự"
                }
              ]}
              hasFeedback
              name="username"
              label="Tài khoản"
            >
              <Input size="large" placeholder="Điền tài khoản tạo mới" maxLength={256} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng thông tin mật khẩu",
                },
                {
                  maxLength: 256,
                  message: "Điền thông tin dưới 256 kí tự"
                }
              ]}
              hasFeedback
              name="password"
              label="Mật khẩu"
            >
              <Input.Password size="large" placeholder="Điền mật khẩu tạo mới" maxLength={256} allowClear />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ họ và tên",
                },
                {
                  maxLength: 256,
                  message: "Điền thông tin dưới 256 kí tự"
                }
              ]}
              hasFeedback
              name="name"
              label="Họ và tên"
            >
              <Input size="large" placeholder="Điền đầy đủ họ và tên" maxLength={256} />
            </Form.Item>
            <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày sinh" size="large" />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ họ và tên",
                },
                {
                  maxLength: 256,
                  message: "Điền thông tin dưới 256 kí tự"
                }
              ]}
              hasFeedback
              name="sex"
              label="Giới tính"
            >
              <Select
                showSearch
                placeholder="Chọn loại bằng cấp"
                onSearch={handleSearch}
                allowClear
              >
                {
                  listGender.map((item, index) => {
                    return (
                      <Option value={item.label} key={index}>{item.label}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng điền số điện thoại" },
                { max: 11, message: 'Số điẹn thoại không được vượt quá 11 kí tự' }
              ]}
            >
              <Input size="large" style={{ borderRadius: "4px", cursor: "pointer" }} placeholder="Điền số điện thoại" />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Vui lòng nhập lại không đúng định dạng email",
                },
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}

            >
              <Input size="large" style={{ borderRadius: "4px", cursor: "pointer" }} maxLength={256} placeholder="Điền thông tin email" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input size="large" style={{ borderRadius: "4px", cursor: "pointer" }} placeholder="Điền thông tin địa chỉ" />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item label="Phòng ban" rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]} name="department_id">
              <Select
                showSearch
                placeholder="Chọn phòng ban"
                onSearch={handleSearch}
                allowClear
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
            <Form.Item label="Chức vụ" rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]} name="role_id">
              <Select
                showSearch
                placeholder="Chọn chức vụ"
                onSearch={handleSearch}
                allowClear
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
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
          <Form.Item label="Trình độ học vấn" rules={[{ required: true, message: 'Vui lòng chọn trình độ học vấn' }]} name="education_id">
              <Select
                showSearch
                placeholder="Chọn trình độ học vấn"
                onSearch={handleSearch}
                allowClear
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
            <Form.Item label="Loại bằng cấp" rules={[{ required: true, message: 'Vui lòng chọn loại bằng cấp' }]} name="certificate">
              <Select
                showSearch
                placeholder="Chọn loại bằng cấp"
                onSearch={handleSearch}
                allowClear
              >
                {
                  listCertiFicate.map((item, index) => {
                    return (
                      <Option value={item.label} key={index}>{item.label}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="description"
            label="Thông tin mô tả"
            className="item-area"
          >
            <TextArea style={{ borderRadius: "4px", cursor: "pointer" }} placeholder="Điền thông tin mô tả" maxLength={4000} autoSize={{ minRows: 5, maxRows: 5 }} />
          </Form.Item>
          <Form.Item className="item-button">
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "50%",
                height: "40px",
                borderRadius: "4px",
                fontSize: "16px",
                maxWidth:256,
              }}
            >
              {state && state.id ? 'Chỉnh sửa' : 'Tạo mới'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
