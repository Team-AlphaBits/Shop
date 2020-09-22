import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Header from './Header';

class Homescreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Header/>
        </View>
        <View>
        <Text>Hello</Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default Homescreen;
