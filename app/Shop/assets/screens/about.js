import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Appbar} from 'react-native-paper';
import color from '../colors/colors';
import Webview from './webview';
class about extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
          <Appbar.Content title={'About'} />
        </Appbar.Header>
        <Webview uri={'https://alphashop-1f940.web.app/about'} />
      </SafeAreaView>
    );
  }
}

export default about;
