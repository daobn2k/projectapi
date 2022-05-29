import { notification, Space, Table, Input, Spin, Typography } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { LoadingOutlined } from '@ant-design/icons';
import { convertTimeStampUTCToLocal } from '../../shared';
import AddNewDialogComponent from '../AddNewDialogComponent';
import { NotificationCommon } from '../../common/Notification';
import { store } from '../../storage';
import {
    addEducation,
    deleteEducation,
    editEducation,
    getDataEducation,
} from '../../axios/education';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';
const { Search } = Input;
export default function ListEducation() {
    const [data, setData] = useState();
    const [totalPage, setTotalPage] = useState();
    const [params, setParams] = useState({
        page: 1,
        perPage: 5,
        keyword: '',
    });
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    const user = store.getCurentUser();
    const columns = useMemo(() => {
        return [
            {
                title: 'Tên trình độ học vấn',
                dataIndex: 'name',
                key: 'name',
                align: 'left',
                width: 250,
            },
            {
                title: 'Mô tả',
                dataIndex: 'description',
                key: 'description',
                align: 'left',
                width: 250,
            },
            {
                title: 'Người tạo',
                dataIndex: 'create_by_id',
                key: 'create_by_id',
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>
                            {item && item.name ? item.name : ''}
                        </Typography>
                    );
                },
            },
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
            {
                title: 'Người chỉnh sửa',
                dataIndex: 'edit_by_id',
                key: 'edit_by_id',
                width: 200,
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>
                            {item && item.name ? item.name : ''}
                        </Typography>
                    );
                },
            },
            {
                title: 'Ngày chỉnh sửa',
                dataIndex: 'update_date',
                key: 'update_date',
                width: 175,
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
                            title="trình độ"
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
                    label: 'Tên trình độ học vấn',
                    name: 'name',
                    rules: [
                        {
                            message: 'Vui lòng điền tên trình độ học vấn',
                            required: true,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Điền tên trình độ học vấn',
                    size: 'large',
                },
                typeFiled: 'input',
            },
            {
                itemForm: {
                    label: 'Mô tả',
                    name: 'description',
                    rules: [
                        {
                            required: false,
                        },
                    ],
                },
                filed: {
                    placeholder: 'Điền mô tả',
                    size: 'large',
                },
                typeFiled: 'input',
            },
        ];
    }, []);
    const getEducation = (payload) => {
        setLoading(true);
        getDataEducation(payload)
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

    useEffect(() => {
        getEducation(params);
    }, [params]);

    const handleDelete = (id) => {
        setLoading(true);
        deleteEducation(id)
            .then((res) => {
                notification.success({
                    description: 'Xóa trình độ học vấn thành công',
                    placement: 'topRight',
                });
                getEducation(params);
            })
            .catch((err) => {
                notification.error({
                    description: 'Xóa trình độ học vấn thất bại',
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
            res = await editEducation(v.id, payload);
        } else {
            payload = {
                ...v,
                create_by_id: user._id,
                edit_by_id: user._id,
            };
            res = await addEducation(payload);
        }
        const { status, data } = res;
        if (status === 200 || data.message === 'SUCCESS') {
            getEducation(params);
            NotificationCommon(
                'success',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} trình độ học vấn thành công`
            );
            ref.current.clearData();
        } else {
            NotificationCommon(
                'error',
                `${v.id ? 'Chỉnh sửa' : 'Tạo mới'} trình độ học vấn thất bại`
            );
            setLoading(false);
        }
    };

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
                        title="trình độ học vấn"
                        onClose={onClose}
                        ref={ref}
                        onSubmit={onSubmit}
                    />
                </div>
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
            </Space>
        </Spin>
    );
}
