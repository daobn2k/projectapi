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
function App() {
  return (
    <Router>
      <GlobalStyle/>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/product" exact component={productPage} />

      </Switch>
  </Router>
     
  );
}

export default App;
