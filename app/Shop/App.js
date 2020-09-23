import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Homescreen from './assets/screens/Home.js';
import products from './assets/screens/products.js';
import Login from './assets/screens/Login.js';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Homescreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Products" component={products} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
