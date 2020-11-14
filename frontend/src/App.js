import React from "react";
import "./App.css";
// import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Deal from "./containers/Deal/Deal";
import Details from "./components/details/details";
import Cart from "./components/Cart/Cart";
import ProductList from "./components/ProductList/ProductList";
import MyOrder from "./components/MyOrder/MyOrder";
import Checkout from "./components/Checkout/Checkout";
import About from "./components/About/About";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/deal" exact component={Deal} />
          <Route path="/details" component={Details} />
          <Route path="/Cart" exact component={Cart} />
          <Route path="/ProductList" component={ProductList} />
          <Route path="/Checkout" exact component={Checkout} />
          <Route path="/MyOrder" exact component={MyOrder} />
          <Route path="/About" exact component={About} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
