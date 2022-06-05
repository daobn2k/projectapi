import { notification, Space, Table, Input, Button, Spin, Typography, DatePicker } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { GetUser } from '../../axios';
import { DeleteAccount } from '../../axios/account';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { convertDataToOptions, convertTimeStampUTCToLocal, listGender } from '../../shared';
import ExportExcelComponent from '../ExportExcelComponent';
import PopupConfirmComponent from '../../common/PopupComfirmComponent';
import * as _ from 'lodash';
import moment from 'moment';
import { getDataDeaprtment } from '../../axios/department';
import SelectComponent from '../../common/SelectComponent';
import { getDataEducation } from '../../axios/education';

const { Search } = Input;
export default function ListCustomer(props) {
    const { isShow = true } = props;
    const [loading, setLoading] = useState(false);
    const [listDepartment, setListDepartment] = useState([]);
    const [listE, setListEducation] = useState([]);
    const [dataExportExcel, setDataExportExcel] = useState([]);
    const columns = [
        // {
        //   title: "Số thứ tự",
        //   dataIndex: "_id",
        //   key: "_id",
        //   width: "80px",
        //   align: "center",
        //   fixed: "left",
        //   render: (i, re, index) => {
        //     return <Typography key={`${i}-${index}`}>{index + 1}</Typography>;
        //   },
        // },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            fixed: 'left',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key: 'sex',
            align: 'center',
            width: '100px',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
            width: '125px',
            render: (date, re, index) => {
                return <Typography key={index}>{convertTimeStampUTCToLocal(date)}</Typography>;
            },
        },
        // {
        //   title: "Ảnh đại diện",
        //   dataIndex: "avatar",
        //   key:'avatar',
        //   align:'center',
        //   width:'150px',
        //   render: (e) => {
        //     return <Avatar key={e} width={50} src={e} />;
        //   },
        // },
        {
            title: 'Phòng ban',
            dataIndex: 'department_id',
            key: 'department_id',
            width: '150px',
            render: (item, re, index) => {
                return (
                    <Typography key={`${index}`}>{item && item.name ? item.name : ''}</Typography>
                );
            },
        },
        {
            title: 'Trình độ học vấn',
            dataIndex: 'education_id',
            key: 'education_id',
            width: '175px',
            render: (item, re, index) => {
                return (
                    <Typography key={`${index}`}>{item && item.name ? item.name : ''}</Typography>
                );
            },
        },
        {
            title: 'Trường học',
            dataIndex: 'school',
            key: 'school',
            width: '200px',
        },
        {
            title: 'Địa chỉ email',
            dataIndex: 'email',
            key: 'email',
            width: '200px',
        },
        {
            title: 'Địa chỉ cư trú',
            dataIndex: 'address',
            key: 'address',
            width: '250px',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '150px',
        },
        {
            title: 'Lương cơ bản',
            dataIndex: 'salary',
            key: 'salary',
            width: '150px',
        },

        {
            title: 'Chức vụ',
            dataIndex: 'role_id',
            key: 'role_id',
            width: '200px',
            render: (item, record, index) => {
                return <Typography key={index}>{item && item.name ? item.name : ''}</Typography>;
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            width: 75,
            render: (e) => (
                <Space size="middle">
                    <AiOutlineEdit key={e.id} onClick={() => handleEdit(e._id)} />
                    <PopupConfirmComponent title="nhân viên" data={e} handleDelete={handleDelete}>
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
        perPage: 5,
        keyword: '',
    });
    const GetInfoUser = (payload) => {
        setLoading(true);
        GetUser(payload)
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
                }, 500);
            });
    };

    const getDataExport = () => {
        GetUser()
            .then((res) => {
                const { data, status } = res;
                if (status === 200) {
                    setDataExportExcel(data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getDataExport();
        getDataListDeaprtment();
        getDataListEducation()
    }, []);
    const getDataListEducation = async () => {
        const result = await getDataEducation()
        if (result.status === 200) {
          const d = convertDataToOptions(result.data.data);
          setListEducation(d)
        }
      }
    const getDataListDeaprtment = async () => {
        const result = await getDataDeaprtment();
        if (result.status === 200) {
            const d = convertDataToOptions(result.data.data);
            setListDepartment(d);
        }
    };
    useEffect(() => {
        GetInfoUser(params);
    }, [params]);

    const handleDelete = (id) => {
        setLoading(true);
        DeleteAccount(id)
            .then((res) => {
                notification.success({
                    description: 'Xóa nhân viên thành công',
                    placement: 'topRight',
                });
                GetInfoUser();
            })
            .catch((err) => {
                notification.error({
                    description: 'Xóa nhân viên thất bại',
                    placement: 'topRight',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEdit = (id) => {
        history.push({
            pathname: `/customer/add`,
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

    const dataExport = useMemo(() => {
        return {
            data: dataExportExcel,
            header: columns.map((i) => i.title),
            key: columns.map((i) => i.key),
            fileName: 'Danh Sách Nhân Viên',
        };
    }, [dataExportExcel]);
    const handleGetDate = (e) => {
        setParams({
            ...params,
            create_date: !_.isEmpty(e) ? moment(e).format('YYYY-MM-DD') : null,
        });
    };
    const handleGetDOB = (e) => {
        setParams({
            ...params,
            dob: !_.isEmpty(e) ? moment(e).format('YYYY-MM-DD') : null,
        });
    };
    const onChangeDepartment = (e, name) => {
        setParams({
            ...params,
            [name]:e
        })
    };
    const onChangeGender = (e, key) => {
        let name;
        console.log(e);
        if(e === "1"){
            name = 'Nam'
        }
        if(e === "2"){
            name = 'Nữ'
        }
        if(e === "3"){
            name = 'Khác'
        }
        setParams({
            ...params,
            [key]:name
        })
    };
    const onChangeE = (e,name) => {
        setParams({
            ...params,
            [name]:e
        }) 
    }
    return (
        <Spin indicator={antIcon} spinning={false}>
            {isShow && (
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
                        <Link to="/customer/add">
                            <Button className="btn-add" icon={<PlusOutlined />}>
                                Thêm mới nhân viên
                            </Button>
                        </Link>
                    </div>
                </Space>
            )}
            <div className="root-filter">
                <Typography>Bộ lọc:</Typography>
                <div className="field-filter">
                    <SelectComponent
                        name="education_id"
                        onChange={onChangeE}
                        dataOptions={listE ? listE : []}
                        placeholder="Chọn trình độ học vấn"
                    />
                    <SelectComponent
                        name="sex"
                        onChange={onChangeGender}
                        dataOptions={listGender ? listGender : []}
                        placeholder="Chọn giới tính"
                    />
                    <SelectComponent
                        name="department_id"
                        onChange={onChangeDepartment}
                        dataOptions={listDepartment ? listDepartment : []}
                        placeholder="Chọn phòng ban"
                    />
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
                        placeholder="Chọn ngày sinh"
                        size="large"
                        onChange={handleGetDOB}
                    />
                </div>
            </div>
            <div className="space-table">
                {isShow && <ExportExcelComponent dataExport={dataExport} />}
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
