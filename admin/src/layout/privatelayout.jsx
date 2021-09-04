import React from 'react'
import { useState } from 'react';
import { Layout } from 'antd';
import { Redirect, Route,Switch } from 'react-router';

import SiderComponent from '../components/sider/sider'
import HeaderComponent from '../components/header/header'
import DashBoard from '../pages/homepage'
import ProductPage from '../pages/productpage'
import CategoryPage from '../pages/categorypage'
import Customer from '../pages/customerpage'
import MemberShip from '../pages/membership'
const {  Content } = Layout;

export default function  PrivateLayout(){
    const [collapsed, setCollapsed] = useState(false)
 
    const  toggle = () => {
      setCollapsed(!collapsed)
    };
    const isLoggedIn = ''
    if (!isLoggedIn) {
     return <Redirect to="/auth/login" />;
   }
  return (
 <Layout className = "App">
   
<SiderComponent trigger={null} collapsible collapsed={collapsed}/>

<Layout className="site-layout">
<HeaderComponent toggle={toggle}/>
<Switch>

<Content
  className="site-layout-background"
  style={{overflowY:'scroll'}}
>
<Route path="/">
  <DashBoard />
</Route>
<Route path="/product" >
  <ProductPage />
</Route>
<Route path="/category">
<CategoryPage />
</Route>
<Route path="/membership">
<MemberShip />
</Route>
<Route path="/customer">
<Customer />
</Route>
</Content>
</Switch>

</Layout>
</Layout>
  );
}

