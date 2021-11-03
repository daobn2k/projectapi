import { Button, Card, Col, Image, Rate, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import "./productView.css";
import { NavItem, NavLinks, NavMenu } from "./product.element";
import Search from "antd/lib/input/Search";
import { addToCart } from "../../../../comon/addToCart";
import { Link } from "react-router-dom";
import {
  changeStatus,
  GetProduct,
  getProductByCategoryId,
  SearchProduct,
} from "../../../../api";
import { storage } from "../../../../comon/storage";
import { showError } from "../../../layout/Message/showMessage";

const { Title } = Typography;
export default function ProductView({
  categoryData,
  getListCart,
  currentListFavorite,
  getFavorite,
}) {
  const [productData, setProductData] = useState();
  const [activeIndex, setActiveIndex] = useState(999);
  const [ellipsis, setEllipsis] = React.useState(true);
  const user = storage.getCurrentUser();
  function chooseValue(item) {
    setActiveIndex(item.id);
    if (item?.name === "All Product") {
      getData();
    } else {
      getProductByCategoryId(item.id)
        .then((res) => setProductData(res.data))
        .catch((err) => showError("sai roi"));
    }
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

  const handleSubmitChangeStatus = (e) => {
    if (user) {
      const submitData = {
        user_id: user.id,
        product_id: e.id,
        status: "1",
      };
      changeStatus(submitData)
        .then((res) => getFavorite(user.id))
        .catch((err) => console.log(err));
    } else {
      showError("Please login add this car to favorite");
    }
  };

  const handleDelete = () => {
    if (user) {
      getFavorite(user.id);
    }
  };

  const array = [{ id: 999, name: "All Product" }];
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
          {array?.concat(categoryData)?.map((e, index) => {
            return (
              <NavItem key={index} onClick={() => chooseValue(e)}>
                <NavLinks
                  className={activeIndex === e?.id ? "filter active" : "filter"}
                  style={{ textTransform: "uppercase" }}
                >
                  {e?.name}
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
                            ellipsis={{ rows: 2 }}
                            style={{
                              fontSize: 14,
                              marginBottom: 8,
                            }}
                            onClick={() => setEllipsis(!ellipsis)}
                          >
                            {e.product_description}
                          </Typography.Paragraph>
                        </Link>
                        <Rate allowClear={false} defaultValue={4} />
                        {Array.isArray(currentListFavorite) &&
                        currentListFavorite.length > 0 &&
                        currentListFavorite.map(
                          (item) => item.product_id === e.id
                        ) ? (
                          <HeartTwoTone
                            className="heart"
                            twoToneColor="#eb2f96"
                            onClick={handleDelete}
                          />
                        ) : (
                          <HeartOutlined
                            className="heart"
                            onClick={() => handleSubmitChangeStatus(e)}
                          />
                        )}

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
