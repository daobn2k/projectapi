import React from "react";
import { postCheckOut } from "../../api";
import { showError, showSuccess } from "../layout/Message/showMessage";
import { Form, Input, Row, DatePicker, Typography, Space } from "antd";
import moment from "moment";
import { storage } from "../../comon/storage";
import "./about.css";
import { ButtonPayment } from "../layout/NavBar/NavBar.element";
import { useHistory } from "react-router";
import { parseMoney } from "../../comon/parseMoney";

const { Title, Text } = Typography;
const About = ({ getListCart }) => {
  const history = useHistory();
  const userInfo = storage.getCurrentUser();
  const cart = storage.getCartCurrent();

  const result =
    cart && cart?.length > 0
      ? cart
          ?.map((e) => e.product_price * e.product_quantity)
          .reduce((previousValue, r) => previousValue + r)
      : [];
  const totalQuantity =
    cart && cart?.length > 0
      ? cart
          ?.map((e) => e.product_quantity)
          .reduce((previousValue, r) => previousValue + r)
      : [];
  const submitCheckout = async () => {
    if (userInfo) {
      const order_code =
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5) + Math.floor(Math.random(1000, 100000) * 100000);
      const order_user_id = userInfo.id;
      const order_date = moment(new Date()).format("YYYY/MM/DD HH:mm");
      const status = "0";
      const product_id = cart && cart.length > 0 && cart.map((e) => e.id);
      const order_quantity =
        cart && cart.length > 0 && cart.map((e) => e.product_quantity);

      const dataSubmit = {
        order_code: order_code,
        order_user_id: order_user_id,
        order_date: order_date,
        status: status,
        product_id: product_id,
        order_quantity: order_quantity,
      };
      const result = await postCheckOut(dataSubmit);
      if (result?.status === 200) {
        storage.clearCartCurrent();

        showSuccess(
          "Thank you for your order.Your order will be processed and delivered to your address in the next 3-5 days"
        );
        getListCart();

        history.push("/");
      } else {
        if (result.status >= 200)
          showError(
            " Sorry for the inconvenience, please double check the information before ordering "
          );
      }
    } else {
      showError("Please login to order");
    }
  };

  return (
    <Row className="checkout">
      <div className="card-checkout ">
        <Title className="title-checkout top">CHECK OUT INFO</Title>
        <Form
          className="form-checkout"
          name="complex-form"
          layout="vertical"
          fields={[
            {
              name: ["name"],
              value: userInfo ? userInfo?.name : "",
            },
            {
              name: ["username"],
              value: userInfo ? userInfo?.username : "",
            },
            {
              name: ["dob"],
              value: userInfo ? moment(userInfo?.dob) : "",
            },
            {
              name: ["email"],
              value: userInfo ? userInfo?.email : "",
            },
            {
              name: ["phone"],
              value: userInfo ? userInfo?.phone : "",
            },
            {
              name: ["address"],
              value: userInfo ? userInfo?.address : "",
            },
            {
              name: ["role"],
              value: userInfo ? userInfo?.role : "",
            },
          ]}
        >
          <Form.Item
            name="name"
            label="Full Name"
            className="hide-content-multi"
          >
            <Input size="large" disabled={true} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            className="hide-content-multi"
            rules={[
              {
                // required: true,
              },
              {
                pattern: /^((09|03|07|08|05)([0-9]{8}))$/g,
                message: "định dạng số điện thoại",
              },
            ]}
          >
            <Input size="large" disabled={true} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            className="hide-content-multi"
          >
            <Input size="large" disabled={true} />
          </Form.Item>
          <Form.Item name="email" label="Email" className="hide-content-multi">
            <Input size="large" disabled={true} />
          </Form.Item>
        </Form>
      </div>

      <div className="card-checkout">
        <Title className="title-checkout top">CHECK OUT BILL</Title>
        <Space size={40} className="space-container">
          <Space className="space">
            <Title className="title-checkout">Service:</Title>
            <Text className="text-checkout"> None</Text>
          </Space>
          <Space className="space">
            <Title className="title-checkout">Account Type:</Title>
            <Text className="text-checkout"> None</Text>
          </Space>
          <Space className="space">
            <Title className="title-checkout">Special offer:</Title>
            <Text className="text-checkout">None</Text>
          </Space>
          <Space className="space">
            <Title className="title-checkout">Sale:</Title>
            <Text className="text-checkout">0</Text>
          </Space>
        </Space>
        <Space className="space-total">
          <Title className="title-checkout">Total:</Title>
          <Text className="text-checkout">
            {cart?.length > 0 ? `${parseMoney(result)} VNĐ` : "0 VNĐ"}
          </Text>
        </Space>
        <ButtonPayment onClick={submitCheckout}>ORDER NOW</ButtonPayment>
      </div>
    </Row>
  );
};
export default About;
