import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./layout/login/LoginPage";
import PrivateLayout from "./layout/privatelayout";
import { NotFound } from "./layout/notFound";
import SignPage from "./layout/sign/SignPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth/login">
          <LoginPage />
        </Route>
        <Route exact path="/auth/sign">
          <SignPage />
        </Route>
        <Route>
          <PrivateLayout />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
