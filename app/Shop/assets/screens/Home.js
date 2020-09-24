import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Button} from 'react-native-paper';

class Homescreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Hello</Text>
          <View style={{width: 100, height: 50}}>
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              Press me
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Homescreen;
