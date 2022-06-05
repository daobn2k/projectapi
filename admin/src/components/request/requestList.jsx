import { notification, Space, Table, Input, Button, Spin, Typography, DatePicker } from 'antd';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { getRequest, GetUser } from '../../axios';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { checkPermisstionUser, convertDataToOptions, convertTimeStampUTCToLocal } from '../../shared';
import ExportExcelComponent from '../ExportExcelComponent';
import { deleteRequest } from '../../axios/request';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';
import { store } from '../../storage';
import SelectComponent from '../../common/SelectComponent';
import { getDataDeaprtment } from '../../axios/department';
import { NotificationCommon } from '../../common/Notification';
import * as _ from 'lodash';
import moment from 'moment';

const { Search } = Input;
export default function ListRequest() {
    const [loading, setLoading] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);
    const user = store.getCurentUser();

    const columns = [
        {
            title: 'Tên công việc',
            dataIndex: 'name',
            key: 'name',
            width: '125px',
            fixed: 'left',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: '200px',
        },
        {
            title: 'Người giao',
            dataIndex: 'create_by_id',
            key: 'create_by_id',
            width: '150px',
            render: (item, record, index) => {
                return <Typography key={index}>{item && item.name ? item.name : ''}</Typography>;
            },
        },
        {
            title: 'Người nhận',
            dataIndex: 'user_id',
            key: 'user_id',
            width: '150px',
            render: (item, record, index) => {
                return <Typography key={index}>{item && item.name ? item.name : ''}</Typography>;
            },
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'from_date',
            key: 'from_date',
            width: '125px',
            render: (date, re, index) => {
                return <Typography key={index}>{convertTimeStampUTCToLocal(date)}</Typography>;
            },
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            width: '125px',
            render: (date, re, index) => {
                return <Typography key={index}>{convertTimeStampUTCToLocal(date)}</Typography>;
            },
        },
        // {
        //   title: "Trạng thái ",
        //   dataIndex: "status",
        //   key: "status",
        //   width: "125px",
        // },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            width: 75,
            render: (e) => (
                <Space size="middle">
                    {role ==='admin' && (
                        <Fragment>
                            <AiOutlineEdit key={e.id} onClick={() => handleEdit(e._id)} />
                            <PopupConfirmComponent
                                title="công việc"
                                data={e}
                                handleDelete={handleDelete}
                            >
                                <AiFillDelete />
                            </PopupConfirmComponent>
                        </Fragment>
                    )}
                </Space>
            ),
        },
    ];
    const history = useHistory();
    const [data, setData] = useState();
    const [totalPage, setTotalPage] = useState();
    const [params, setParams] = useState({
        page: 1,
        perPage: 5,
        keyword: '',
    });
    const role = checkPermisstionUser(user.role_id.code);
    const getDataRequest = (payload) => {
        if (role === 'user') {
            payload.user_id = user._id;
        }
        setLoading(true);
        getRequest(payload)
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
                setLoading(false);
            });
    };

    useEffect(() => {
        getDataRequest(params);
    }, [params]);

    const handleDelete = (id) => {
        setLoading(true);
        deleteRequest(id)
            .then((res) => {
                notification.success({
                    description: 'Xóa công việc thành công',
                    placement: 'topRight',
                });
                getDataRequest();
            })
            .catch((err) => {
                notification.error({
                    description: 'Xóa công việc thất bại',
                    placement: 'topRight',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEdit = (id) => {
        history.push({
            pathname: `/request/add`,
            state: { id: id },
        });
    };

    const handleSearch = (e) => {
        setParams({
            ...params,
            keyword: e,
        });
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onChangePage = (page) => {
        setParams({ ...params, page: page });
    };
    const [dataExportExcel, setDataExportExcel] = useState([]);

    const getDataExport = () => {
        getRequest()
            .then((res) => {
                const { data, status } = res;
                if (status === 200) {
                    setDataExportExcel(data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDataExport();
        getAllUser();
        getDataListDeaprtment();
    }, []);

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
    const getDataListDeaprtment = async () => {
        const result = await getDataDeaprtment();
        if (result.status === 200) {
            const d = convertDataToOptions(result.data.data);
            setListDepartment(d);
        }
    };
    const dataExport = useMemo(() => {
        return {
            data: dataExportExcel,
            header: columns.map((i) => i.title),
            key: columns.map((i) => i.key),
            fileName: 'Danh sách công việc',
        };
    }, [dataExportExcel]);

    const handleGetDate = (e) => {
        setParams({
            ...params,
            create_date: !_.isEmpty(e) ? moment(e).format('YYYY-MM-DD') : null,
        });
    };
    const handleGetDateStart = (e) => {
        setParams({
            ...params,
            from_date: !_.isEmpty(e) ? moment(e).format('YYYY-MM-DD') : null,
        });
    };
    const handleGetDateEnd = (e) => {
        setParams({
            ...params,
            end_date: !_.isEmpty(e) ? moment(e).format('YYYY-MM-DD') : null,
        });
    };
    const onChangeDepartment = (e, name) => {
        setParams({
            ...params,
            [name]:e
        })
    };
    const onChangeCreateUser = (e, name) => {
        setParams({
            ...params,
            [name]:e
        })
    };
    const onChangeUser = (e, name) => {
        setParams({
            ...params,
            [name]:e
        })
    };


    return (
        <Spin indicator={antIcon} spinning={false}>
            <Space className="Space">
                <div className="top-table">
                    <Search
                        allowClear
                        placeholder="Tìm kiếm"
                        optionFilterProp="children"
                        className="input-search"
                        onSearch={handleSearch}
                        enterButton
                    ></Search>
                    {role === 'admin' && (
                        <Link to="/request/add">
                            <Button className="btn-add" icon={<PlusOutlined />}>
                                Thêm mới nhân viên
                            </Button>
                        </Link>
                    )}
                </div>
            </Space>
            <div className="root-filter">
                <Typography>Bộ lọc:</Typography>
                <div className="field-filter">
                    <SelectComponent
                        name="create_by_id"
                        onChange={onChangeCreateUser}
                        dataOptions={listUser ? listUser : []}
                        placeholder="Chọn người giao việc"
                    />
                     <SelectComponent
                        name="user_id"
                        onChange={onChangeUser}
                        dataOptions={listUser ? listUser : []}
                        placeholder="Chọn người nhận việc"
                    />
                    {/* <SelectComponent
                        name="department_id"
                        onChange={onChangeDepartment}
                        dataOptions={listDepartment ? listDepartment : []}
                        placeholder="Chọn phòng ban"
                    /> */}
                    <DatePicker
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày tạo"
                        size="large"
                        onChange={handleGetDate}
                    />
                    <DatePicker
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày bắt đầu"
                        size="large"
                        onChange={handleGetDateStart}
                    />
                     <DatePicker
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày kết thúc"
                        size="large"
                        onChange={handleGetDateEnd}
                    />
                </div>
            </div>
            <div className="space-table">
                <ExportExcelComponent dataExport={dataExport} />
                <Table
                    columns={columns}
                    loading={loading}
                    dataSource={data}
                    pagination={{
                        total: totalPage || 0,
                        pageSize: 5,
                        onChange: onChangePage,
                    }}
                    scroll={{ x: 2000 }}
                />
            </div>
        </Spin>
    );
}
