import React, {Component} from 'react';
import {Text, View, Button, SafeAreaView, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Title, Appbar} from 'react-native-paper';

import color from '../colors/colors';

export default class products extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content
            titleStyle={{marginStart: '25%', fontSize: 30}}
            title="Products"
          />
        </Appbar.Header>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({});
