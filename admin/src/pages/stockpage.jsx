import { Col, Row } from "antd";
import React from "react";
import { Route } from "react-router-dom";

import AddStock from "../components/stock/addStock";
import listStock from "../components/stock/listStock";
// import Stock from '../components/stock/listStock'

export default function StockPage() {
  return (
    <React.Fragment>
      <Row style={{ width: "100%", height: "100%" }}>
        <Col
          style={{
            width: "100%",
            height: "100%",
            margin: "24px 16px",
            padding: 24,
          }}
        >
          <Route path="/storage/list" component={listStock} />
          <Route path="/storage/add" component={AddStock} />
          <Route path="/storage/edit/:id" component={AddStock} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
