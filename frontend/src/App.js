import React from "react";
import "./App.css";
// import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Deal from "./containers/Deal/Deal";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/deal" exact component={Deal} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
