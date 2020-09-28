import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import color from '../colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Searchbar, Button} from 'react-native-paper';

export default class Homescreen extends Component {
  constructor() {
    super();
    this.state = {
      searchpressed: false,
      searchquery: '',
    };
  }

  render() {
    var search = (
      <View style={{flexDirection: 'row', width: '80%'}}>
        <Appbar.Content
          title="SHOP"
          titleStyle={{fontWeight: 'bold', fontSize: 35, marginStart: '35%'}}
        />
        <Appbar.Action
          icon="magnify"
          size={30}
          color={color.white}
          onPress={() => {
            this.setState({searchpressed: true});
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
      </View>
    );
    if (this.state.searchpressed) {
      search = (
        <Searchbar
          onIconPress={() => {
            this.setState({searchpressed: false});
          }}
          placeholder="Search"
          style={{width: '80%', height: 40}}
          onChangeText={(e) => {
            this.setState({searchquery: e});
          }}
          value={this.state.searchquery}
        />
      );
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          {search}
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
