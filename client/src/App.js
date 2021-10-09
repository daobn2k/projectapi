import React, { useEffect, useState } from "react";
import GlobalStyle from "./globalStyled";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./features/Home/pages/HomePage";
import { Container } from "./globalStyled";
import FooterClient from "./components/layout/Footer/footer";
import NavBar from "./components/layout/NavBar/NavBar";
import CartPage from "./features/Cart";
import ContactPage from "./features/Contact";
import AboutPage from "./features/About";
import { GetCategory, GetProduct } from "./api";
import ProductPage from "./features/product/productPage";
import { storage } from "./comon/storage";


function App() {
  const [productData, setProductData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [cartCurrent, setCartCurrent] = useState();

  useEffect(() => {
    GetProduct().then((res) => setProductData(res.data));
    GetCategory().then((res) => setCategoryData(res.data));
    getListCart();
  }, []);

  const getListCart = () => {
    setCartCurrent(storage.getCartCurrent());
  };
  return (
    <Router>
      <div style={{ position: "relative" }}>
        <GlobalStyle />
        <NavBar cartCurrent={cartCurrent} />
        <Switch>
          <Route path="/" exact>
            <HomePage
              productData={productData}
              categoryData={categoryData}
              getListCart={getListCart}
            />
          </Route>
          <Container>
            <Route path="/product">
              <ProductPage
                productData={productData}
                categoryData={categoryData}
                getListCart={getListCart}
              />
            </Route>
            <Route path="/cart">
              
              <CartPage cartCurrent={cartCurrent} getListCart={getListCart} />
            </Route>
            <Route path="/contact" component={ContactPage} />
            <Route path="/about" component={AboutPage} />
          </Container>
        </Switch>
        <FooterClient />
      </div>
    </Router>
  );
}

export default App;
