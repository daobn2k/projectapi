// eslint-disable-next-line
import { Button, Input, Form, DatePicker, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getRequestById, GetUser } from '../../axios';
import { useHistory, useLocation } from 'react-router-dom';
import './request.css';
import moment from 'moment';
import BreadcrumbComponent from '../BreadcrumbComponent';
import * as _ from 'lodash';
import { store } from '../../storage';
import { addRequest, updateRequest } from '../../axios/request';

const { Option } = Select;
const { TextArea } = Input;

export default function AddRequest() {
    const dataUser = store.getCurentUser();
    const [listUser, setListUser] = useState([]);
    const history = useHistory();
    const location = useLocation();
    console.log(listUser, 'listUser');
    const { state } = location;

    const [form] = Form.useForm();

    useEffect(() => {
        if (state && state.id) {
            getRequestById(state.id)
                .then((res) => {
                    const { data, status } = res;
                    if (status === 200) {
                        const listKey = Object.keys(data.data);
                        handleSetData(listKey, res.data.data);
                    }
                })
                .catch((err) => {});
        }
    }, [state]);

    const handleSetData = (listKey, data) => {
        listKey.forEach((item) => {
            if (typeof data[item] === 'object') {
                const valueSet = {
                    [item]: data[item] && data[item]._id ? data[item]._id : '',
                };
                return form.setFieldsValue(valueSet);
            }
            if (item === 'from_date' || item === 'end_date' || item === 'create_date') {
                const valueSet = {
                    [item]: data && data[item] ? moment(data[item]) : '',
                };
                return form.setFieldsValue(valueSet);
            }
            if (
                typeof data[item] === 'string' &&
                item !== 'create_date' &&
                item !== 'end_date' &&
                item !== 'from_date'
            ) {
                const valueSet = {
                    [item]: data && data[item] ? data[item] : '',
                };
                return form.setFieldsValue(valueSet);
            }
        });
    };
    useEffect(() => {
        getDataListUser();
    }, []);

    const getDataListUser = async () => {
        const result = await GetUser();
        if (result.status === 200) {
            setListUser(result.data.data);
        }
    };
    const onFinish = (data) => {
        const dataSubmit = { ...data, role: '1' };
        if (state && state.id) {
            updateRequest(state.id, dataSubmit)
                .then((res) => {
                    notification.success({
                        message: `Thông báo cật nhập`,
                        description: ' Cập nhật thông tin thành công',
                        placement: 'topRight',
                    });
                })
                .catch((err) => {
                    notification.error({
                        message: `Thông báo cật nhập`,
                        description: 'Có lỗi xảy ra khi cập nhật thông tin',
                        placement: 'topRight',
                    });
                });
        } else {
            addRequest(dataSubmit)
                .then((res) => {
                    if (res.status === 200) {
                        notification.success({
                            message: `Thông báo tạo mới`,
                            description: 'Tạo mới công việc thành công',
                            placement: 'topRight',
                        });
                        history.push({
                            pathname: '/request/list',
                        });
                    }
                })
                .catch((err) => {
                    notification.error({
                        message: `Thông báo tạo mới`,
                        description: 'Vui lòng kiểm tra lại thông tin',
                        placement: 'topRight',
                    });
                });
        }
    };

    const onSearch = (event) => {
        console.log('event', event);
    };

    const handleSearch = _.debounce(onSearch, 700);
    return (
        <div>
            <BreadcrumbComponent
                title="Nhân viên"
                descriptionTitle={
                    state && state.id ? 'Chỉnh sửa thông tin công việc' : 'Tạo mới công việc'
                }
            />
            <div className="FormAddCustomer" style={{ display: 'flex' }}>
                <Form
                    form={form}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    name="nest-messages"
                    onFinish={onFinish}
                    fields={[
                        {
                            name: ['create_by_id'],
                            value: dataUser ? dataUser._id : '',
                        },
                        {
                            name: ['department_id'],
                            value: dataUser ? dataUser.department_id : '',
                        },
                    ]}
                >
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item name="name" label="Người thực hiện">
                            <Select
                                showSearch
                                placeholder="Chọn công việc"
                                onSearch={handleSearch}
                                allowClear
                            >
                                {!_.isEmpty(listRequestDefault) &&
                                    listRequestDefault.map((item, index) => {
                                        return (
                                            <Option value={item.label} key={index}>
                                                {item.label}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="user_id" label="Người thực hiện">
                            <Select
                                showSearch
                                placeholder="Chọn người thực hiện"
                                onSearch={handleSearch}
                                allowClear
                            >
                                {!_.isEmpty(listUser) &&
                                    listUser.map((item, index) => {
                                        return (
                                            <Option value={item._id} key={index}>
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item
                            name="from_date"
                            label="Từ ngày"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn bắt đầu công việc"
                                size="large"
                                disabledDate={(current) => {
                                    let customDate = moment().format('YYYY-MM-DD');
                                    return current && current < moment(customDate, 'YYYY-MM-DD');
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="end_date"
                            label="Đến ngày"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn kết thúc công việc"
                                size="large"
                                disabledDate={(current) => {
                                    let customDate = moment().format('YYYY-MM-DD');
                                    return current && current < moment(customDate, 'YYYY-MM-DD');
                                }}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item
                            label="Người giao việc"
                            rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
                            name="create_by_id"
                        >
                            <Select
                                showSearch
                                placeholder="Chọn người giao việc"
                                onSearch={handleSearch}
                                allowClear
                                disabled={true}
                                suffixIcon={false}
                            >
                                {!_.isEmpty(listUser) &&
                                    listUser.map((item, index) => {
                                        return (
                                            <Option value={item._id} key={index}>
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                        {/* <Form.Item
              label="Phòng ban giao việc"
              rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
              name="department_id"
            >
              <Select
                showSearch
                placeholder="Chọn phòng ban giao"
                onSearch={handleSearch}
                allowClear
                disabled={true}
                suffixIcon={false}
              >
                {!_.isEmpty(listDepartment) &&
                  listDepartment.map((item, index) => {
                    return (
                      <Option value={item._id} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item> */}
                    </Form.Item>
                    <Form.Item name="description" label="Thông tin mô tả" className="item-area">
                        <TextArea
                            style={{ borderRadius: '4px', cursor: 'pointer' }}
                            placeholder="Điền thông tin mô tả"
                            maxLength={4000}
                            autoSize={{ minRows: 5, maxRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item className="item-button">
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '50%',
                                height: '40px',
                                borderRadius: '4px',
                                fontSize: '16px',
                                maxWidth: 256,
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

const listRequestDefault = [
   
    {
        id: 2,
        value: 2,
        label: 'Tham gia hỗ trợ dự án',
    },
    {
        id: 3,
        value: 3,
        label: 'Chuyên viên ReactJS',
    },
    {
        id: 4,
        value: 4,
        label: 'Chuyên viên VueJs',
    },
    {
        id: 5,
        value: 5,
        label: 'Chuyên viên VueJs',
    },
    {
        id: 6,
        value: 6,
        label: 'Thống kê nhân sự',
    },
    {
        id: 7,
        value: 7,
        label: 'Điều hành dự án',
    },
    {
      id: 1,
      value: 1,
      label: 'Tính lương',
  },
];
