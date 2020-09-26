import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Button, TextInput} from 'react-native-paper';

import color from '../colors/colors';

export default class Login extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingBottom: '15%'}}>
            <Text style={styles.heading}>WELCOME TO</Text>
            <View style={styles.logo}>
              <Image
                source={require('../images/Untitled.png')}
                resizeMode={'contain'}
                style={{flex: 1, width: null, height: null}}
              />
            </View>
            <View style={styles.log}>
              <TextInput
                label="Email"
                mode="outlined"
                theme={{colors: {text: color.white, primary: color.white}}}
                style={styles.text}></TextInput>
              <TextInput
                mode="outlined"
                label="Password"
                style={styles.text}
                theme={{colors: {text: color.white, primary: color.white}}}
                secureTextEntry={true}></TextInput>
              <Button
                color={color.lightblue}
                mode="contained"
                onPress={() => console.log('Pressed')}>
                Login
              </Button>
              <Text
                style={{
                  color: color.darkyellow,
                  marginTop: '4%',
                  textAlign: 'center',
                  fontSize: 20,
                }}
                onPress={() => {
                  console.log('Goes to register');
                }}>
                Not Registered? Register
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: color.darkblue,
    flex: 1,
  },
  text: {
    marginBottom: '5%',
    fontSize: 18,
    backgroundColor: color.darkblue,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
    marginTop: '9%',
  },
  logo: {
    width: '100%',
    height: '20%',
  },
  log: {
    marginTop: '10%',
  },
});
