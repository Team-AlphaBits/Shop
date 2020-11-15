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
    if (this.state.data != null) {
      console.log(this.dataMapFunction());
    }
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.props.isLoggedIn ? (
            this.state.data != null ? (
              <SectionList
                sections={this.dataMapFunction()}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({section}) => (
                  <Text
                    style={{
                      width: '100%',
                      height: 50,
                      backgroundColor: color.burntyellow,
                      fontWeight: 'bold',
                      color: color.white,
                      marginTop:10,
                      fontSize:25
                    }}>
                    Date: {section.title}
                  </Text>
                )}
                renderItem={({item}) => <Text>{item.short_desc}</Text>}
                renderSectionFooter={({section}) => (
                  <Text>{section.address}</Text>
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
  },
});

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.LoginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(MyOrder);
