import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Button, Appbar, Title, Badge, Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';
import {decrementCart} from '../Redux/index';
import color from '../colors/colors';

class MyCart extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      data: [],
      total_price: 0,
      visible: false,
      isLoading: false,
    };
  }

  incrementProductCount = (productid) => {
    this.setState({isLoading: true});
    axios
      .put('https://calm-garden-34154.herokuapp.com/api/incProd/' + productid)
      .then((res) => {
        this.fetchAndUpdateData();
      })
      .catch((e) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  };

  decrementProductCount = (productid) => {
    this.setState({isLoading: true});
    axios
      .put('https://calm-garden-34154.herokuapp.com/api/decProd/' + productid)
      .then((res) => {
        this.fetchAndUpdateData();
      })
      .catch((e) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  };

  removeProduct=(productid)=>{
    this.setState({isLoading: true});
    axios
      .put('https://calm-garden-34154.herokuapp.com/api/removeProd/' + productid)
      .then((res) => {
        this.props.decrementCart();
        this.fetchAndUpdateData();
      })
      .catch((e) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  }

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  fetchAndUpdateData = () => {
    if (this.props.isLoggedIn) {
      this.setState({isLoading: true});
      axios
        .get('https://calm-garden-34154.herokuapp.com/api/view-Cart')
        .then((res) => {
          this.setState({
            data: res.data.cartData.cart.cartlist,
            total_price: res.data.cartData.cart.total_price,
          });
        })
        .catch((e) => {
          this.onToggleSnackBar();
        })
        .then(() => {
          this.setState({isLoading: false});
        });
    }
  };

  componentDidMount() {
    this.fetchAndUpdateData();
  }

  render() {
    var header = (
      <View style={styles.uperContainer}>
        <Text style={styles.subtotal}>
          SUBTOTAL : ₹ {this.state.total_price}
        </Text>
        <Text style={styles.shipping}>
          ✓ Your order is eligible for FREE Delivery.
        </Text>
        <Text style={styles.checkout}>
          {' '}
          Select this option at checkout. Details
        </Text>

        <Button
          mode="contained"
          onPress={() => {
            this.props.navigation.navigate('Order');
          }}
          style={styles.buyButton}>
          Proceed to Buy
        </Button>
      </View>
    );
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.white}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Appbar.Content title="MyCart" />
            <Badge
              style={{
                position: 'absolute',
                marginStart: 85,
                backgroundColor: color.BadgeColor,
              }}>
              {this.props.total_product}
            </Badge>
          </View>
        </Appbar.Header>
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.MintyGreenDark}
          size="large"
          style={styles.activityindicator}
        />
        {this.props.isLoggedIn ? (
          <FlatList
            ListHeaderComponent={header}
            data={this.state.data}
            renderItem={({item, index}) => (
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}>
                <View style={styles.itemDesc}>
                  <Image
                    style={styles.item}
                    source={{uri: item.image}}
                    resizeMode="contain"
                  />
                  <View style={styles.details}>
                    <Text
                      style={{
                        marginBottom: 10,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {item.short_desc}
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
                    onPress={() => {
                      this.decrementProductCount(item.product_id);
                    }}></Button>
                  <Title style={{color: color.darkblue}}>{item.quantity}</Title>
                  <Button
                    icon={'plus'}
                    color="blue"
                    style={styles.quantitybtn}
                    onPress={() => {
                      this.incrementProductCount(item.product_id);
                    }}></Button>
                  <Button
                    icon="delete"
                    style={styles.delete}
                    onPress={() =>
                      console.log('Remove this item from Cart')
                    }></Button>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={styles.shipping}>You are not LoggedIn !!!</Text>
            <Button
              mode="contained"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              Go To Login
            </Button>
          </View>
        )}
        <View>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => {
              this.onDismissSnackBar();
            }}
            action={{
              label: 'Retry',
              onPress: () => {
                this.fetchAndUpdateData();
              },
            }}>
            Something Went Wrong !
          </Snackbar>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  uperContainer: {
    paddingHorizontal: '5%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buyButton: {
    marginBottom: '5%',
    borderRadius: 5,
  },
  subtotal: {
    fontSize: 20,
    fontWeight: 'bold',
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
    width: null,
    height: null,
    flex: 1,
  },
  details: {
    marginHorizontal: '5%',
    width: '68%',
  },
  price: {
    marginBottom: 10,
    fontSize: 20,
    color: color.darkRed,
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
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 60,
  },
});

const mapStateToProps = (state) => {
  return {
    total_product: state.cartReducer.total_product,
    isLoggedIn: state.LoginReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    decrementCart: () => {
      dispatch(decrementCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
