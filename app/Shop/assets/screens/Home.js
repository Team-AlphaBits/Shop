import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import color from '../colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Searchbar, Button} from 'react-native-paper';

export default class Homescreen extends Component {
  

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          backgroundColor={color.MintyGreenDark}
          barStyle="light-content"
        />
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content
          title="SHOP"
          titleStyle={{fontWeight: 'bold', fontSize: 35, marginStart: '35%'}}
        />
        <Appbar.Action
          icon="magnify"
          size={30}
          color={color.white}
          onPress={() => {
            this.props.navigation.navigate('Search');
          }}
        />
        <Appbar.Action
          icon="cart"
          color={color.white}
          size={30}
          onPress={() => {
            this.props.navigation.navigate('MyCart');
          }}
        />
        </Appbar.Header>
        <View>
          <Text>Hello</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
