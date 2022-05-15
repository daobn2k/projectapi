import {
    notification,
    Space,
    Table,
    Input,
    Spin,
    Typography,
    Button,
} from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { getDataPayRoll } from '../../axios';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    parseMoney,
} from '../../shared';
import { deletePayRoll } from '../../axios/payroll';
import ExportExcelComponent from '../ExportExcelComponent';
import { Link } from 'react-router-dom';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';

const { Search } = Input;
export default function PayRollComponent() {
    const [data, setData] = useState();
    const [totalPage, setTotalPage] = useState();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        keyword: '',
    });
    const [loading, setLoading] = useState(false);
    const [dataExportExcel, setDataExportExcel] = useState([]);
    const ref = useRef();
    const columns = useMemo(() => {
        return [
            // {
            //   title: "Mã Lương",
            //   dataIndex: "user_id",
            //   key: "user_id",
            //   align: "center",
            //   render: (item, record, index) => {
            //     return (
            //       <Typography key={index}>
            //         {item && item.name ? item.name : ''}
            //       </Typography>
            //     );
            //   },
            // },
            {
                title: 'Tên Nhân Viên',
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
                title: 'Tổng số giờ làm việc',
                dataIndex: 'total_working_time',
                key: 'total_working_time',
                align: 'center',
            },
            {
                title: 'Lương tháng',
                dataIndex: 'in_month',
                key: 'in_month',
                align: 'center',
            },
            {
                title: 'Lương Cơ Bản',
                dataIndex: 'salary',
                key: 'salary',
                width: 125,
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>{parseMoney(item)}</Typography>
                    );
                },
            },
            {
                title: 'Lương Thưởng thêm',
                dataIndex: 'salary_bonus',
                key: 'salary_bonus',
                width: 200,
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>{parseMoney(item)}</Typography>
                    );
                },
            },
            {
                title: 'Lương Thực Nhận',
                dataIndex: 'total_money',
                key: 'total_money',
                width: 150,
                render: (item, record, index) => {
                    return (
                        <Typography key={index}>{parseMoney(item)}</Typography>
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
                            title="bảng lương"
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
    const getPayRolls = (payload) => {
        setLoading(true);
        getDataPayRoll(payload)
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

    const getDataPayRollExport = () => {
        getDataPayRoll()
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
    useEffect(() => {
        getPayRolls(params);
    }, [params]);

    const handleDelete = (id) => {
        setLoading(true);
        deletePayRoll(id)
            .then((res) => {
                notification.success({
                    description: 'Xóa phòng ban thành công',
                    placement: 'topRight',
                });
                getPayRolls(params);
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

    const dataExport = useMemo(() => {
        return {
            data: dataExportExcel,
            header: columns.map((i) => i.title),
            key: columns.map((i) => i.key),
            fileName: 'Bảng lương nhân viên',
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
                    <Link to="/payroll/new">
                        <Button className="btn-add" icon={<PlusOutlined />}>
                            Thêm mới lương
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
                />
            </div>
        </Spin>
    );
}
