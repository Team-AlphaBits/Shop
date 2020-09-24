import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';

import {Button} from 'react-native-paper';

import color from '../colors/colors';

export default class Login extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>WELCOME TO</Text>
          <View style={styles.logo}>
            <Image
              source={require('../images/Untitled.png')}
              resizeMode={'contain'}
              style={{flex: 1, width: null, height: null}}
            />
          </View>
          <TextInput
            placeholderTextColor="#E0FBFC"
            style={styles.text}
            placeholder="Email"></TextInput>
          <TextInput
            placeholderTextColor="#E0FBFC"
            style={styles.text}
            secureTextEntry={true}
            placeholder="Password"></TextInput>
          <Button
            color={color.lightgreen}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Login
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    paddingHorizontal: 30,
    backgroundColor: color.darkgreen,
    flex: 1,
  },
  text: {
    borderColor: color.lightgreen,
    borderWidth: 2,
    marginBottom: '3%',
    fontSize: 18,
    color: color.white,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
  },
  logo: {
    width: '100%',
    height: '30%',
    marginVertical: '2%',
  },
});
