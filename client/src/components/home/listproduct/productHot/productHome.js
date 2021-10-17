import { Button, Card, Col, Image, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import "./product.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getProductFavorite } from "../../../../api";
import { addToCart } from "../../../../comon/addToCart";
const { Title, Text } = Typography;

export default function ProductHot({ getListCart }) {
  const [data, setData] = useState();
  useEffect(() => {
    getProductFavorite().then((res) => setData(res.data));
  }, []);

  const HandleAddToCart = (e) => {
    addToCart(e);
    getListCart();
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
        Hot Car
      </Title>
      <Row gutter={24}>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((e, index) => {
            return (
              <Col key={index} span={8}>
                <Card
                  cover={
                    <Image src={e.product_image} style={{ height: " 300px" }} />
                  }
                  bordered={false}
                  style={{ marginBottom: 30, background: "#F7F7F7" }}
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
                        <Button
                          type="primary"
                          className="BTN"
                          onClick={() => {
                            HandleAddToCart(e);
                          }}
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
