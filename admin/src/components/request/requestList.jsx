import {
    notification,
    Space,
    Table,
    Input,
    Button,
    Spin,
    Typography,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { getRequest } from '../../axios';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { convertTimeStampUTCToLocal } from '../../shared';
import ExportExcelComponent from '../ExportExcelComponent';
import { deleteRequest } from '../../axios/request';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';
const { Search } = Input;
export default function ListRequest() {
    const [loading, setLoading] = useState(false);

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
                return (
                    <Typography key={index}>
                        {item && item.name ? item.name : ''}
                    </Typography>
                );
            },
        },
        {
            title: 'Người nhận',
            dataIndex: 'user_id',
            key: 'user_id',
            width: '150px',
            render: (item, record, index) => {
                return (
                    <Typography key={index}>
                        {item && item.name ? item.name : ''}
                    </Typography>
                );
            },
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'from_date',
            key: 'from_date',
            width: '125px',
            render: (date, re, index) => {
                return (
                    <Typography key={index}>
                        {convertTimeStampUTCToLocal(date)}
                    </Typography>
                );
            },
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            width: '125px',
            render: (date, re, index) => {
                return (
                    <Typography key={index}>
                        {convertTimeStampUTCToLocal(date)}
                    </Typography>
                );
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
                    <AiOutlineEdit
                        key={e.id}
                        onClick={() => handleEdit(e._id)}
                    />
                    <PopupConfirmComponent
                        title="công việc"
                        data={e}
                        handleDelete={handleDelete}
                    >
                        <AiFillDelete />
                    </PopupConfirmComponent>
                </Space>
            ),
        },
    ];
    const history = useHistory();
    const [data, setData] = useState();
    const [totalPage, setTotalPage] = useState();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        keyword: '',
    });
    const getDataRequest = (payload) => {
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
    }, []);
    const dataExport = useMemo(() => {
        return {
            data: dataExportExcel,
            header: columns.map((i) => i.title),
            key: columns.map((i) => i.key),
            fileName: 'Danh sách công việc',
        };
    }, [dataExportExcel]);
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
                    <Link to="/request/add">
                        <Button className="btn-add" icon={<PlusOutlined />}>
                            Thêm mới nhân viên
                        </Button>
                    </Link>
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
                    scroll={{ x: 2000 }}
                />
            </div>
        </Spin>
    );
}
