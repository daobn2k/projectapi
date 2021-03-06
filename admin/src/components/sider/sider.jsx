import React from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { AiOutlineUser, AiOutlineAreaChart } from 'react-icons/ai';
import { AppstoreOutlined, FileWordOutlined } from '@ant-design/icons';
import { BsDot } from 'react-icons/bs';
import './sider.css';
import { Link } from 'react-router-dom';
import { store } from '../../storage';
import { checkPermisstionUser } from '../../shared';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SiderComponent({ collapsed }) {
    const infoUser = store.getCurentUser();

    const { role_id = {}, department_id = {} } = infoUser;

    const { code = '' } = role_id;

    const { name: department_name } = department_id;

    const isShowListUser = department_name === 'Ban Nhân Sự' ? true : false;

    const role = checkPermisstionUser(code);

    console.log(role,"role");
    return (
        <Sider style={{ background: '#222A44' }} className="SiderBar" collapsed={collapsed}>
            <div className="Logo">
                {/* <Image
          src="/image/carfoot.png"
          preview={false}
          style={{
            width: collapsed ? "50px" : "100px",
            height: collapsed ? "50px" : "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        /> */}
            </div>
            <div style={{ width: '100%' }}>
                <Menu
                    className="MenuBar"
                    style={{ background: '#222A4' }}
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item
                        key="1"
                        style={{ color: '#fff' }}
                        icon={<AppstoreOutlined />}
                        className="MenuItem"
                    >
                        <Link to="/">Thống kê chung</Link>
                    </Menu.Item>
                    {
                      role === 'admin' &&
                      <Menu.Item
                      key="3"
                      style={{ color: '#fff' }}
                      icon={<AiOutlineAreaChart />}
                      className="MenuItem"
                  >
                      <Link to="/role">Quản lý chức vụ</Link>
                  </Menu.Item>
                    }
                    <SubMenu
                        className="SubMenu"
                        key="sub1"
                        icon={<AiOutlineUser />}
                        title="Nhân viên"
                    >
                        {(role === 'admin' ||isShowListUser )&& (
                                <Menu.Item
                                    key="4"
                                    icon={<BsDot />}
                                    style={{ color: '#fff', paddingLeft: 20 }}
                                >
                                    <Tooltip title="Danh sách nhân viên" placement="top">
                                        <Link to="/customer/list">Danh sách nhân viên</Link>
                                    </Tooltip>
                                </Menu.Item>
                            )}

                        <Menu.Item
                            key="6"
                            icon={<BsDot />}
                            style={{ color: '#fff', paddingLeft: 20 }}
                        >
                            <Tooltip title="Danh sách khen thưởng" placement="top">
                                <Link to="/reward/list">Danh sách khen thưởng</Link>
                            </Tooltip>
                        </Menu.Item>
                        <Menu.Item
                            key="7"
                            icon={<BsDot />}
                            style={{ color: '#fff', paddingLeft: 20 }}
                        >
                            <Tooltip title="Danh sách phạt" placement="top">
                                <Link to="/chastise/list">Danh sách phạt</Link>
                            </Tooltip>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        className="SubMenu"
                        key="sub2"
                        title="Công việc"
                        icon={<FileWordOutlined />}
                    >
                        <Menu.Item
                            key="8"
                            icon={<BsDot />}
                            style={{ color: '#fff', paddingLeft: 20 }}
                        >
                            <Tooltip title="Danh sách công việc" placement="top">
                                <Link to="/request/list">Danh sách công việc</Link>
                            </Tooltip>
                        </Menu.Item>
                    </SubMenu>
                    {role === 'admin' && (
                        <SubMenu
                            className="SubMenu"
                            key="sub3"
                            title="Phòng Ban"
                            icon={<FileWordOutlined />}
                        >
                            <Menu.Item
                                key="9"
                                icon={<BsDot />}
                                style={{ color: '#fff', paddingLeft: 20 }}
                            >
                                <Tooltip title="Danh sách phòng ban" placement="top">
                                    <Link to="/department/list">Danh sách phòng ban</Link>
                                </Tooltip>
                            </Menu.Item>
                        </SubMenu>
                    )}

                    <SubMenu
                        className="SubMenu"
                        key="sub4"
                        title="Bảng lương"
                        icon={<FileWordOutlined />}
                    >
                        <Menu.Item
                            key="10"
                            icon={<BsDot />}
                            style={{ color: '#fff', paddingLeft: 20 }}
                        >
                            <Tooltip title="Danh sách chấm công" placement="top">
                                <Link to="/payroll/timesheet">Danh sách chấm công</Link>
                            </Tooltip>
                        </Menu.Item>
                        <Menu.Item
                            key="11"
                            icon={<BsDot />}
                            style={{ color: '#fff', paddingLeft: 20 }}
                        >
                            <Tooltip title="Danh sách lương" placement="top">
                                <Link to="/payroll/list">Danh sách lương</Link>
                            </Tooltip>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="12"
                        style={{ color: '#fff' }}
                        icon={<AppstoreOutlined />}
                        className="MenuItem"
                    >
                        <Link to="/education/list">Trình độ</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Sider>
    );
}
