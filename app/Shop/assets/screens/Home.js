import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import color from '../colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Homescreen extends Component {
  render() {
    return (
      <SafeAreaView style={style.container}>
        <View>
          <View style={style.headerBar}>
            <Icon
              name="menu"
              size={40}
              color={color.red}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            />

            <Text
              style={{
                color: color.red,
                fontSize: 40,
                fontWeight: 'bold',
                marginStart: '30%',
              }}>
              SHOP
            </Text>
          </View>
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

const style = StyleSheet.create({
  headerBar: {
    height: 60,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
});
