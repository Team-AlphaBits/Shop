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

import {Button, Title, Paragraph, Appbar, Snackbar} from 'react-native-paper';
import axios from 'axios';
import color from '../colors/colors';

export default class Details extends Component {
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
      isLoading: false,
      showdescription: false,
      active:0
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
        this.setState({dataSource: res.data.productData});
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
          <Appbar.Content
            title={
              details.title.length > 35
                ? details.title.substring(0, 35 - 3) + '...'
                : details.title
            }
          />
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
              <Text style={styles.price}>
                {details.price[0] == '₹' ? details.price : '₹' + details.price}
              </Text>
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
              <View
                style={{
                  margin: '3%',
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: '3%',
                  borderRadius: 8,
                }}>
                <Title>Description</Title>
                <Paragraph>
                  {this.state.showdescription
                    ? details.description
                    : details.description.substring(0, 50) + '...'}
                </Paragraph>
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
            </View>
          </ScrollView>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed')}
              style={styles.btn1}>
              Buy Now
            </Button>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed')}
              style={styles.btn2}>
              Add to cart
            </Button>
          </View>
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
    margin: '5%',
    marginBottom: '5%',
    fontSize: 30,
    fontWeight: 'bold',
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
