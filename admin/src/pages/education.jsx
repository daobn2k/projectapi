import React from "react";
import { Col, Row } from "antd";
import { Route } from "react-router-dom";
import ListEducation from "../components/education/ListEducation";

export default function EducationPage() {
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
          <Route path="/education/list" component={ListEducation} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
