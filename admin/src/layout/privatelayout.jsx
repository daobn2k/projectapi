import React from "react";
import { useState } from "react";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router";

import SiderComponent from "../components/sider/sider";
import HeaderComponent from "../components/header/header";
import DashBoard from "../pages/homepage";
import ProductPage from "../pages/productpage";
import CategoryPage from "../pages/categorypage";
import Customer from "../pages/customerpage";
import MemberShip from "../pages/membership";
import StockPage from "../pages/stockpage";

import { LocalStorage } from "../storage";
import OrderPage from "../pages/orderpage";
const { Content } = Layout;

export default function PrivateLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const currentUser = LocalStorage.getCurentUser();
  if (!currentUser) {
    if(currentUser.role === 'user'){
      return <Redirect to="/auth/login" />;
    }
  }
  return (
    <Layout className="App">
      <SiderComponent trigger={null} collapsible collapsed={collapsed} />

      <Layout className="site-layout">
        <HeaderComponent toggle={toggle} />
        <Switch>
          <Content
            className="site-layout-background"
            style={{ overflowY: "scroll" }}
          >
            <Route path="/">
              <DashBoard />
            </Route>
            <Route path="/product">
              <ProductPage />
            </Route>
            <Route path="/category">
              <CategoryPage />
            </Route>
            <Route path="/member">
              <MemberShip />
            </Route>
            <Route path="/storage">
              <StockPage />
            </Route>
            <Route path="/customer">
              <Customer />
            </Route>
            <Route path="/order">
              <OrderPage />
            </Route>
          </Content>
        </Switch>
      </Layout>
    </Layout>
  );
}
