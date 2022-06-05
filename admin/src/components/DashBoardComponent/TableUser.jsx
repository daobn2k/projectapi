import { Table, Typography } from "antd";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import './index.css';

const TableUser = (props) => {
    const { data } = props
    const columns = [
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
            title: 'Địa chỉ email',
            dataIndex: 'email',
            key: 'email',
            width: '200px',
        },
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
            title: 'Chức vụ',
            dataIndex: 'role_id',
            key: 'role_id',
            width: '200px',
            render: (item, record, index) => {
                return <Typography key={index}>{item && item.name ? item.name : ''}</Typography>;
            },
        },
  
    ];
    const history = useHistory();

    const dataTable = useMemo(() => {
        return data ? data.splice(0,5) : []
    },[data])
    return <div  className="view" onClick={()=>history.push("/customer/list")}>
           <Typography className="title-dashboard">Bảng thống kê người dùng</Typography>
           <Table
                    columns={columns}
                    dataSource={dataTable}
                    pagination={false}
            />
           <Typography className="load-more">Xem thêm chi tiết...</Typography>
    </div>
}

export default TableUser