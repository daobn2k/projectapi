import { Table, Typography } from "antd";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { convertTimeStampUTCToLocal } from "../../shared";
import './index.css';

const TableDepartment = (props) => {
    const { data } = props
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
        ];
    }, [data]);
    const history = useHistory();
    const dataTable = useMemo(() => {
        return data ? data.splice(0,5) : []
    },[data])
    return <div className="view" onClick={()=>history.push("/department/list")}>
           <Typography className="title-dashboard">Bảng thống kê phòng ban</Typography>
           <Table
                    columns={columns}
                    dataSource={dataTable}
                    pagination={false}
            />
           <Typography className="load-more">Xem thêm chi tiết...</Typography>
    </div>
}

export default TableDepartment