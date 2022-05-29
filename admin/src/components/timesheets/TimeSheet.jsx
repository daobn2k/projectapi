import { notification, Space, Table, Input, Spin, Typography } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { getDataTimeSheet, GetUser } from '../../axios';
import { LoadingOutlined } from '@ant-design/icons';
import {
    convertDataToOptions,
    convertTimeStampUTCToLocal,
    getHourMinuteTime,
} from '../../shared';
import AddNewDialogComponent from '../AddNewDialogComponent';
import { NotificationCommon } from '../../common/Notification';
import { store } from '../../storage';
import {
    createTimeSheet,
    deleteTimeSheet,
    updateTimeSheet,
} from '../../axios/timesheet';
import moment from 'moment';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';
import SelectComponent from '../../common/SelectComponent';
import ExportExcelComponent from '../ExportExcelComponent';
const { Search } = Input;
export default function TimeSheet() {
    const user = store.getCurentUser();
    const [data, setData] = useState();
    const [listUser, setListUser] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [dataExportExcel, setDataExportExcel] = useState([]);

    const [params, setParams] = useState({
        page: 1,
        perPage: 5,
        keyword: '',
    });
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    const columns = useMemo(() => {
        return [
            {
                title: 'Tên nhân viên',
                dataIndex: 'user_id',
                key: 'user_id',
                align: 'center',
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>
                            {item && item.name ? item.name : ''}
                        </Typography>
                    );
                },
            },
            {
                title: 'Giờ vào',
                dataIndex: 'start_date_time',
                key: 'start_date_time',
                align: 'center',
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>
                            {item
                                ? getHourMinuteTime(item, 'DD/MM/YYYY HH:mm:ss')
                                : ''}
                        </Typography>
                    );
                },
            },
            {
                title: 'Giờ ra',
                dataIndex: 'end_date_time',
                key: 'end_date_time',
                align: 'center',
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>
                            {item
                                ? getHourMinuteTime(item, 'DD/MM/YYYY HH:mm:ss')
                                : ''}
                        </Typography>
                    );
                },
            },
            {
                title: 'Ngày làm việc',
                dataIndex: 'create_date',
                key: 'create_date',
                width: 125,
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>
                            {convertTimeStampUTCToLocal(item)}
                        </Typography>
                    );
                },
            },
            {
                title: 'Thao tác',
                key: 'action',
                width: 100,
                render: (e) => (
                    <Space size="middle">
                        <AiOutlineEdit
                            key={e.id}
                            onClick={() => handleEdit(e)}
                        />
                        <PopupConfirmComponent
                            title="chấm công"
                            data={e}
                            handleDelete={handleDelete}
                        >
                            <AiFillDelete />
                        </PopupConfirmComponent>
                    </Space>
                ),
            },
        ];
    }, [data]);
    //   create_date: "2022-05-11T22:59:40.169Z"
    // start_date_time: "2022-05-11T23:37:55.081Z"
    // status: false
    // update_date: "2022-05-11T22:59:40.169Z"
    // user_id: "627019302e45982cbe2d2e06"
    // _id: "627c48d3d421ad514c3d941e"
    const dataForm = useMemo(() => {
        return [
            {
                itemForm: {
                    label: 'Tên nhân viên',
                    name: 'user_id',
                    rules: [
                        {
                            message: 'Vui lòng chọn tên nhân viên',
                            required: true,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Chọn tên nhân viên',
                    size: 'large',
                    dataOptions: listUser || [],
                },
                typeFiled: 'select',
            },
            {
                itemForm: {
                    label: 'Giờ vào',
                    name: 'start_date_time',
                    rules: [
                        {
                            message: 'Vui lòng chọn giờ vào',
                            required: true,
                        },
                    ],
                },
                filed: {
                    size: 'large',
                    showTime: true,
                },
                typeFiled: 'date',
            },
            {
                itemForm: {
                    name: 'end_date_time',
                    label: 'Giờ ra',
                    rules: [
                        {
                            message: 'Vui lòng chọn giờ ra',
                            required: true,
                        },
                    ],
                },
                filed: {
                    size: 'large',
                    showTime: true,
                },
                typeFiled: 'date',
            },
            {
                itemForm: {
                    label: 'Ngày tạo',
                    name: 'create_date',
                    rules: [
                        {
                            message: 'Vui lòng chọn ngày tạo',
                            required: true,
                        },
                    ],
                },
                filed: {
                    size: 'large',
                    showTime: false,
                    format: 'DD/MM/YYYY',
                },
                typeFiled: 'date',
            },
        ];
    }, [listUser]);
    const getTimeSheets = (payload) => {
        if(false){
        payload.user_id = user._id;
        }
        setLoading(true);
        getDataTimeSheet(payload)
            .then((res) => {
                const { data, status } = res;
                if (status === 200) {
                    setData(data.data);
                    setTotalPage(data.total);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    };

    const getAllUser = async () => {
        let d;
        const res = await GetUser();
        const { data } = res;
        if (data.message === 'SUCCESS') {
            d = convertDataToOptions(data.data);
            setListUser(d);
        } else {
            NotificationCommon('error', 'Không lấy được thông tin người dùng');
        }
    };
    useEffect(() => {
        getTimeSheets(params);
    }, [params]);

    useEffect(() => {
        getAllUser();
    }, []);
    const handleDelete = (id) => {
        setLoading(true);
        deleteTimeSheet(id)
            .then((res) => {
                notification.success({
                    description: 'Xóa chấm công thành công',
                    placement: 'topRight',
                });
                getTimeSheets(params);
            })
            .catch((err) => {
                notification.error({
                    description: 'Xóa chấm công thất bại',
                    placement: 'topRight',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEdit = (data) => {
        ref.current.showEdit(data);
    };

    const handleSearch = (e) => {
        setParams({
            ...params,
            name: e,
        });
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onChangePage = (page) => {
        setParams({ ...params, page: page });
    };
    const onClose = () => {
        ref.current.onVisible();
    };

    const onSubmit = async (v) => {
        let payload;
        let res;
        if (v.id) {
            payload = {
                ...v,
                edit_by_id: user._id,
                update_date: new Date(),
            };
            res = await updateTimeSheet(v.id, payload);
        } else {
            payload = {
                ...v,
                create_by_id: user._id,
            };
            console.log(payload, 'payload');
            res = await createTimeSheet(payload);
        }
        const { status, data } = res;
        if (status === 200 || data.message === 'SUCCESS') {
            getTimeSheets(params);
            NotificationCommon(
                'success',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} chấm công thành công`
            );
            ref.current.clearData();
        } else {
            NotificationCommon(
                'error',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} chấm công thất bại`
            );
            setLoading(false);
        }
    };

    const getDataPayRollExport = () => {
        getDataTimeSheet()
            .then((res) => {
                const { data, status } = res;
                if (status === 200) {
                    setDataExportExcel(data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    };

    useEffect(() => {
        getDataPayRollExport();
    }, []);

    const dataExport = useMemo(() => {
        return {
            data: dataExportExcel,
            header: columns.map((i) => i.title),
            key: columns.map((i) => i.key),
            fileName: 'Bảng chấm công',
        };
    }, [dataExportExcel]);

    const onChangeUser = (e, name) => {
        setParams({
            ...params,
            [name]: e,
        });
    };
    return (
        <Spin indicator={antIcon} spinning={false}>
            <Space className="Space" size={14}>
                <div className="top-table">
                    <div className="group-search">
                        <SelectComponent
                            name="user_id"
                            onChange={onChangeUser}
                            dataOptions={listUser ? listUser : []}
                            placeholder="Chọn nhân viên"
                        />
                        <ExportExcelComponent dataExport={dataExport} />
                    </div>
                    <AddNewDialogComponent
                        fileds={dataForm}
                        title="chấm công"
                        onClose={onClose}
                        ref={ref}
                        onSubmit={onSubmit}
                    />
                </div>
            </Space>
            <div className="space-table">
                <Table
                    columns={columns}
                    loading={loading}
                    dataSource={data}
                    pagination={{
                        total: totalPage || 0,
                        pageSize: 5,
                        onChange: onChangePage,
                    }}
                />
            </div>
        </Spin>
    );
}
