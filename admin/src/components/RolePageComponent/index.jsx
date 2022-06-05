import { notification, Space, Table, Input, Spin, Typography } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { GetUser } from '../../axios';
import { LoadingOutlined } from '@ant-design/icons';
import { convertDataToOptions, convertTimeStampUTCToLocal } from '../../shared';
import AddNewDialogComponent from '../AddNewDialogComponent';
import { NotificationCommon } from '../../common/Notification';
import { store } from '../../storage';
import { deleteRole, editRole, getDataRole, newRole } from '../../axios/role';
import { listCodeRole } from './defaultValue';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';
const { Search } = Input;
export default function RolePageComponent() {
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
                title: 'Mã chức vụ',
                dataIndex: 'code',
                key: 'code',
                align: 'left',
                render:(code)=>{
                    const item = listCodeRole && listCodeRole.find(i => String(i.id) === String(code))
                    return<Typography>{item.label}</Typography>
                }
            },
            {
                title: 'Tên chức vụ',
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
                title: 'Ngày tạo',
                dataIndex: 'create_date',
                key: 'create_date',
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
                            onClick={() => handleEdit(e)}
                        />
                        <PopupConfirmComponent
                            title="chức vụ"
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
                    label: 'Mã Chức vụ',
                    name: 'code',
                    rules: [
                        {
                            message: 'Vui lòng chọn mã chức vụ',
                            required: true,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Chọn mã chức vụ',
                    size: 'large',
                    dataOptions: listCodeRole || [],
                },
                typeFiled: 'select',
            },
            {
                itemForm: {
                    label: 'Tên chức vụ',
                    name: 'name',
                    rules: [
                        {
                            message: 'Vui lòng điền tên chức vụ',
                            required: true,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Điền tên chức vụ',
                    size: 'large',
                },
                typeFiled: 'input',
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
    const getRole = (payload) => {
        setLoading(true);
        getDataRole(payload)
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

    const getRoleExport = (payload) => {
        getDataRole(payload)
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
        getRoleExport();
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
        getRole(params);
    }, [params]);

    useEffect(() => {
        getAllUser();
    }, []);
    const handleDelete = (id) => {
        setLoading(true);
        deleteRole(id)
            .then((res) => {
                notification.success({
                    description: 'Xóa chức vụ thành công',
                    placement: 'topRight',
                });
                getRole(params);
            })
            .catch((err) => {
                notification.error({
                    description: 'Xóa chức vụ thất bại',
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
        console.log(user,"user");
        if (v.id) {
            payload = {
                ...v,
                edit_by_id: user._id,
                update_date: new Date(),
                create_by_id: user._id,
            };
            res = await editRole(v.id, payload);
        } else {
            payload = {
                ...v,
                create_by_id: user._id,
                edit_by_id: user._id,
            };
            res = await newRole(payload);
        }
        const { status, data } = res;
        if (status === 200 || data.message === 'SUCCESS') {
            getRole(params);
            NotificationCommon(
                'success',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} chức vụ thành công`
            );
            ref.current.clearData();
        } else {
            NotificationCommon(
                'error',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} chức vụ thất bại`
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
                        title="chức vụ"
                        onClose={onClose}
                        ref={ref}
                        onSubmit={onSubmit}
                    />
                </div>
            </Space>
            <div className="space-table" style={{ paddingTop: 24 }}>
                {/* <ExportExcelComponent dataExport={dataExport} /> */}
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
