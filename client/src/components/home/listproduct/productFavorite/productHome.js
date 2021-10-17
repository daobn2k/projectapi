import { Button, Card, Col, Image, Row, Typography, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import "./product.css";
import { ShoppingCartOutlined, HeartTwoTone } from "@ant-design/icons";
import { getProductHot } from "../../../../api";
import { addToCart } from "../../../../comon/addToCart";
import { storage } from "../../../../comon/storage";
const { Title, Text } = Typography;

export default function ProductFavorite({ getListCart, getFavorite }) {
  const [data, setData] = useState();
  const user = storage.getCurrentUser();
  useEffect(() => {
    getProductHot().then((res) => setData(res.data));
  }, []);
  const HandleAddToCart = (e) => {
    addToCart(e);
    getListCart();
  };

  const handleDelete = () => {
    if (user) {
      getFavorite(user.id);
    }
  };

  return (
    <div className="site-card-wrapper">
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
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((e, index) => {
            return (
              <Col key={index} span={8}>
                <Card
                  style={{ marginBottom: 30, background: "#F7F7F7" }}
                  cover={
                    <Image src={e.product_image} style={{ height: " 300px" }} />
                  }
                  bordered={false}
                >
                  <Meta
                    title={e.product_title}
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
                          {e.product_description}
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
                            onClick={handleDelete}
                          />
                        </div>

                        <Button
                          type="primary"
                          className="BTN"
                          onClick={() => HandleAddToCart(e)}
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
