import React, { useState, useEffect, Fragment, useMemo ,memo} from 'react';
import './index.css';
import { Row, Col, Typography } from 'antd';
import { getRequest, GetUser } from '../../axios';
import { getDataDeaprtment } from '../../axios/department';
import TableUser from './TableUser';
import TableDepartment from './TableDepartment';
import TableRequest from './TableRequest';
import { store } from '../../storage';
import { checkPermisstionUser } from '../../shared';

const DashBoardComponent = () => {
    const user = store.getCurentUser();
    const role = checkPermisstionUser(user.role_id.code)

    const [listDeaprtment, setListDepartment] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [listRequest, setListRequest] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalDepartment, setTotalDepartment] = useState(0);
    const [totalRequest, setTotalRequest] = useState(0);
    useEffect(() => {
        getDataListDeaprtment();
        getAllUser();
        getListRequest();
    }, []);

    const getDataListDeaprtment = async () => {
        const result = await getDataDeaprtment();
        const { data } = result;
        if (result.status === 200 && data.message === 'SUCCESS') {
            setListDepartment(data.data);
            setTotalDepartment(data.total)
        }
    };
    const getAllUser = async () => {
        const res = await GetUser();
        const { data } = res;
        
        if (data.message === 'SUCCESS') {
            setListUser(data.data);
            setTotalUser(data.total)
        }
    };
    const getListRequest = async () => {
        const res = await getRequest();
        const { data } = res;
        if (data.message === 'SUCCESS') {
            setListRequest(data.data);
            setTotalRequest(data.total)
        }
    };
    return (
        <Fragment>
            {role === 'admin' ? (
                <div className="root-dashboard">
                    <Typography className="heading">Thông tin thống kế </Typography>
                    <div className="report">
                        <div className="report-card">
                            <Typography style={{ fontWeight: 'bold' }}>
                                Tổng số nhân viên
                            </Typography>
                            <Typography>{totalUser}</Typography>
                        </div>
                        <div className="report-card">
                            <Typography style={{ fontWeight: 'bold' }}>
                                Tổng số phòng ban
                            </Typography>
                            <Typography>
                                {totalDepartment}
                            </Typography>
                        </div>
                        <div className="report-card">
                            <Typography style={{ fontWeight: 'bold' }}>
                                Tổng số công việc
                            </Typography>
                            <Typography>
                                {totalRequest}
                            </Typography>
                        </div>
                    </div>
                    <div className="table-dashboard">
                        <TableUser data={listUser} />
                    </div>
                    <div className="table-dashboard">
                        <TableDepartment data={listDeaprtment} />
                    </div>
                    <div className="table-dashboard">
                        <TableRequest data={listRequest} />
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100vh',
                        fontSize:32,
                    }}
                >
                    Bạn không có quyền xem thông tin tại đây...
                </div>
            )}
        </Fragment>
    );
};

export default memo(DashBoardComponent);
