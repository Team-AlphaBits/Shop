import React, {Component} from 'react';
import {View, SafeAreaView, Button} from 'react-native';

import color from '../colors/colors';
import {Appbar, Searchbar} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchquery: '',
    };
  }

  RetriveCredentialAndLogin = async () => {
    let values;
    try {
      values = await AsyncStorage.multiGet(['email', 'password']);
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="keyboard-backspace"
            size={30}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
          <Searchbar
            onIconPress={() => {
              console.log(this.state.searchquery);
            }}
            placeholder="Search"
            style={{width: '80%', height: 40}}
            onChangeText={(e) => {
              this.setState({searchquery: e});
            }}
            value={this.state.searchquery}
          />
        </Appbar.Header>
        <View>
          <Button
            title="Print"
            onPress={() => {
              this.RetriveCredentialAndLogin();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
