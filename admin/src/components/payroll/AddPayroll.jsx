// eslint-disable-next-line
import { Button, Input, Form, DatePicker, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetUser, getUserbyId } from '../../axios';
import { useHistory, useLocation } from 'react-router-dom';
import { addNewAccount, UpdateAccount } from '../../axios/account';
import './customer.css';
import moment from 'moment';
import BreadcrumbComponent from '../BreadcrumbComponent';
import * as _ from 'lodash';
import { getDataCreatePayRoll } from '../../axios/payroll';
import { parseMoney } from '../../shared';
import { store } from '../../storage';

const { Option } = Select;

export default function AddPayRoll() {
    const [listUser, setListUser] = useState([]);
    const [valueChooseUser, setValueChooseUser] = useState();
    const history = useHistory();
    const location = useLocation();
    const currentAccount = store.getCurentUser();

    const { state } = location;

    const [form] = Form.useForm();

    useEffect(() => {
        if (state && state.id) {
            getUserbyId(state.id)
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
            if (item === 'dob') {
                const valueSet = {
                    [item]: data && data[item] ? moment(data[item]) : '',
                };
                return form.setFieldsValue(valueSet);
            }
            if (
                typeof data[item] !== 'object' &&
                item !== 'create_date' &&
                item !== 'dob'
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
        // const { avatar } = currentData
        const dataSubmit = { ...data, role: '1' };
        if (state && state.id) {
            UpdateAccount(state.id, dataSubmit)
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
            addNewAccount(dataSubmit)
                .then((res) => {
                    if (res.status === 200) {
                        notification.success({
                            message: `Thông báo tạo mới`,
                            description: 'Tạo mới nhân viên thành công',
                            placement: 'topRight',
                        });
                        history.push({
                            pathname: '/customer/list',
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
    const [idUser, setIdUser] = useState();

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (idUser) {
            setIsDisabled(false);
            handleGetDataCR(idUser);
        } else {
            setIsDisabled(true);
            form.resetFields();
        }
    }, [idUser]);
    const handleChange = (e) => {
        setIdUser(e);
    };

    const handleGetDataCR = async (id) => {
        const result = await getDataCreatePayRoll({ id: id });

        const { data = {} } = result.data;

        handlerShowDataCreatePR(data);
    };

    const handlerShowDataCreatePR = (data = []) => {
        let total_time = 0;

        data.forEach((item) => {
            let time;
            const { end_date_time, start_date_time } = item;
            if (end_date_time && start_date_time) {
                time = Math.floor(
                    Math.abs(moment(end_date_time) - moment(start_date_time)) /
                        1000 /
                        60
                );

                total_time = total_time + time;
            }
        });

        const month = moment(form.getFieldValue('in_month')).format('MM');

        const totalDayInMonth = getDaysInMonth(month).length + 1;

        const detailUser = listUser.find((i) => i._id === idUser);

        const salary_daily = Math.round(
            parseInt(detailUser.salary) / totalDayInMonth
        );

        
        const total_working_time  = total_time / 60
        
        const valueSet = {
            salary: detailUser.salary
                ? parseMoney(parseInt(detailUser.salary))
                : 0,
            salary_daily: salary_daily ? parseMoney(salary_daily) : 0,
            total_money:
                total_time && salary_daily
                    ? parseMoney(Math.round((salary_daily / 8) * total_working_time ))
                    : 0,
            total_working_time: total_working_time,
            in_month: moment(new Date()),
        };

        
        Object.keys(valueSet).forEach((key) => {
            let value = {};

            value[key] = valueSet[key];

            return form.setFieldsValue(value);
        });

        setValueChooseUser({
          total_money:Math.round((salary_daily / 8) * total_working_time ),
          total_working_time,
          salary_daily
        })
    };

    const getDaysInMonth = (month) => {
        const year = moment().year();
        month--; // lets fix the month once, here and be done with it
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            // Exclude weekends
            var tmpDate = new Date(date);
            var weekDay = tmpDate.getDay(); // week day
            var day = tmpDate.getDate(); // day

            if (weekDay % 6) {
                // exclude 0=Sunday and 6=Saturday
                days.push(day);
            }

            date.setDate(date.getDate() + 1);
        }

        return days;
    };

    const validateNumber = (number) => {
        if (!/^[0-9]+$/.test(number)) {
            return true;
        }
        return false;
    };

    const handleChangeBonus = async(value) => {

      let total

     

      total = parseInt(value || 0) + parseInt(valueChooseUser.total_money)
       
      form.setFieldsValue({total_money:parseMoney(total)})
    }
    return (
        <div>
            <BreadcrumbComponent
                title="Bảng"
                descriptionTitle={
                    state && state.id
                        ? 'Chỉnh sửa thông tin lương nhân viên'
                        : 'Tạo mới lương nhân viên'
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
                        name: ["in_month"],
                        value: moment(new Date()),
                      },
                      {
                        name: ["create_by_id"],
                        value: currentAccount._id,
                      },
                    ]}
                >
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item
                            label="Tên nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn nhân viên',
                                },
                            ]}
                            name="user_id"
                        >
                            <Select
                                showSearch
                                placeholder="Chọn nhân viên"
                                onSearch={handleSearch}
                                allowClear
                                onChange={(e) => handleChange(e)}
                            >
                                {!_.isEmpty(listUser) &&
                                    listUser.map((item, index) => {
                                        return (
                                            <Option
                                                value={item._id}
                                                key={index}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng điền lương cơ bản nhân viên',
                                },
                            ]}
                            name="salary"
                            label="Lương cơ bản"
                        >
                            <Input
                                size="large"
                                placeholder="Điền lương cơ bản"
                                maxLength={256}
                                disabled={true}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item label="Lương của tháng" name="in_month">
                            <DatePicker
                                picker="month"
                                style={{ width: '100%' }}
                                size="large"
                                placeholder="Lương tháng"
                                format={'MM'}
        
                            />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(
                                                new Error(
                                                    'Vui lòng điền tổng số giờ làm việc'
                                                )
                                            );
                                        }
                                        if (value && validateNumber(value)) {
                                            return Promise.reject(
                                                new Error(
                                                    'Vui lòng điền đúng định dạng số'
                                                )
                                            );
                                        }
                                    },
                                }),
                            ]}
                            name="total_working_time"
                            label="Tổng số giờ làm việc"
                        >
                            <Input
                                size="large"
                                placeholder="0"
                                maxLength={256}
                                disabled={isDisabled}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item
                            name="salary_daily"
                            label="Lương ngày trong tháng"
                        >
                            <Input
                                size="large"
                                placeholder="Điền công chuẩn"
                                maxLength={256}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item
                            name="salary_bonus"
                            label="Lương thưởng thêm"
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && validateNumber(value)) {
                                            return Promise.reject(
                                                new Error(
                                                    'Vui lòng điền đúng định dạng số'
                                                )
                                            );
                                        }
                                    },
                                }),
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Điền lương thưởng thêm"
                                maxLength={256}
                                disabled={isDisabled}
                                onChange={(e)=>handleChangeBonus(e.target.value)}

                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item name="total_money" label="Lương thực nhận">
                            <Input
                                size="large"
                                placeholder="0"
                                maxLength={256}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Người tạo bảng lương"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng chọn người tạo bảng lương',
                                },
                            ]}
                            name="create_by_id"
                            disabled={true}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn người tạo bảng lương"
                                onSearch={handleSearch}
                                allowClear
                                onChange={(e) => handleChange(e)}
                                disabled={true}
                            >
                                {!_.isEmpty(listUser) &&
                                    listUser.map((item, index) => {
                                        return (
                                            <Option
                                                value={item._id}
                                                key={index}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
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