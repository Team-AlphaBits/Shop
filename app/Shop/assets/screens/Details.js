import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  Button,
  Title,
  Paragraph,
  Appbar,
  Snackbar,
  Badge,
} from 'react-native-paper';
import axios from 'axios';
import {connect} from 'react-redux';
import {incrementCart} from '../Redux/index';
import CurrencyFormat from 'react-currency-format';
import color from '../colors/colors';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {
        images: [],
        _id: '',
        title: '',
        home_image: '',
        description: '',
        price: '',
        quantity: '',
        short_desc: '',
        cat_id: '',
        seller_name: '',
        __v: '',
      },
      visible: false,
      description_splited: null,
      isLoading: false,
      showdescription: false,
      active: 0,
      discount: 0,
      ItemPrice: 0,
    };
  }

  unsubscribe_function = {
    unsubscribe: null,
  };

  change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.active) {
      this.setState({active: slide});
    }
  };

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  convert_price = (text) => {
    return parseFloat(text.replace(/[^\d\.]*/g, ''));
  };

  buyNow = (productid) => {
    this.setState({isLoading: true});
    axios
      .put(
        'https://calm-garden-34154.herokuapp.com/api/add-to-cart/' + productid,
      )
      .then((res) => {
        this.props.incrementCart();
        this.props.navigation.navigate('MyCart');
      })
      .catch((e) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  };

  addToCart = (productid) => {
    this.setState({isLoading: true});
    axios
      .put(
        'https://calm-garden-34154.herokuapp.com/api/add-to-cart/' + productid,
      )
      .then((res) => {
        this.props.incrementCart();
      })
      .catch((e) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  };

  fetchandupdatedata = () => {
    this.setState({
      isLoading: true,
      dataSource: {
        images: [],
        _id: '',
        title: '',
        home_image: '',
        description: '',
        price: '',
        quantity: '',
        short_desc: '',
        cat_id: '',
        seller_name: '',
        __v: '',
      },
    });
    var productId = this.props.route.params.data;
    axios
      .get('https://calm-garden-34154.herokuapp.com/api/product/' + productId)
      .then((res) => {
        this.setState({
          dataSource: res.data.productData,
          description_splited: res.data.productData.description.split(/[.,;|]/),
          discount: Math.floor(Math.random() * 50) + 1,
          ItemPrice: this.convert_price(res.data.productData.price),
        });
      })
      .catch((error) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  };

  componentDidMount() {
    //subscribing to screen changes to call fetchandupdatedata function
    this.unsubscribe_function.unsubscribe = this.props.navigation.addListener(
      'focus',
      () => {
        this.fetchandupdatedata();
      },
    );
  }

  componentWillUnmount() {
    //unsubscribing from screen changes
    this.unsubscribe_function.unsubscribe();
  }

  render() {
    var details = this.state.dataSource;
    var imageUri = details.images;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.white}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate('Itemlist');
            }}
          />
          <Appbar.Content title={details.title} />
          <View>
            <Appbar.Action
              icon="cart"
              color={color.white}
              size={30}
              onPress={() => {
                this.props.navigation.navigate('MyCart');
              }}
            />
            <Badge
              style={{position: 'absolute', backgroundColor: color.BadgeColor}}>
              {this.props.total_product}
            </Badge>
          </View>
        </Appbar.Header>
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.black}
          size="large"
        />
        <View style={styles.MainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title style={styles.headText}>{details.short_desc}</Title>
            <View style={{marginHorizontal: '3%', marginTop: 50}}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={this.change}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: '1%',
                  width: imageUri.length * 100 + '%',
                  height: 300,
                  flexGrow: 1,
                }}>
                {imageUri.map((image, index) => (
                  <Image
                    key={index}
                    source={{uri: image}}
                    style={styles.img}
                    resizeMode="contain"
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.pagging}>
              {imageUri.map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == this.state.active
                      ? styles.paggingActiveText
                      : styles.paggingText
                  }>
                  ⬤
                </Text>
              ))}
            </View>
            <View style={styles.btnView}>
              {this.state.discount == 0 ? (
                <Text style={styles.price}>
                  {details.price[0] == '₹'
                    ? details.price
                    : '₹ ' + details.price}
                </Text>
              ) : (
                <View>
                  <Text
                    style={[
                      styles.price,
                      {textDecorationLine: 'line-through'},
                    ]}>
                    {details.price[0] == '₹'
                      ? details.price
                      : '₹ ' + details.price}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <CurrencyFormat
                      value={
                        this.state.ItemPrice -
                        (this.state.ItemPrice * this.state.discount) / 100
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      thousandSpacing="2s"
                      decimalScale={0}
                      renderText={(value) => (
                        <Text style={styles.Discountprice}>{'₹ ' + value+'.00'}</Text>
                      )}
                    />
                    <Text
                      style={{
                        color: color.MintyGreenMedium,
                        fontWeight: 'bold',
                        marginTop: '1%',
                      }}>
                      {' (' + this.state.discount + '% OFF)'}
                    </Text>
                  </View>
                </View>
              )}
              <Text
                style={[
                  styles.avl,
                  {color: details.quantity > 0 ? 'green' : 'red'},
                ]}>
                {details.quantity > 0
                  ? 'In Stock (' + details.quantity + ')'
                  : 'OUT OF STOCK'}
              </Text>
              <Text style={styles.sellerinfo}>
                Seller : {details.seller_name}
              </Text>
              {this.state.description_splited != null ? (
                <View
                  style={{
                    margin: '3%',
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: '3%',
                    borderRadius: 8,
                  }}>
                  <Title>Description</Title>
                  {this.state.showdescription == true
                    ? this.state.description_splited.map((item, index) => (
                        <Paragraph key={index}>{item}</Paragraph>
                      ))
                    : this.state.description_splited
                        .slice(0, 1)
                        .map((item, index) => (
                          <Paragraph key={index}>
                            {item.substring(0, 20) + '...'}
                          </Paragraph>
                        ))}
                  <Text
                    style={{fontWeight: 'bold', color: color.lightblue}}
                    onPress={() => {
                      this.setState({
                        showdescription: this.state.showdescription
                          ? false
                          : true,
                      });
                    }}>
                    {this.state.showdescription ? 'Show less' : 'Show More'}
                  </Text>
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </ScrollView>
          {this.props.isLoggedIn ? (
            <View style={{flexDirection: 'row', width: '100%'}}>
              <Button
                mode="contained"
                onPress={() => this.buyNow(this.state.dataSource._id)}
                style={styles.btn1}>
                Buy Now
              </Button>
              <Button
                mode="contained"
                onPress={() => this.addToCart(this.state.dataSource._id)}
                style={styles.btn2}>
                Add to cart
              </Button>
            </View>
          ) : (
            <View style={{width: '100%'}}>
              <Button
                mode="contained"
                onPress={() => this.props.navigation.navigate('Login')}
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  borderRadius: 8,
                  backgroundColor: color.MintyGreenDark,
                }}>
                LOGIN
              </Button>
            </View>
          )}
        </View>
        <View>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => {
              this.onDismissSnackBar();
            }}
            action={{
              label: 'Retry',
              onPress: () => {
                this.fetchandupdatedata();
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
  MainContainer: {flex: 1},
  pagging: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    marginHorizontal: 10,
  },
  paggingText: {
    color: 'black',
    margin: '3%',
    fontSize: 8,
  },
  paggingActiveText: {
    color: '#888',
    margin: '3%',
    fontSize: 8,
  },
  btnView: {
    marginTop: 20,
  },
  btn1: {
    marginHorizontal: '1%',
    marginVertical: '1%',
    backgroundColor: 'green',
    borderRadius: 8,
    width: '48%',
  },
  btn2: {
    marginHorizontal: '1%',
    marginVertical: '1%',
    backgroundColor: color.lightblue,
    borderRadius: 8,
    width: '48%',
  },
  price: {
    marginStart: '5%',
    marginTop: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Discountprice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: '5%',
    color: color.lightblue,
  },
  avl: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: '6%',
    marginEnd: '5%',
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  headText: {
    marginHorizontal: '5%',
  },
  sellerinfo: {
    fontSize: 20,
    marginStart: '5%',
    color: color.lightblue,
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
    incrementCart: () => {
      dispatch(incrementCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
