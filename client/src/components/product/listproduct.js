import { Breadcrumb, Button, Card, Col, Image, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./productView.css";
import { NavItem, NavLinks, NavMenu } from "./product.element";
import Search from "antd/lib/input/Search";
import { Link } from "react-router-dom";
import { addToCart } from "../../comon/addToCart";
import { GetProduct, SearchProduct } from "../../api";
export default function ListProduct({ getListCart }) {
  const [productData, setProductData] = useState();
  const [ellipsis, setEllipsis] = React.useState(true);
  const [activeIndex, setActiveIndex] = useState(1);
  function chooseValue(item) {
    setActiveIndex(item.id);
  }
  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    GetProduct().then((res) => setProductData(res.data));
  };
  const onSearch = (value) => {
    SearchProduct({ key: value }).then((res) => setProductData(res.data));
  };

  const HandleAddToCart = (e) => {
    addToCart(e);
    getListCart();
  };
  return (
    <div className="site-card-wrapper">
      <Breadcrumb
        separator=">"
        style={{
          fontSize: 15,
          padding: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>

        <Breadcrumb.Item>List Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="filter-product">
        <NavMenu>
          {Array.isArray(productData) &&
            productData.length > 0 &&
            productData.map((e, index) => {
              return (
                <NavItem key={index} onClick={() => chooseValue(e)}>
                  <NavLinks
                    className={
                      activeIndex === e.id ? "filter active" : "filter"
                    }
                  >
                    {e.title}
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
            height: "40px",
          }}
        />
      </div>
      <Row gutter={24}>
        {productData &&
          productData.map((e, index) => {
            return (
              <Col key={index} span={6}>
                <Card
                  style={{ marginBottom: 30, background: "#F7F7F7" }}
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
                          Save To Cart
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
