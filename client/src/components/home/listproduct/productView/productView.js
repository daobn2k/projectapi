import { Button, Card, Col, Image, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./productView.css";
import { NavItem, NavLinks, NavMenu } from "./product.element";
import Search from "antd/lib/input/Search";
import { addToCart } from "../../../../comon/addToCart";
import { Link } from "react-router-dom";
const { Title } = Typography;
export default function ProductView({ productData, categoryData }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [ellipsis, setEllipsis] = React.useState(true);
  function chooseValue(item) {
    setActiveIndex(item.id);
  }
  const onSearch = (value) => console.log(value);

  const HandleAddToCart = (e) => {
    addToCart(e);
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
        PRODUCT VIEW
      </Title>
      <div className="Fitler_List">
        <NavMenu>
          {categoryData?.map((e, index) => {
            return (
              <NavItem key={index} onClick={() => chooseValue(e)}>
                <NavLinks
                  className={activeIndex === e.id ? "filter active" : "filter"}
                >
                  {e.name}
                </NavLinks>
              </NavItem>
            );
          })}
        </NavMenu>

        <Search
          placeholder="Input Car Search ... "
          onSearch={onSearch}
          enterButton
          style={{
            maxWidth: "400px",
            borderRadius: "10px",
            fontSize: 14,
            lineHeight: 20,
            height: 40,
          }}
        />
      </div>
      <Row gutter={24}>
        {productData &&
          productData.map((e, index) => {
            return (
              <Col key={index} span={6}>
                <Card
                  cover={
                    <Image
                      preview={false}
                      src={e.product_image}
                      style={{ height: " 200px" }}
                    />
                  }
                  bordered={false}
                >
                  <Meta
                    description={
                      <>
                        <Link
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                          to={`/product/${e.id}`}
                        >
                          <Typography.Title className="product_title">
                            {e.product_name}{" "}
                          </Typography.Title>
                          <Typography.Paragraph
                            ellipsis={
                              ellipsis
                                ? { rows: 2, expandable: true, symbol: "more" }
                                : false
                            }
                            style={{
                              fontSize: 14,
                              marginBottom: 8,
                            }}
                            onClick={() => setEllipsis(!ellipsis)}
                          >
                            {e.product_description}
                          </Typography.Paragraph>
                        </Link>
                        <Button
                          type="primary"
                          className="BTN"
                          onClick={() => HandleAddToCart(e)}
                        >
                          {" "}
                          <ShoppingCartOutlined />
                          Add To Cart
                        </Button>
                      </>
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
