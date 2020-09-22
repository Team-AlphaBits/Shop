import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {height: 60, width: '100%',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'indigo',
  padding :10,
  color:'white'
},
});
