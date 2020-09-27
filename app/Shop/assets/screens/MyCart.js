import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {Button, Appbar} from 'react-native-paper';

export default class MyCart extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content title="MyCart" />
        </Appbar.Header>
        <View style={styles.uperContainer}>
          <Text>Subtotal ( 1 item): ₹ 24,999.00</Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            ✓ Your order is eligible for FREE Delivery.
          </Text>
          <Text> Select this option at checkout. Details</Text>

          <Button
            mode="contained"
            onPress={() => console.log('Proceed to buy')}>
            Proceed to Buy
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  uperContainer: {
    marginTop: '5%',
  },
  btn: {
    color: 'yellow',
    borderRadius: 5,
  },
});
