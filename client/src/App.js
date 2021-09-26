import React, { useEffect, useState } from 'react';
import GlobalStyle from './globalStyled';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './features/Home/pages/HomePage';
import { Container } from "./globalStyled";
import FooterClient from './components/layout/Footer/footer';
import NavBar from './components/layout/NavBar/NavBar';
import CartPage from './features/Cart';
import ContactPage from './features/Contact';
import AboutPage from './features/About';
import { GetProduct } from './api';
import ProductPage from './features/product/productPage';

function App() {

  const [productData, setProductData] = useState()
  useEffect(() => {
    
    GetProduct()

    .then(res=>setProductData(res.data))
  },[])
  return (
    <Router >
      <div style={{position:'relative'}}> 
      <GlobalStyle/>
      <NavBar />
      <Switch>
        <Route path="/" exact >
          <HomePage productData={productData}/>
           </Route>
        <Container>
        <Route path="/product">
          <ProductPage productData={productData}/>
        </Route>
        <Route path="/cart"  component={CartPage} />
        <Route path="/contact"  component={ContactPage} />
        <Route path="/about"  component={AboutPage} />
        </Container>
      </Switch>
        <FooterClient />
      </div>
  </Router>
     
  );
}

export default App;
