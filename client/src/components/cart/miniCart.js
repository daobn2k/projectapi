import React, { useState } from "react";
import { Button, Drawer, Image, Modal, Space } from "antd";
import {
  ButtonPayment,
  CartDetail,
  TextCart,
  TitleCart,
} from "../layout/NavBar/NavBar.element";
import "./cart.css";
import { parseMoney } from "../../comon/parseMoney";
export default function MiniCart({ onClose, visible, cartCurrent }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const result =
    cartCurrent && cartCurrent.length
      ? cartCurrent
          ?.map((e) => e.product_price * e.product_quantity)
          .reduce((previousValue, r) => previousValue + r)
      : [];

  React.useEffect(() => {}, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Drawer
        width={450}
        title="Mini Cart Shopping "
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Space direction="vertical" style={{ width: "100%" }} size={20}>
          {cartCurrent &&
            cartCurrent.map((item, index) => {
              return (
                <CartDetail key={index}>
                  <Image
                    preview={false}
                    style={{
                      width: 100,
                      height: 100,
                      marginRight: 12,
                      cursor: "pointer",
                    }}
                    src={item.product_image}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TitleCart>{item.product_name}</TitleCart>
                    <TextCart>
                      {`${parseMoney(item.product_price)} VNĐ`} *{" "}
                      {item.product_quantity}
                    </TextCart>
                  </div>
                </CartDetail>
              );
            })}
          <TitleCart style={{ marginTop: 20 }}>
            Total: {`${parseMoney(result)} VNĐ`}
          </TitleCart>
          <div style={{ display: "flex", width: "100%" }}>
            <ButtonPayment style={{ marginRight: 20 }}>View Cart</ButtonPayment>
            <ButtonPayment onClick={showModal}>Check Out</ButtonPayment>
          </div>
        </Space>
        <Modal
          className="basic-modal"
          title="Check Out"
          visible={isModalVisible}
          footer={[
            <>
              <Button
                key="checkout"
                className="btn_ok"
                type="primary"
                size="large"
                onClick={handleOk}
              >
                Check Out Now
              </Button>
              <Button
                key="cancel"
                className="btn_cancel"
                size="large"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>,
          ]}
        >
          <p>
            We will contact you after placing your order.Please click the "Check
            Out Now" button to place your order
          </p>
          <p>Thank you for your visit!</p>
        </Modal>
      </Drawer>
    </>
  );
}
