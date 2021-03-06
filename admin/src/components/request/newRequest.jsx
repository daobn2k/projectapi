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
                        message: `Th??ng b??o c???t nh???p`,
                        description: ' C???p nh???t th??ng tin th??nh c??ng',
                        placement: 'topRight',
                    });
                })
                .catch((err) => {
                    notification.error({
                        message: `Th??ng b??o c???t nh???p`,
                        description: 'C?? l???i x???y ra khi c???p nh???t th??ng tin',
                        placement: 'topRight',
                    });
                });
        } else {
            addRequest(dataSubmit)
                .then((res) => {
                    if (res.status === 200) {
                        notification.success({
                            message: `Th??ng b??o t???o m???i`,
                            description: 'T???o m???i c??ng vi???c th??nh c??ng',
                            placement: 'topRight',
                        });
                        history.push({
                            pathname: '/request/list',
                        });
                    }
                })
                .catch((err) => {
                    notification.error({
                        message: `Th??ng b??o t???o m???i`,
                        description: 'Vui l??ng ki???m tra l???i th??ng tin',
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
                title="Nh??n vi??n"
                descriptionTitle={
                    state && state.id ? 'Ch???nh s???a th??ng tin c??ng vi???c' : 'T???o m???i c??ng vi???c'
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
                        <Form.Item name="name" label="Ng?????i th???c hi???n">
                            <Select
                                showSearch
                                placeholder="Ch???n c??ng vi???c"
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
                        <Form.Item name="user_id" label="Ng?????i th???c hi???n">
                            <Select
                                showSearch
                                placeholder="Ch???n ng?????i th???c hi???n"
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
                            label="T??? ng??y"
                            rules={[{ required: true, message: 'Vui l??ng ch???n ng??y b???t ?????u' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                                placeholder="Ch???n b???t ?????u c??ng vi???c"
                                size="large"
                                disabledDate={(current) => {
                                    let customDate = moment().format('YYYY-MM-DD');
                                    return current && current < moment(customDate, 'YYYY-MM-DD');
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="end_date"
                            label="?????n ng??y"
                            rules={[{ required: true, message: 'Vui l??ng ch???n ng??y k???t th??c' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                                placeholder="Ch???n k???t th??c c??ng vi???c"
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
                            label="Ng?????i giao vi???c"
                            rules={[{ required: true, message: 'Vui l??ng ch???n ch???c v???' }]}
                            name="create_by_id"
                        >
                            <Select
                                showSearch
                                placeholder="Ch???n ng?????i giao vi???c"
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
              label="Ph??ng ban giao vi???c"
              rules={[{ required: true, message: "Vui l??ng ch???n ph??ng ban" }]}
              name="department_id"
            >
              <Select
                showSearch
                placeholder="Ch???n ph??ng ban giao"
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
                    <Form.Item name="description" label="Th??ng tin m?? t???" className="item-area">
                        <TextArea
                            style={{ borderRadius: '4px', cursor: 'pointer' }}
                            placeholder="??i???n th??ng tin m?? t???"
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
                            {state && state.id ? 'Ch???nh s???a' : 'T???o m???i'}
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
        label: 'Tham gia h??? tr??? d??? ??n',
    },
    {
        id: 3,
        value: 3,
        label: 'Chuy??n vi??n ReactJS',
    },
    {
        id: 4,
        value: 4,
        label: 'Chuy??n vi??n VueJs',
    },
    {
        id: 5,
        value: 5,
        label: 'Chuy??n vi??n VueJs',
    },
    {
        id: 6,
        value: 6,
        label: 'Th???ng k?? nh??n s???',
    },
    {
        id: 7,
        value: 7,
        label: '??i???u h??nh d??? ??n',
    },
    {
      id: 1,
      value: 1,
      label: 'T??nh l????ng',
  },
];
