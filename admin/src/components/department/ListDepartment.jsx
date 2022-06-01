import { notification, Space, Table, Input, Spin, Typography } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { GetUser } from '../../axios';
import { LoadingOutlined } from '@ant-design/icons';
import { checkPermisstionUser, convertDataToOptions, convertTimeStampUTCToLocal } from '../../shared';
import AddNewDialogComponent from '../AddNewDialogComponent';
import {
    deleteDepartment,
    editDepartment,
    getDataDeaprtment,
    newDepartment,
} from '../../axios/department';
import { NotificationCommon } from '../../common/Notification';
import { store } from '../../storage';
import ExportExcelComponent from '../ExportExcelComponent';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';
const { Search } = Input;
export default function ListDepartment() {
    const [data, setData] = useState();
    const [listUser, setListUser] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [params, setParams] = useState({
        page: 1,
        perPage: 5,
        keyword: '',
    });
    const [loading, setLoading] = useState(false);
    const [dataExportExcel, setDataExportExcel] = useState([]);
    const ref = useRef();
    const user = store.getCurentUser();
    const columns = useMemo(() => {
        return [
            {
                title: 'Tên phòng ban',
                dataIndex: 'name',
                key: 'name',
                align: 'left',
            },
            {
                title: 'Mô tả',
                dataIndex: 'description',
                key: 'description',
                align: 'left',
            },
            {
                title: 'Trưởng ban',
                dataIndex: 'admin_user_id',
                key: 'admin_user_id',
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>
                            {item && item.name ? item.name : ''}
                        </Typography>
                    );
                },
            },
            // {
            //     title: 'Người tạo',
            //     dataIndex: 'create_by_id',
            //     key: 'create_by_id',
            //     render: (item, record, index) => {
            //         return (
            //             <Typography key={index}>
            //                 {item && item.name ? item.name : ''}
            //             </Typography>
            //         );
            //     },
            // },
            {
                title: 'Ngày tạo',
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
            // {
            //     title: 'Người chỉnh sửa',
            //     dataIndex: 'edit_by_id',
            //     key: 'edit_by_id',
            //     width: 200,
            //     render: (item, record, index) => {
            //         return (
            //             <Typography key={index}>
            //                 {item && item.name ? item.name : ''}
            //             </Typography>
            //         );
            //     },
            // },
            // {
            //     title: 'Ngày chỉnh sửa',
            //     dataIndex: 'update_date',
            //     key: 'update_date',
            //     width: 175,
            //     render: (item, record, index) => {
            //         return (
            //             <Typography key={index}>
            //                 {convertTimeStampUTCToLocal(item)}
            //             </Typography>
            //         );
            //     },
            // },
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
                            title="phòng ban"
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
    const dataForm = useMemo(() => {
        return [
            {
                itemForm: {
                    label: 'Tên phòng ban',
                    name: 'name',
                    rules: [
                        {
                            message: 'Vui lòng điền tên phòng ban',
                            required: true,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Điền tên phòng ban',
                    size: 'large',
                },
                typeFiled: 'input',
            },
            {
                itemForm: {
                    label: 'Tên trưởng phòng ban',
                    name: 'admin_user_id',
                    rules: [
                        {
                            message: 'Vui lòng chọn trưởng phòng ban',
                            required: true,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Chọn trưởng phòng ban',
                    size: 'large',
                    dataOptions: listUser || [],
                },
                typeFiled: 'select',
            },
            {
                itemForm: {
                    name: 'description',
                    label: 'Mô tả',
                    rules: [
                        {
                            required: false,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Điền thông tin mô tả',
                    size: 'large',
                    autoSize: { minRows: 3, maxRows: 5 },
                },
                typeFiled: 'area',
            },
        ];
    }, [listUser]);
    const getDepartment = (payload) => {
        setLoading(true);
        getDataDeaprtment(payload)
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

    const getDepartmentExport = (payload) => {
        getDataDeaprtment(payload)
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
        getDepartmentExport();
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
    useEffect(() => {
        getDepartment(params);
    }, [params]);

    useEffect(() => {
        getAllUser();
    }, []);
    const handleDelete = (id) => {
        setLoading(true);
        deleteDepartment(id)
            .then((res) => {
                notification.success({
                    description: 'Xóa phòng ban thành công',
                    placement: 'topRight',
                });
                getDepartment(params);
            })
            .catch((err) => {
                notification.error({
                    description: 'Xóa phòng ban thất bại',
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
            keyword: e,
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
            res = await editDepartment(v.id, payload);
        } else {
            payload = {
                ...v,
                create_by_id: user._id,
                edit_by_id: user._id,
            };
            res = await newDepartment(payload);
        }
        const { status, data } = res;
        if (status === 200 || data.message === 'SUCCESS') {
            getDepartment(params);
            NotificationCommon(
                'success',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} phòng ban thành công`
            );
            ref.current.clearData();
        } else {
            NotificationCommon(
                'error',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} phòng ban thất bại`
            );
            setLoading(false);
        }
    };

    const dataExport = useMemo(() => {
        return {
            data: dataExportExcel,
            header: columns.map((i) => i.title),
            key: columns.map((i) => i.key),
            fileName: 'Danh Sách Phòng Ban',
        };
    }, [dataExportExcel]);

    return (
        <Spin indicator={antIcon} spinning={false}>
            <Space className="Space" size={14}>
                <div className="top-table">
                    <Search
                        allowClear
                        placeholder="Tìm kiếm"
                        optionFilterProp="children"
                        className="input-search"
                        onSearch={handleSearch}
                        enterButton
                    ></Search>
                    <AddNewDialogComponent
                        fileds={dataForm}
                        title="Phòng ban"
                        onClose={onClose}
                        ref={ref}
                        onSubmit={onSubmit}
                    />
                </div>
            </Space>
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
                    // scroll={{ x: 2000 }}
                />
            </div>
        </Spin>
    );
}
