import React from "react";
import "./detailproduct.css";
import _ from "lodash";
import { Card, Button, Image, Col, Typography, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { getProductbyId, getRandom } from "../../api";
import { Link, useParams, useHistory } from "react-router-dom";
import { parseMoney } from "../../comon/parseMoney";
import { addToCart } from "../../comon/addToCart";
export default function DetailProduct({ getListCart, productData }) {
  const [data, setData] = React.useState();
  const [product, setProduct] = React.useState();
  const history = useHistory();
  const { id } = useParams();
  React.useEffect(() => {
    getProductRandom();
    if (id) {
      getProductbyId(id)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {});
    }
  }, [id]);
  const handleSave = () => {
    addToCart(data);
    getListCart();
  };

  const getProductRandom = async () => {
    const result = await getRandom();

    setProduct(result.data);
  };
  return (
    <>
      <body className="container">
        <div className="site-card-border-less-wrapper">
          <Card
            bordered={false}
            className="card-image"
            cover={<Image src={data?.product_image} />}
          />
          <div className="content-detail">
            <h1 className="detail_title">Name: {data?.product_name}</h1>
            <p>Model: {data?.category?.name}</p>
            <p>Price: {`${parseMoney(data?.product_price)} VNĐ`}</p>
            <p>Description: {data?.product_description}</p>
            <div className="btn-container">
              <Button className="btn" onClick={handleSave}>
                {" "}
                Save To Cart
              </Button>
            </div>
          </div>
        </div>
        <h1 className="text">Sản phẩm liên quan</h1>
        <Row gutter={24}>
          {_.isArray(product) &&
            product?.length > 0 &&
            product?.map((e, index) => {
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
                            >
                              {e.product_description}
                            </Typography.Paragraph>
                          </Link>
                          <Button
                            type="primary"
                            className="BTN"
                            onClick={() => history.push(`/product/${e.id}`)}
                          >
                            Quick view
                          </Button>
                        </>
                      }
                    />
                  </Card>
                </Col>
              );
            })}
        </Row>
      </body>
    </>
  );
}
