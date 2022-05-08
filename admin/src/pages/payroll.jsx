import React from "react";
import { Col, Row } from "antd";
import { Route } from "react-router-dom";
import TimeSheet from "../components/timesheets/TimeSheet";
import PayRollComponent from "../components/payroll/PayRoll";
import AddPayRoll from "../components/payroll/AddPayroll";

export default function PayRoll() {
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
          <Route path="/payroll/timesheet" component={TimeSheet} />
          <Route path="/payroll/list" component={PayRollComponent} />
          <Route path="/payroll/new" component={AddPayRoll} />
          <Route path="/payroll/edit/:id" component={AddPayRoll} />

        </Col>
      </Row>
    </React.Fragment>
  );
}
