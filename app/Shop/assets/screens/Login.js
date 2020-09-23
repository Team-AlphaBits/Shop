import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default class Login extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.logo}>WELCOME TO SHOP</Text>
          <TextInput style={styles.text} placeholder="Email"></TextInput>
          <TextInput style={styles.text} placeholder="Password"></TextInput>
          <Button title="Login" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 30,
    padding: 40,
  },
  text: {
    borderColor: 'skyblue',
    borderWidth: 2,
    marginVertical: 20,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
