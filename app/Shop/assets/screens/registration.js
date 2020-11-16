import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Appbar} from 'react-native-paper';
import color from '../colors/colors';
import Webview from './webview';

class registration extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
          <Appbar.Content title={'https://calm-garden-34154.herokuapp.com/'} />
        </Appbar.Header>
        <Webview uri={'https://calm-garden-34154.herokuapp.com/'} />
      </SafeAreaView>
    );
  }
}

export default registration;
