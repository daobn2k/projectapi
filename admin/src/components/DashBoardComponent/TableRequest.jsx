import { Table, Typography } from "antd";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { convertTimeStampUTCToLocal } from "../../shared";
import './index.css';

const TableRequest = (props) => {
    const { data } = props
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
    ];
    const history = useHistory();
    const dataTable = useMemo(() => {
        return data ? data.splice(0,5) : []
    },[data])
    return <div className="view" onClick={()=>history.push("/request/list")}>
           <Typography className="title-dashboard">Bảng thống kê công việc</Typography>
           <Table
                    columns={columns}
                    dataSource={dataTable}
                    pagination={false}
            />
           <Typography className="load-more">Xem thêm chi tiết...</Typography>
    </div>
}

export default TableRequest