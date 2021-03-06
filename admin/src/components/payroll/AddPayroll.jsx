// eslint-disable-next-line
import { Button, Input, Form, DatePicker, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getPayrollDetail, GetUser, getUserbyId } from '../../axios';
import { useHistory, useLocation } from 'react-router-dom';
import './customer.css';
import moment from 'moment';
import BreadcrumbComponent from '../BreadcrumbComponent';
import * as _ from 'lodash';
import { createPayRoll, getDataCreatePayRoll } from '../../axios/payroll';
import { parseMoney } from '../../shared';
import { store } from '../../storage';

const { Option } = Select;

export default function AddPayRoll() {
    const [listUser, setListUser] = useState([]);
    const [valueChooseUser, setValueChooseUser] = useState();
    const location = useLocation();
    const currentAccount = store.getCurentUser();
    const history = useHistory();
    const { state } = location;

    const [form] = Form.useForm();

    useEffect(() => {
        if (state && state.id) {
            getPayrollDetail(state.id)
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
        console.log(data,"<<<-----detail");

        listKey.forEach((item) => {
            const keySplit = item.split('_')
            console.log(keySplit);
            if (typeof data[item] === 'object') {
                const valueSet = {
                    [item]: data[item] && data[item]._id ? data[item]._id : '',
                };
                return form.setFieldsValue(valueSet);
            }
            if(keySplit[keySplit.length - 1] === 'date' || item ==='in_month'){
                const valueSet = {
                    [item]: data[item] ? moment(data[item],"MM") : ''
                };
                return form.setFieldsValue(valueSet);
            }
            
            if (typeof data[item] === 'string' || typeof data[item] === 'number') {
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

    const checkTimeWorking = (total) => {
        if(total > 8 * 60) return 8 * 60
        return total
    }
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
                )
                total_time = total_time  + checkTimeWorking(time)
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
          salary_daily,
          salary:parseInt(detailUser.salary)
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
        if(Number.isInteger(Math.floor(number))){
            return false
        }
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

    const onFinish = (data) => {

        const payload = {
            ...valueChooseUser,
            in_month:moment(data.in_month).format("MM"),
            salary_bonus:parseInt(data.salary_bonus),
            user_id:data.user_id,
            create_by_id:data.create_by_id,
        }
        createPayRoll(payload).then((res) => {
            notification.success({
                description: "T???o m???i t??nh l????ng th??nh c??ng",
                placement: "topRight",
              });
              history.push({
                pathname: "/payroll/list",
              });
        }).catch((err) => {
            notification.error({
                message: `Th??ng b??o t???o m???i`,
                description: "T???o m???i t??nh l????ng th???t b???i",
                placement: "topRight",
            });
        }).finally((f) => {
            console.log("f",f)
        })
    };
    return (
        <div>
            <BreadcrumbComponent
                title="B???ng"
                descriptionTitle={
                    state && state.id
                        ? 'Ch???nh s???a th??ng tin l????ng nh??n vi??n'
                        : 'T???o m???i l????ng nh??n vi??n'
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
                            label="T??n nh??n vi??n"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng ch???n nh??n vi??n',
                                },
                            ]}
                            name="user_id"
                        >
                            <Select
                                showSearch
                                placeholder="Ch???n nh??n vi??n"
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
                                        'Vui l??ng ??i???n l????ng c?? b???n nh??n vi??n',
                                },
                            ]}
                            name="salary"
                            label="L????ng c?? b???n"
                        >
                            <Input
                                size="large"
                                placeholder="??i???n l????ng c?? b???n"
                                maxLength={256}
                                disabled={true}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item label="L????ng c???a th??ng" name="in_month">
                            <DatePicker
                                picker="month"
                                style={{ width: '100%' }}
                                size="large"
                                placeholder="L????ng th??ng"
                                format={'MM'}
        
                            />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                () => ({
                                    required:true,
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(
                                                new Error(
                                                    'Vui l??ng ??i???n t???ng s??? gi??? l??m vi???c'
                                                )
                                            );
                                        }
                                        if (value && validateNumber(value)) {
                                            return Promise.reject(
                                                new Error(
                                                    'Vui l??ng ??i???n ????ng ?????nh d???ng s???'
                                                )
                                            );
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                            name="total_working_time"
                            label="T???ng s??? gi??? l??m vi???c"
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
                            label="L????ng ng??y trong th??ng"
                        >
                            <Input
                                size="large"
                                placeholder="??i???n c??ng chu???n"
                                maxLength={256}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item
                            name="salary_bonus"
                            label="L????ng th?????ng th??m"
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && validateNumber(value)) {
                                            return Promise.reject(
                                                new Error(
                                                    'Vui l??ng ??i???n ????ng ?????nh d???ng s???'
                                                )
                                            );
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="??i???n l????ng th?????ng th??m"
                                maxLength={256}
                                disabled={isDisabled}
                                onChange={(e)=>handleChangeBonus(e.target.value)}

                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="filed" className="group-form--item">
                        <Form.Item name="total_money" label="L????ng th???c nh???n">
                            <Input
                                size="large"
                                placeholder="0"
                                maxLength={256}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ng?????i t???o b???ng l????ng"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui l??ng ch???n ng?????i t???o b???ng l????ng',
                                },
                            ]}
                            name="create_by_id"
                            disabled={true}
                        >
                            <Select
                                showSearch
                                placeholder="Ch???n ng?????i t???o b???ng l????ng"
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
                            {state && state.id ? 'Ch???nh s???a' : 'T???o m???i'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
