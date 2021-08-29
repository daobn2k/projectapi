import './App.css';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SiderComponent from './components/sider/sider';
import HeaderComponent from './components/header/header';
import { useState } from 'react';
import DashBoard from './pages/homepage';
import ProductPage from './pages/productpage';
import CategoryPage from './pages/categorypage';
import MemberShip from './pages/membership';
import Customer from './pages/customerpage';

const {  Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false)
 
  const  toggle = () => {
    setCollapsed(!collapsed)
  };
  return (
    <Router>
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
      </Router> 
  );
}

export default App;
