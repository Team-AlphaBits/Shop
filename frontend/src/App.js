import React from 'react';
import './App.css';
// import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Deal from './containers/Deal/Deal';
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Layout>
       <Switch>
       <Route path="/deal" component={Deal} />
        <Route path="/" component={Home} />
       </Switch>
      </Layout>
    </div>
  );
}

export default App;
