import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  SectionList,
} from 'react-native';
import {Appbar, Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';
import color from '../colors/colors';

class MyOrder extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      visible: false,
      isLoading: false,
    };
  }
  unsubscribe_function = {
    unsubscribe: null,
  };

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  dataMapFunction = () => {
    var mydata = this.state.data.map((item) => {
      return {
        title: item.date,
        data: item.productDetails,
        totalProducts: item.totalProducts,
        totalPrice: item.totalPrice,
        address: item.address,
        paymentMethod: item.paymentMethod,
        paymentSuccessful: item.paymentSuccessful,
      };
    });
    return mydata;
  };

  fetchAndUpdateData = () => {
    if (this.props.isLoggedIn) {
      this.setState({isLoading: true});
      axios
        .get('https://calm-garden-34154.herokuapp.com/api/prevOrder')
        .then((res) => {
          this.setState({
            data: res.data,
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
    //subscribing to screen changes to call fetchandupdatedata function
    this.unsubscribe_function.unsubscribe = this.props.navigation.addListener(
      'focus',
      () => {
        this.fetchAndUpdateData();
      },
    );
  }

  componentWillUnmount() {
    //unsubscribing from screen changes
    this.unsubscribe_function.unsubscribe();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content title="My Order" />
        </Appbar.Header>
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.MintyGreenDark}
          size="large"
          style={styles.activityindicator}
        />
        <View style={{flex: 1}}>
          {this.props.isLoggedIn ? (
            this.state.data != null ? (
              <SectionList
                sections={this.dataMapFunction()}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>
                    Date: {section.title}
                  </Text>
                )}
                renderItem={({item}) => (
                  <Pressable
                    style={styles.sectionRenderItem}
                    onPress={() => {
                      this.props.navigation.navigate('Details', {
                        data: item.product_id,
                      });
                    }}>
                    <View style={{width: 100, height: 100}}>
                      <Image
                        style={{width: null, height: null, flex: 1}}
                        resizeMode="contain"
                        source={{uri: item.image}}
                      />
                    </View>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        width: 250,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        {item.short_desc}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: color.lightblue,
                          marginTop: 5,
                        }}>
                        {item.price[0] == '₹' ? item.price : '₹' + item.price}
                      </Text>
                    </View>
                  </Pressable>
                )}
                renderSectionFooter={({section}) => (
                  <View style={styles.sectionFooter}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.footerTextHeading}>Address: </Text>
                      <View
                        style={{
                          flexWrap: 'wrap',
                          alignItems: 'flex-end',
                          width: 250,
                        }}>
                        <Text style={styles.footerTextHeading}>
                          {section.address}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.footerTextHeading}>
                      Total Products: {section.totalProducts}
                    </Text>
                    <Text style={styles.footerTextHeading}>
                      Total Price:{' '}
                      {section.totalPrice[0] == '₹'
                        ? section.totalPrice
                        : '₹' + section.totalPrice}
                    </Text>
                    <Text style={styles.footerTextHeading}>
                      Payment Method: {section.paymentMethod}
                    </Text>
                    <Text
                      style={[
                        styles.footerTextHeading,
                        {
                          color: section.paymentSuccessful
                            ? color.MintyGreenMedium
                            : 'red',
                        },
                      ]}>
                      {section.paymentSuccessful
                        ? 'Payment Successful'
                        : 'Payment Failed'}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <View></View>
            )
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{color: color.MintyGreenMedium, fontWeight: 'bold'}}>
                Login to see Previous Orders...
              </Text>
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
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 60,
    zIndex: 3,
  },
  sectionFooter: {
    marginBottom: 40,
    paddingHorizontal: 5,
    borderBottomColor: color.burntyellow,
    borderBottomWidth: 15,
    paddingVertical: 5,
    backgroundColor: color.white,
  },
  sectionHeader: {
    width: '100%',
    height: 50,
    backgroundColor: color.burntyellow,
    fontWeight: 'bold',
    color: color.white,
    marginTop: 10,
    paddingStart: 5,
    fontSize: 20,
    textAlignVertical: 'center',
  },
  sectionRenderItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 2,
    backgroundColor: color.white,
  },
  footerTextHeading: {
    color: color.darkblue,
  },
});

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.LoginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(MyOrder);
