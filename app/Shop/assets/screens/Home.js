import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

class Homescreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Hello</Text>
          <View style={{width: 100, height: 50}}>
            <Button
              title="press me"
              onPress={() => {
                console.log('pressed');
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Homescreen;
