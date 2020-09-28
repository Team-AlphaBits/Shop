import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Button, Appbar, Title} from 'react-native-paper';

import color from '../colors/colors';

export default class MyCart extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      data: [],
    };
  }
  componentDidMount() {
    let items = Array.apply(null, Array(2)).map((i) => {
      return {id: i, src: require('../images/img_1.jpg'), price: '₹ 24,999.00'};
    });
    this.setState({
      data: items,
    });
  }
  increament = (count) => {
    this.setState({count: this.state.count + 1});
  };
  decreament = (count) => {
    this.setState({count: this.state.count - 1});
  };
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
          <Text style={styles.subtotal}>Subtotal ( 1 item): ₹ 24,999.00</Text>
          <Text style={styles.shipping}>
            ✓ Your order is eligible for FREE Delivery.
          </Text>
          <Text style={styles.checkout}>
            {' '}
            Select this option at checkout. Details
          </Text>

          <Button
            mode="contained"
            onPress={() => console.log('Proceed to buy')}
            style={styles.buyButton}>
            Proceed to Buy
          </Button>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <View style={styles.itemDesc}>
                <Image style={styles.item} source={item.src} />
                <View style={styles.details}>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Nikon D5600 Digital SLR 18-55 mm f/3.5-5.6 G VR and AF-P DX
                    NIKKOR 70-300 mm f/4.5-6.3 G ED (Black){' '}
                  </Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.avl}>In stock</Text>
                  <Text style={styles.eligibility}>
                    Eligible for FREE Shipping.
                  </Text>
                </View>
              </View>
              <View style={styles.btns}>
                <Button
                  icon={'minus'}
                  color="blue"
                  style={styles.quantitybtn}
                  onPress={this.decreament}></Button>
                <Title style={{color: color.darkblue}}>
                  {this.state.count}
                </Title>
                <Button
                  icon={'plus'}
                  color="blue"
                  style={styles.quantitybtn}
                  onPress={this.increament}></Button>
                <Button
                  icon="delete"
                  style={styles.delete}
                  onPress={() =>
                    console.log('Remove this item from Cart')
                  }></Button>

                <Button
                  style={styles.save}
                  onPress={() => console.log('Save this item for later')}>
                  Save
                </Button>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  uperContainer: {
    padding: '5%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buyButton: {
    marginBottom: '5%',
    borderRadius: 5,
  },
  subtotal: {
    fontSize: 20,
    marginVertical: '2%',
  },
  shipping: {
    color: 'green',
    fontSize: 18,
    marginVertical: '2%',
    fontWeight: 'bold',
  },
  checkout: {
    fontSize: 18,
    marginTop: '2%',
    marginBottom: '8%',
  },
  itemDesc: {
    flex: 1,
    flexDirection: 'row',
    margin: '5%',
  },
  item: {
    width: '30%',
    height: 200,
    marginTop: '2%',
  },
  details: {
    marginHorizontal: '5%',
    width: '68%',
  },
  price: {
    marginBottom: 10,
    fontSize: 20,
    color: '#800000',
  },
  avl: {
    color: 'green',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  eligibility: {
    marginBottom: 10,
    fontSize: 16,
  },
  btns: {
    flexDirection: 'row',
    marginVertical: '5%',
    width: '100%',
    justifyContent: 'center',
  },
  quantitybtn: {
    backgroundColor: 'lightblue',
    width: '10%',
    marginHorizontal: '3%',
  },
  delete: {
    backgroundColor: 'lightblue',
    width: '10%',
    marginHorizontal: '5%',
  },
  save: {
    backgroundColor: 'lightblue',
    width: '20%',
    marginHorizontal: '5%',
  },
});
