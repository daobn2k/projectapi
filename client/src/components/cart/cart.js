import { Breadcrumb, Table, Space, Row, Col, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import React from "react";
import { ButtonPayment, CardPayment, CardTotal } from "./cart.element";
import { parseMoney } from "../../comon/parseMoney";
import { useHistory } from "react-router";
import { deleteCart } from "../../comon/addToCart";

export default function Cart({ cartCurrent, getListCart }) {
  const history = useHistory();

  const columns = [
    {
      title: "Product",
      dataIndex: "product_image",
      key: "product_image",
      render: (e, index) => {
        return <Image key={index} src={e} style={{ width: 200 }} />;
      },
    },
    {
      title: "Name",
      dataIndex: "product_name",
      align: "left",
      key: "product_name",
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
      width: "500px",
      dataIndex: "product_description",
      key: "product_description",
    },

    {
      title: "Action",
      align: "center",
      key: "action",
      render: (index, record) => (
        <div style={{ textAlign: "center" }} key={index}>
          <DeleteOutlined onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  const handleDelete = (data) => {
    deleteCart(data);
    getListCart();
  };
  return (
    <div>
      <Breadcrumb
        separator=">"
        style={{
          fontSize: 15,
          padding: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>

        <Breadcrumb.Item>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={cartCurrent} />
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <CardPayment>
            <CardTotal>
              <ButtonPayment
                onClick={() => {
                  history.push("/checkout");
                }}
              >
                CHECKOUT NOW
              </ButtonPayment>
            </CardTotal>
            {/* </CardBottom> */}
          </CardPayment>
        </Col>
      </Row>
    </div>
  );
}
