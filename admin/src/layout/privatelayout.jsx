import React from "react";
import { useState } from "react";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router";

import SiderComponent from "../components/sider/sider";
import HeaderComponent from "../components/header/header";
import DashBoard from "../pages/homepage";
import Customer from "../pages/customerpage";

import { store } from "../storage";
import RequestPage from "../pages/request";
import Department from "../pages/department";
import EducationPage from "../pages/education";
const { Content } = Layout;

export default function PrivateLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const currentUser = store.getCurentUser();
  if (!currentUser) {
    return <Redirect to="/auth/login" />;
  } else {
    if (currentUser.role === "user") {
      return <Redirect to="/auth/login" />;
    }
  }
  return (
    <Layout className="App">
      <SiderComponent trigger={null} collapsible collapsed={collapsed} />

      <Layout className="site-layout">
        <HeaderComponent toggle={toggle} />
        <Switch>
          <Content style={{ overflowY: "scroll" }}>
            <Route path="/">
              <DashBoard />
            </Route>
            <Route path="/request">
              <RequestPage />
            </Route>
            <Route path="/department">
              <Department />
            </Route>
            <Route path="/customer">
              <Customer />
            </Route>
            <Route path="/education">
              <EducationPage />
            </Route>
          </Content>
        </Switch>
      </Layout>
    </Layout>
  );
}
