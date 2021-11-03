import { Image, message, Modal, Space, Spin, Table, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { parseMoney } from "../../../comon/parseMoney";
import { storage } from "../../../comon/storage";
import { deleteFavorite } from "../../../api/profile";
import { useState } from "react";

const ListFavorite = ({
  currentListFavorite,
  isModalFavorite,
  onCancelFavorite,
  getFavorite,
}) => {
  const [loading, setLoading] = useState(false);
  const user = storage.getCurrentUser();
  const columns = [
    {
      title: "Name",
      dataIndex: "product_name",
      align: "left",
      key: "product_name",
    },
    {
      title: "Image",
      dataIndex: "product_image",
      align: "left",
      key: "product_image",
      render: (e, index) => {
        return (
          <Image
            style={{ height: 100, width: 100, objectFit: "contain" }}
            key={index}
            src={e}
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      render: (text, index) => {
        return (
          <Space size="middle" key={index}>
            {`${parseMoney(text)} VNĐ`}
          </Space>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "product_description",
      width: "300px",
      render: (e, index) => {
        return (
          <Typography.Paragraph
            style={{
              fontSize: 14,
              marginBottom: 8,
            }}
            ellipsis={{ rows: 2 }}
            key={index}
          >
            {e}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (index, record) => (
        <div style={{ textAlign: "center" }} key={index}>
          <DeleteOutlined onClick={() => showConfirm(record)} />
        </div>
      ),
    },
  ];
  function showConfirm(e) {
    setLoading(true);
    deleteFavorite(e?.id)
      .then((res) => {
        getFavorite(user?.id);
        setLoading(false);
        message.error("delete success");
      })
      .catch((err) => {
        setLoading(false);
        message.error("err");
      });
  }
  return (
    <Modal
      width={1200}
      zIndex={10000}
      closable={false}
      visible={isModalFavorite}
      onCancel={onCancelFavorite}
      className="ModalProfile"
      style={{ background: "#fff" }}
      footer={null}
    >
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={currentListFavorite?.product}
          pagination={{ pageSize: 3 }}
        />
      </Spin>
    </Modal>
  );
};

export default ListFavorite;
