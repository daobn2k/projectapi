import {
  Button,
  Card,
  Col,
  Image,
  Row,
  Typography,
  Rate,
  Modal,
  message,
} from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import "./product.css";
import { ShoppingCartOutlined, HeartTwoTone } from "@ant-design/icons";
import { getFavoriteRandom } from "../../../../api";
import { addToCart } from "../../../../comon/addToCart";
import { storage } from "../../../../comon/storage";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteFavorite } from "../../../../api/profile";
const { Title, Text } = Typography;

const { confirm } = Modal;

export default function ProductFavorite({ getListCart, getFavorite }) {
  const user = storage.getCurrentUser();
  const [favorite, setFavorite] = useState();
  useEffect(() => {
    if (user) {
      getListFavorite(user);
    }
  }, []);
  const HandleAddToCart = (e) => {
    addToCart(e);
    getListCart();
  };

  function showConfirm(e) {
    confirm({
      title: "Do you want to unfollow this car?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteFavorite(e?.id)
          .then((res) => {
            console.log(user?.id);
            getListFavorite(user);
            getFavorite(user?.id);
          })
          .catch((err) => message.error("err"));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const getListFavorite = (user) => {
    getFavoriteRandom(user?.id).then((res) => setFavorite(res.data));
  };

  return (
    <div
      className="site-card-wrapper"
      style={{ display: user ? "block" : "none" }}
    >
      <Title
        style={{
          marginBottom: "1.5rem",
          fontWeight: 700,
          fontSize: 24,
          lineHeight: 1.23,
        }}
      >
        Favorite Car
      </Title>
      <Row gutter={24}>
        {Array.isArray(favorite) &&
          favorite?.length > 0 &&
          favorite?.map((e, index) => {
            return (
              <Col key={index} span={8}>
                <Card
                  style={{ marginBottom: 30, background: "#F7F7F7" }}
                  cover={
                    <Image
                      src={e?.product?.product_image}
                      style={{ height: " 300px" }}
                    />
                  }
                  bordered={false}
                >
                  <Meta
                    title={e?.product?.product_title}
                    description={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            marginBottom: 8,
                          }}
                        >
                          {e.product_price}
                        </Text>
                        <Typography.Paragraph
                          style={{
                            fontSize: 14,
                            marginBottom: 8,
                          }}
                          ellipsis={{ rows: 2 }}
                        >
                          {e?.product?.product_description}
                        </Typography.Paragraph>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                          }}
                        >
                          <Rate allowClear={false} defaultValue={3} />
                          <HeartTwoTone
                            className="heart"
                            twoToneColor="#eb2f96"
                            onClick={() => showConfirm(e)}
                          />
                        </div>

                        <Button
                          type="primary"
                          className="BTN"
                          onClick={() => HandleAddToCart(e?.product)}
                        >
                          <ShoppingCartOutlined />
                          Save To Cart
                        </Button>
                      </div>
                    }
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}
