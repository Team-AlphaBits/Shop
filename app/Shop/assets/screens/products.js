import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class products extends Component {
  render() {
    return (
      <View>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details');
          }}
        />
      </View>
    );
  }
}
