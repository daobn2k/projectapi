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

function App() {
  return (
    <Router >
      <div style={{position:'relative'}}> 
      <GlobalStyle/>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />

        <Container>
        <Route path="/product" exact component={productPage} />
        </Container>

      </Switch>
        <FooterClient />
      </div>
  </Router>
     
  );
}

export default App;
