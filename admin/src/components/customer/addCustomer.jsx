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
import { getDataRole } from "../../axios/role";
const { Option } = Select;
const { TextArea } = Input;

export default function AddCustomer() {
  const [listDepartment, setListDepartment] = useState([])
  const [listEducation, setListEducation] = useState([])
  const [listRole, setListRole] = useState([])
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
  const onFinish = (data) => {
    // const { avatar } = currentData
    const dataSubmit = { ...data, role: '1' }
    if (state && state.id) {
      UpdateAccount(state.id, dataSubmit)
        .then((res) => {
          notification.success({
            message: `Th??ng b??o c???t nh???p`,
            description: " C???p nh???t th??ng tin th??nh c??ng",
            placement: "topRight",
          });
        })
        .catch((err) => {
          notification.error({
            message: `Th??ng b??o c???t nh???p`,
            description: "C?? l???i x???y ra khi c???p nh???t th??ng tin",
            placement: "topRight",
          });
        });
    } else {
      addNewAccount(dataSubmit)
        .then((res) => {
          if (res.status === 200) {
            if(res.data && res.data.ERROR_MESSAGE){
              return   notification.error({
                message: `Th??ng b??o t???o m???i`,
                description: res.data.ERROR_MESSAGE,
                placement: "topRight",
              });
            }
            notification.success({
              message: `Th??ng b??o t???o m???i`,
              description: "T???o m???i nh??n vi??n th??nh c??ng",
              placement: "topRight",
            });
            history.push({
              pathname: "/customer/list",
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `Th??ng b??o t???o m???i`,
            description: "Vui l??ng ki???m tra l???i th??ng tin",
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
      <BreadcrumbComponent title="Nh??n vi??n" descriptionTitle=
        {state && state.id ? "Ch???nh s???a th??ng tin nh??n vi??n" : "T???o m???i nh??n vi??n"}
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
                  message: "Vui l??ng ??i???n th??ng tin t??i kho???n",
                },
                {
                  maxLength: 256,
                  message: "??i???n th??ng tin d?????i 256 k?? t???"
                }
              ]}
              hasFeedback
              name="username"
              label="T??i kho???n"
            >
              <Input size="large" placeholder="??i???n t??i kho???n t???o m???i" maxLength={256} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui l??ng th??ng tin m???t kh???u",
                },
                {
                  maxLength: 256,
                  message: "??i???n th??ng tin d?????i 256 k?? t???"
                }
              ]}
              hasFeedback
              name="password"
              label="M???t kh???u"
            >
              <Input.Password size="large" placeholder="??i???n m???t kh???u t???o m???i" maxLength={256} allowClear />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ??i???n ?????y ????? h??? v?? t??n",
                },
                {
                  maxLength: 256,
                  message: "??i???n th??ng tin d?????i 256 k?? t???"
                }
              ]}
              name="name"
              label="H??? v?? t??n"
            >
              <Input size="large" placeholder="??i???n ?????y ????? h??? v?? t??n" maxLength={256} />
            </Form.Item>
            <Form.Item name="dob" label="Ng??y sinh" rules={[{ required: true, message: 'Vui l??ng ch???n ng??y sinh' }]}>
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Ch???n ng??y sinh" size="large" />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n gi???i t??nh",
                },
                {
                  maxLength: 256,
                  message: "??i???n th??ng tin d?????i 256 k?? t???"
                }
              ]}
              name="sex"
              label="Gi???i t??nh"
            >
              <Select
                showSearch
                placeholder="Ch???n lo???i b???ng c???p"
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
              label="S??? ??i???n tho???i"
              rules={[
                { required: true, message: "Vui l??ng ??i???n s??? ??i???n tho???i" },
                { max: 11, message: 'S??? ??i???n tho???i kh??ng ???????c v?????t qu?? 11 k?? t???' }
              ]}
            >
              <Input size="large" style={{ borderRadius: "4px", cursor: "pointer" }} placeholder="??i???n s??? ??i???n tho???i" />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Vui l??ng nh???p l???i kh??ng ????ng ?????nh d???ng email",
                },
                {
                  required: true,
                  message: "Vui l??ng nh???p email",
                },
              ]}

            >
              <Input size="large" style={{ borderRadius: "4px", cursor: "pointer" }} maxLength={256} placeholder="??i???n th??ng tin email" />
            </Form.Item>
            <Form.Item
              name="address"
              label="?????a ch???"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ?????a ch???",
                },
              ]}
            >
              <Input size="large" style={{ borderRadius: "4px", cursor: "pointer" }} placeholder="??i???n th??ng tin ?????a ch???" />
            </Form.Item>
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
            <Form.Item label="Ph??ng ban" rules={[{ required: true, message: 'Vui l??ng ch???n ph??ng ban' }]} name="department_id">
              <Select
                showSearch
                placeholder="Ch???n ph??ng ban"
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
            <Form.Item label="Ch???c v???" rules={[{ required: true, message: 'Vui l??ng ch???n ch???c v???' }]} name="role_id">
              <Select
                showSearch
                placeholder="Ch???n ch???c v???"
                onSearch={handleSearch}
                allowClear
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
          </Form.Item>
          <Form.Item name='filed' className="group-form--item">
          <Form.Item label="Tr??nh ????? h???c v???n" rules={[{ required: true, message: 'Vui l??ng ch???n tr??nh ????? h???c v???n' }]} name="education_id">
              <Select
                showSearch
                placeholder="Ch???n tr??nh ????? h???c v???n"
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
            <Form.Item label="Lo???i b???ng c???p" rules={[{ required: true, message: 'Vui l??ng ch???n lo???i b???ng c???p' }]} name="certificate">
              <Select
                showSearch
                placeholder="Ch???n lo???i b???ng c???p"
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
          <Form.Item name='filed' className="group-form--item">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ??i???n l????ng c?? b???n nh??n vi??n",
                },
              ]}
              hasFeedback
              name="salary"
              label="L????ng c?? b???n"
            >
              <Input size="large" placeholder="??i???n l????ng c?? b???n" maxLength={256} />
            </Form.Item>
            <Form.Item
              name="school"
              label="Tr?????ng h???c"
            >
              <Input size="large" placeholder="??i???n th??ng tin tr?????ng h???c" maxLength={256}  />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="description"
            label="Th??ng tin m?? t???"
            className="item-area"
          >
            <TextArea style={{ borderRadius: "4px", cursor: "pointer" }} placeholder="??i???n th??ng tin m?? t???" maxLength={4000} autoSize={{ minRows: 5, maxRows: 5 }} />
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
              {state && state.id ? 'Ch???nh s???a' : 'T???o m???i'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
