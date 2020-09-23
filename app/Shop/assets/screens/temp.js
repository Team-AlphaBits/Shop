import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';

export default class temp extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <TextInput placeholder={'Enter your name :'}></TextInput>
      </View>
    );
  }
}
