import React from 'react';
import GlobalStyle from './globalStyled';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import HomePage from './features/Home/pages/HomePage';
import productPage from './features/product/productPage';
import { Container } from "./globalStyled";

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
      </div>
  </Router>
     
  );
}

export default App;
