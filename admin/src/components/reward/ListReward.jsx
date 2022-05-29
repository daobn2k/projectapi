import { notification, Space, Table, Input, Spin, Typography } from "antd";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { GetUser } from "../../axios";
import { LoadingOutlined } from "@ant-design/icons";
import { convertDataToOptions, convertTimeStampUTCToLocal, listReward } from "../../shared";
import AddNewDialogComponent from "../AddNewDialogComponent";
import { NotificationCommon } from "../../common/Notification";
import { store } from "../../storage";
import { deleteEvaluate, editEvaluate, getDataEvaluate, newEvaluate } from "../../axios/evaluate";
const { Search } = Input;
export default function ListReward() {
  const [data, setData] = useState();
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [params, setParams] = useState({
    page: 1,
    perPage: 5,
    keyword: "",
  });
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const user = store.getCurentUser();
  const columns = useMemo(() => {
    return [
      {
        title: "Tên khen thưởng",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Lí do khen thưởng",
        dataIndex: "reason_reward",
        key: "reason_reward",
        width:400
      },
      {
        title: "Loại khen thưởng",
        dataIndex: "category_reward",
        key: "category_reward",
        width:150,
        render: (item, record, index) => {
          const cate = listReward.find(i=>i.value === item).label
          return (
            <Typography key={index}>
              {cate ? cate : ''}
            </Typography>
          );
        },
      },
      {
        title: "Nhân viên",
        dataIndex: "earn_id",
        key: "earn_id",
        render: (item, record, index) => {
          return (
            <Typography key={index}>
              {item && item.name ? item.name : ""}
            </Typography>
          );
        },
      },
      {
        title: "Người tạo",
        dataIndex: "create_by_id",
        key: "create_by_id",
        render: (item, record, index) => {
          return (
            <Typography key={index}>
              {item && item.name ? item.name : ""}
            </Typography>
          );
        },
      },
      {
        title: "Ngày tạo",
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
          label: "Tên khen thưởng",
          name: "name",
          rules: [
            {
              message: "Vui lòng điền tên khen thưởng",
              required: true,
            },
          ],
        },
        filed: {
          placeholder: "Điền tên khen thưởng",
          size: "large",
        },
        typeFiled: "input",
      },
      {
        itemForm: {
          label: "Người nhận",
          name: "earn_id",
          rules: [
            {
              message: "Vui lòng chọn người nhận",
              required: true,
            },
          ],
        },
        filed: {
          placeholder: "Chọn người nhận",
          size: "large",
          dataOptions: listUser || [],
        },
        typeFiled: "select",
      },
      {
        itemForm: {
          label: "Loại khen thưởng",
          name: "category_reward",
          rules: [
            {
              message: "Vui chọn loại khen thưởng",
              required: true,
            },
          ],
        },
        filed: {
          placeholder: "Chọn loại khen thưởng",
          size: "large",
          dataOptions: listReward || [],
        },
        typeFiled: "select",
      },
      {
        itemForm: {
          name: "reason_reward",
          label: "Lí do khen thưởng",
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
  const getReward = (payload) => {
    setLoading(true);
    getDataEvaluate(payload)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const c = Array.isArray( data.data) &&  data.data.length > 0 ? data.data.filter(i=>i.type === 'reward') : [];
          setData(c);
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
    getReward(params);
  }, [params]);

  useEffect(() => {
    getAllUser();
  }, []);
  const handleDelete = (id) => {
    setLoading(true);
    deleteEvaluate(id)
      .then((res) => {
        notification.success({
          description: "Xóa khen thưởng thành công",
          placement: "topRight",
        });
        getReward(params);
      })
      .catch((err) => {
        notification.error({
          description: "Xóa khen thưởng thất bại",
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
        type:'reward',
      };
      res = await editEvaluate(v.id, payload);
    } else {
      payload = {
        ...v,
        create_by_id: user._id,
        edit_by_id: user._id,
        type:'reward',
      };
      res = await newEvaluate(payload);
    }
    const { status, data } = res;
    if (status === 200 || data.message === "SUCCESS") {
      getReward(params);
      NotificationCommon(
        "success",
        `${v.id ? "Chỉnh sửa" : "Tạo mới"} khen thưởng thành công`
      );
      ref.current.clearData();
    } else {
      NotificationCommon(
        "error",
        `${v.id ? "Chỉnh sửa" : "Tạo mới"} khen thưởng thất bại`
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
            title="khen thưởng"
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
            pageSize: 5,
            onChange: onChangePage,
          }}
        />
      </Space>
    </Spin>
  );
}
