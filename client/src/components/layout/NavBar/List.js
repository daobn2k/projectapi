import {
  notification,
  Space,
  Table,
  Tag,
  Input,
  Spin,
  DatePicker,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import "./order.css";
import { getOrderById } from "../../../api";
import { DeleteOrder, SearchOrder } from "../../../api/order";
import { storage } from "../../../comon/storage";
import ListDetail from "./ListDetail";
const { Search } = Input;
export default function List() {
  const [loading, setLoading] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const user = storage.getCurrentUser();

  const columns = [
    {
      title: "Code",
      dataIndex: "order_code",
      key: "order_code",
      render: (e) => {
        return (
          <Typography.Text
            style={{ cursor: "pointer" }}
            onClick={() => showDetail(e)}
          >
            {e}
          </Typography.Text>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "order_date",
      key: "order_date",
      align: "center",

      render: (e) => {
        return moment(e).format("DD/MM/YYYY");
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",

      render: (status) => (
        <Tag
          color={status === "0" ? "cyan" : status === "1" ? " magenta" : "blue"}
        >
          {status === "0"
            ? "In Process"
            : status === "1"
            ? "Processing"
            : "Processed"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (e, index) => {
        return (
          <Space size="middle" key={index}>
            <AiFillDelete onClick={() => handleDelete(e.id)} />
          </Space>
        );
      },
    },
  ];
  const [currentData, setCurrentData] = useState([]);

  const LoadingOrder = (id) => {
    setLoading(true);
    getOrderById(id)
      .then((res) => {
        setCurrentData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user && user?.id !== "") {
      LoadingOrder(user.id);
    }
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    DeleteOrder(id)
      .then((res) => {
        notification.success({
          description: "Delete Order SuccessFully !",
          placement: "topRight ",
        });
        setLoading(false);
        setTimeout(LoadingOrder(user.id), 3000);
      })
      .catch((err) => {
        notification.warning({
          description: "Delete Order Failed !",
          placement: "topRight ",
        });
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    if (e === "") {
      LoadingOrder();
    } else {
      SearchOrder({ key: e })
        .then((res) => setCurrentData(res.data))
        .catch((err) => console.log(err));
    }
  };

  const showDetail = (e) => {
    setOrderCode(e);
  };

  const deleteOrderCode = () => {
    setOrderCode("");
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin indicator={antIcon} spinning={loading} delay={2}>
      <Space size={14} className="space_order">
        {orderCode !== "" ? (
          <ListDetail
            order_code={orderCode}
            deleteOrderCode={deleteOrderCode}
          />
        ) : (
          <>
            <div className="top-table">
              <Search
                allowClear
                placeholder="Search Order By Name"
                optionFilterProp="children"
                className="input-search"
                // onSearch={handleSearch}
                enterButton
              ></Search>
              <DatePicker
                placeholder="Search By Date"
                onChange={(_, dateString) => handleSearch(dateString)}
              />
            </div>

            <Table
              columns={columns}
              dataSource={currentData}
              pagination={{ pageSize: 5 }}
            />
          </>
        )}
      </Space>
    </Spin>
  );
}
