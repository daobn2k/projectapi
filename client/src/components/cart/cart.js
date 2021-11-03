import { Breadcrumb, Table, Space, Row, Col, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ButtonPayment, CardPayment, CardTotal } from "./cart.element";
import { parseMoney } from "../../comon/parseMoney";
// import { postCheckOut } from "../../api";
// import { storage } from "../../comon/storage";
// import moment from "moment";
// import { showError, showSuccess } from "../layout/Message/showMessage";
import { useHistory } from "react-router";
import { ModalCheckOut } from "./checkout";
import { deleteCart } from "../../comon/addToCart";

export default function Cart({ cartCurrent, getListCart }) {
  const history = useHistory();
  // const user = storage.getCurrentUser();
  // const cart = storage.getCartCurrent();
  const [isVisiable, setIsVisiable] = useState(false);

  // const showCheckOut = () => {
  //   setIsVisiable(true);
  // };

  const onCancel = () => {
    setIsVisiable(false);
  };

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

  // const submitCheckout = () => {
  //   if (user) {
  //     const order_code =
  //       Math.random()
  //         .toString(36)
  //         .replace(/[^a-z]+/g, "")
  //         .substr(0, 5) + Math.floor(Math.random(1000, 100000) * 100000);
  //     const order_user_id = user.id;
  //     const order_date = moment(new Date()).format("YYYY/MM/DD HH:mm");
  //     const status = "0";
  //     const product_id = cart && cart.length > 0 && cart.map((e) => e.id);
  //     const order_quantity =
  //       cart && cart.length > 0 && cart.map((e) => e.product_quantity);

  //     const dataSubmit = {
  //       order_code: order_code,
  //       order_user_id: order_user_id,
  //       order_date: order_date,
  //       status: status,
  //       product_id: product_id,
  //       order_quantity: order_quantity,
  //     };
  //     postCheckOut(dataSubmit)
  //       .then((res) => {
  //         storage.clearCartCurrent();
  //         showSuccess(
  //           "Thank you for your order.Your order will be processed and delivered to your address in the next 3-5 days"
  //         );
  //         getListCart();
  //         history.push("/");
  //       })
  //       .catch((error) => {
  //         if (error)
  //           showError(
  //             " Sorry for the inconvenience, please double check the information before ordering "
  //           );
  //       });
  //   } else {
  //     showError("Please login to order");
  //   }
  // };

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
      <ModalCheckOut isVisiable={isVisiable} onCancel={onCancel} />
    </div>
  );
}
