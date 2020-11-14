import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';

import products from './assets/screens/category';
import Login from './assets/screens/Login.js';
import Homescreen from './assets/screens/Home.js';
import Itemlist from './assets/screens/Itemlist.js';
import Details from './assets/screens/Details.js';
import MyCart from './assets/screens/MyCart';
import Order from './assets/screens/Order';
import MyOrder from './assets/screens/MyOrder';
import Drawercontent from './assets/screens/DrawerContent';
import Search from './assets/screens/Search';
import store from './assets/Redux/store';

const Drawer = createDrawerNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <Drawercontent {...props} />}>
          <Drawer.Screen name="Home" component={Homescreen} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Products" component={products} />
          <Drawer.Screen name="Itemlist" component={Itemlist} />
          <Drawer.Screen name="Details" component={Details} />
          <Drawer.Screen name="MyCart" component={MyCart} />
          <Drawer.Screen name="Order" component={Order} />
          <Drawer.Screen name="MyOrder" component={MyOrder} />
          <Drawer.Screen name="Search" component={Search} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
