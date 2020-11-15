import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

class webview extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView source={{uri: this.props.uri}} />
      </SafeAreaView>
    );
  }
}

export default webview;
