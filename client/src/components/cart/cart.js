import { Breadcrumb, Table, Space, Row, Col, Input, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd/lib/radio";

import React from "react";
import {
  ButtonPayment,
  CardBottom,
  CardPayment,
  CardTop,
  CardTotal,
  TextCard,
  TitleCard,
} from "./cart.element";
import { parseMoney } from "../../comon/parseMoney";
import { decrementCart, incrementCart } from "../../comon/addToCart";

export default function Cart({ cartCurrent, getListCart }) {
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
      title: "Quantity",
      align: "center",
      dataIndex: "product_quantity",
      key: "product_quantity",
      render: (e, record, index) => {
        console.log(record);
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            key={index}
          >
            <Button
              style={{
                width: 40,
                fontSize: 16,
                marginRight: 8,
              }}
              onClick={() => {
                incrementCart(record.id);
                getListCart();
              }}
            >
              +
            </Button>
            <Input
              style={{ width: 40, textAlign: "center" }}
              value={record.product_quantity}
              disabled
            />
            <Button
              style={{
                width: 40,
                fontSize: 16,
                marginLeft: 8,
              }}
              onClick={() => {
                decrementCart(record.id);
                getListCart();
              }}
            >
              -
            </Button>
          </div>
        );
      },
    },
    {
      title: "Total",
      key: "total",
      render: (text, index) => {
        const totalProduct = text?.product_price * text?.product_quantity;
        return (
          <Space size="middle" key={index}>
            {`${parseMoney(totalProduct)} VNĐ`}
          </Space>
        );
      },
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (index) => (
        <div style={{ textAlign: "center" }} key={index}>
          <DeleteOutlined />
        </div>
      ),
    },
  ];
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
            justifyContent: "space-between",
            paddingTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Enter Your Coupo"
              style={{
                width: "220px",
                height: "48px",
                color: " #333",
                padding: "0px 20px",
                fontSize: 16,
                boxShadow: "0px 0px 5px #0000000a",
              }}
            />
            <Button
              style={{
                fontSize: 16,
                marginLeft: 10,
                height: "48px",
                padding: "0px 20px",
                background: "#fff",
                boxShadow: "0px 0px 5px #0000000a",
                display: "flex",
                alignItems: "center",
              }}
            >
              APPLY
            </Button>
          </div>
          <CardPayment>
            <CardTop>
              <CardTotal>
                <TitleCard>Card Subtotal</TitleCard>
                <TextCard>$330.00</TextCard>
              </CardTotal>
              <CardTotal>
                <TitleCard>ShippingFree</TitleCard>
                <TextCard>Free</TextCard>
              </CardTotal>
              <CardTotal>
                <TitleCard>You Save</TitleCard>
                <TextCard>$20.00</TextCard>
              </CardTotal>
            </CardTop>
            <CardBottom>
              <CardTotal>
                <TitleCard>You Pay</TitleCard>
                <TextCard>$310.00</TextCard>
              </CardTotal>
              <CardTotal>
                <ButtonPayment>CHECKOUT</ButtonPayment>
              </CardTotal>
            </CardBottom>
          </CardPayment>
        </Col>
      </Row>
    </div>
  );
}
