import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import products from './assets/screens/products.js';
import Login from './assets/screens/Login.js';
import Homescreen from './assets/screens/Home.js';
import Itemlist from './assets/screens/Itemlist.js';
import Details from './assets/screens/Details.js';
import Drawercontent from './assets/screens/DrawerContent';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <Drawercontent {...props} />}>
        <Drawer.Screen name="Home" component={Homescreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Products" component={products} />
        <Drawer.Screen name="Itemlist" component={Itemlist} />
        <Drawer.Screen name="Details" component={Details} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
