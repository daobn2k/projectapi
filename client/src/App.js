import React from 'react';
import GlobalStyle from './globalStyled';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './features/Home/pages/HomePage';
import productPage from './features/product/productPage';
import { Container } from "./globalStyled";
import FooterClient from './components/layout/Footer/footer';
import NavBar from './components/layout/NavBar/NavBar';
import CartPage from './features/Cart';
import DetailProduct from './components/product/detailproduct';
import ContactPage from './features/Contact';

function App() {
  return (
    <Router >
      <div style={{position:'relative'}}> 
      <GlobalStyle/>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />

        <Container>
        <Route path="/product"  component={productPage} />
        <Route path ="/detail" component = {DetailProduct} /> 
        <Route path="/cart"  component={CartPage} />
        <Route path="/contact"  component={ContactPage} />
        </Container>
      
      </Switch>
        <FooterClient />
      </div>
  </Router>
     
  );
}

export default App;
