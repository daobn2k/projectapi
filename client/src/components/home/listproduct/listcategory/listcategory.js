import { Col, Image, Row } from "antd";
import React from "react";
import "./listcategory.css";

export default function ListCategory() {
  const data = [
    {
      image: "https://technext.github.io/furn./assets/images/clients/c1.png",
    },
    {
      image: "https://technext.github.io/furn./assets/images/clients/c2.png",
    },
    {
      image: "https://technext.github.io/furn./assets/images/clients/c3.png",
    },
    {
      image: "https://technext.github.io/furn./assets/images/clients/c4.png",
    },
    {
      image: "https://technext.github.io/furn./assets/images/clients/c5.png",
    },
  ];
  return (
    <div className="ListLogo">
      <Row
        gutter={24}
        style={{
          justifyContent: "center",
          height: "100%",
          width: "100%",
          alignItems: "center",
        }}
      >
        {data.map((e, index) => {
          return (
            <Col key={index} span={4}>
              <Image src={e.image} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
