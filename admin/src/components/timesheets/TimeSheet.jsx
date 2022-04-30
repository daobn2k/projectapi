import { notification, Space, Table, Input, Spin, Typography } from "antd";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { getDataTimeSheet, GetUser } from "../../axios";
import { LoadingOutlined } from "@ant-design/icons";
import { convertDataToOptions, convertTimeStampUTCToLocal } from "../../shared";
import AddNewDialogComponent from "../AddNewDialogComponent";
import { NotificationCommon } from "../../common/Notification";
import { store } from "../../storage";
import { createTimeSheet, deleteTimeSheet, updateTimeSheet } from "../../axios/timesheet";
const { Search } = Input;
export default function TimeSheet() {
  const [data, setData] = useState();
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    keyword: "",
  });
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const user = store.getCurentUser();
  const columns = useMemo(() => {
    return [
      {
        title: "Tên nhân viên",
        dataIndex: "user_id",
        key: "user_id",
        align: "center",
        render: (item, record, index) => {
          return (
            <Typography key={index}>
              {item && item.name ? item.name : ''}
            </Typography>
          );
        },
      },
      {
        title: "Giờ vào",
        dataIndex: "start_date_time",
        key: "start_date_time",
        align: "center",
        render: (item, record, index) => {
          return (
            <Typography key={index}>
                {convertTimeStampUTCToLocal(item,"DD/MM/YYYY HH:mm:ss")} 
          </Typography>
          );
        },
      },
      {
        title: "Giờ ra",
        dataIndex: "end_date_time",
        key: "end_date_time",
        align: "center",
        render: (item, record, index) => {
          return (
            <Typography key={index}>
              {item ? convertTimeStampUTCToLocal(item,"DD/MM/YYYY HH:mm:ss") : ''}
            </Typography>
          );
        },
      },
      {
        title: "Ngày làm việc",
        dataIndex: "create_date",
        key: "create_date",
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
        title: "Thao tác",
        key: "action",
        width: 100,
        render: (e) => (
          <Space size="middle">
            <AiOutlineEdit key={e.id} onClick={() => handleEdit(e)} />
            <AiFillDelete key={e.id} onClick={() => handleDelete(e._id)} />
          </Space>
        ),
      },
    ];
  }, [data]);
  const dataForm = useMemo(() => {
    return [
      {
        itemForm: {
          label: "Tên phòng ban",
          name: "name",
          rules: [
            {
              message: "Vui lòng điền tên phòng ban",
              required: true,
            },
          ],
        },
        filed: {
          placeholder: "Điền tên phòng ban",
          size: "large",
        },
        typeFiled: "input",
      },
      {
        itemForm: {
          label: "Tên trưởng phòng ban",
          name: "admin_user_id",
          rules: [
            {
              message: "Vui lòng chọn trưởng phòng ban",
              required: true,
            },
          ],
        },
        filed: {
          placeholder: "Chọn trưởng phòng ban",
          size: "large",
          dataOptions: listUser || [],
        },
        typeFiled: "select",
      },
      {
        itemForm: {
          name: "description",
          label: "Mô tả",
          rules: [
            {
              required: false,
            },
          ],
        },
        filed: {
          placeholder: "Điền thông tin mô tả",
          size: "large",
          autoSize: { minRows: 3, maxRows: 10 },
        },
        typeFiled: "area",
      },
    ];
  }, [listUser]);
  const getTimeSheets = (payload) => {
    setLoading(true);
    getDataTimeSheet(payload)
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

  const getAllUser = async () => {
    let d;
    const res = await GetUser();
    const { data } = res;
    if (data.message === "SUCCESS") {
      d = convertDataToOptions(data.data);
      setListUser(d);
    } else {
      NotificationCommon("error", "Không lấy được thông tin người dùng");
    }
  };
  useEffect(() => {
    getTimeSheets(params);
  }, [params]);

  useEffect(() => {
    getAllUser();
  }, []);
  const handleDelete = (id) => {
    setLoading(true);
    deleteTimeSheet(id)
      .then((res) => {
        notification.success({
          description: "Xóa phòng ban thành công",
          placement: "topRight",
        });
        getTimeSheets(params);
      })
      .catch((err) => {
        notification.error({
          description: "Xóa phòng ban thất bại",
          placement: "topRight",
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
      res = await updateTimeSheet(v.id, payload);
    } else {
      payload = {
        ...v,
        create_by_id: user._id,
        edit_by_id: user._id,
      };
      res = await createTimeSheet(payload);
    }
    const { status, data } = res;
    if (status === 200 || data.message === "SUCCESS") {
      getTimeSheets(params);
      NotificationCommon(
        "success",
        `${v.id ? "Chỉnh sửa" : "Tạo mới"} phòng ban thành công`
      );
      ref.current.clearData();
    } else {
      NotificationCommon(
        "error",
        `${v.id ? "Chỉnh sửa" : "Tạo mới"} phòng ban thất bại`
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
            title="chấm công"
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
            pageSize: 10,
            onChange: onChangePage,
          }}
        />
      </Space>
    </Spin>
  );
}
