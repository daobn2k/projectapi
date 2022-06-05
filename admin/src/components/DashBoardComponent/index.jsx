import React, { useState ,useEffect } from 'react';
import './index.css';
import { Row, Col, Typography } from 'antd';
import { getRequest, GetUser } from '../../axios';
import { getDataDeaprtment } from '../../axios/department';
import TableUser from './TableUser';
import TableDepartment from './TableDepartment';
import TableRequest from './TableRequest';

const DashBoardComponent = () => {
    const [listDeaprtment,setListDepartment] = useState([])
    const [listUser,setListUser] = useState([])
    const [listRequest,setListRequest] = useState([])

    useEffect(() => {
        getDataListDeaprtment();
        getAllUser();
        getListRequest();
    }, []);

    const getDataListDeaprtment = async () => {
        const result = await getDataDeaprtment()
        const { data } = result
        if (result.status === 200 &&  data.message === 'SUCCESS') {
          setListDepartment(data.data)
        }
    }
    const getAllUser = async () => {
        const res = await GetUser();
        const { data } = res;
        if (data.message === 'SUCCESS') {
            setListUser(data.data);
        }
    };
    const getListRequest = async () => {
        const res = await getRequest();
        const { data } = res;
        if (data.message === 'SUCCESS') {
            setListRequest(data.data);
        }
    };
    return (
        <div className="root-dashboard">
        <Typography className='heading'>Thông tin thống kế </Typography>
        <div className='report' >
            <div className='report-card'>
                <Typography style={{fontWeight:'bold'}}>Tổng số nhân viên</Typography>
                <Typography>{Array.isArray(listUser) && listUser.length}</Typography>
            </div>
            <div className='report-card'>
                <Typography style={{fontWeight:'bold'}}>Tổng số phòng ban</Typography>
                <Typography>{Array.isArray(listDeaprtment) && listDeaprtment.length}</Typography>
            </div>
            <div className='report-card'>
                <Typography style={{fontWeight:'bold'}}>Tổng số công việc</Typography>
                <Typography>{Array.isArray(listRequest) && listRequest.length}</Typography>
            </div>
        </div>
        <div className='table-dashboard'>
            <TableUser data={listUser}/>
        </div>
        <div className='table-dashboard'>
            <TableDepartment data={listDeaprtment}/>
        </div>
        <div className='table-dashboard'>
            <TableRequest data={listRequest}/>
        </div>
        </div>
    );
};

export default DashBoardComponent;
