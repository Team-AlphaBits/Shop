import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  Title,
  TextInput,
  Button,
  RadioButton,
  Appbar,
  Portal,
  Modal,
  Provider,
  Snackbar,
} from 'react-native-paper';
import axios from 'axios';
import color from '../colors/colors';

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      checked: 'first',
      name: '',
      mobileNo: 0,
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      modalVisible: false,
      visible: false,
      isLoading: false,
    };
  }
  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  paymentMethod = () => {
    switch (this.state.checked) {
      case 'first':
        return 'COD';
        break;
      case 'second':
        return 'Debit/Credit Cards';
        break;
      case 'third':
        return 'Payment using UPI/Wallet';
        break;
      default:
        return 'COD';
    }
  };

  placeOrder = () => {
    if (
      this.state.addressLine1.trim().length != 0 &&
      this.state.addressLine2.trim().length != 0 &&
      this.state.mobileNo != 0 &&
      this.state.name.trim().length != 0 &&
      this.state.landmark.trim().length != 0 &&
      this.state.city.trim().length != 0 &&
      this.state.pincode.trim().length != 0 &&
      this.state.state.trim().length != 0
    ) {
      this.setState({isLoading: true});
      axios
        .post('https://calm-garden-34154.herokuapp.com/api/placeorder', {
          name: this.state.name,
          mobileNo: this.state.mobileNo,
          pincode: this.state.pincode,
          addressLine1: this.state.addressLine1,
          addressLine2: this.state.addressLine2,
          landmark: this.state.landmark,
          city: this.state.city,
          state: this.state.state,
          paymentMethod: this.paymentMethod(),
        })
        .then((res) => {
          this.toggleModal(true);
        })
        .catch((e) => {
          this.onToggleSnackBar();
        })
        .then(() => {
          this.setState({isLoading: false});
        });
    } else {
      this.onToggleSnackBar();
    }
  };

  render() {
    return (
      <Provider>
        <SafeAreaView style={{flex: 1}}>
          <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
            <Appbar.BackAction
              onPress={() => {
                this.props.navigation.navigate('MyCart');
              }}
            />
            <Appbar.Content title="Address" />
          </Appbar.Header>
          <ActivityIndicator
            animating={this.state.isLoading}
            color={color.MintyGreenDark}
            size="large"
            style={styles.activityindicator}
          />
          <View style={{flex: 1}}>
            <ScrollView>
              <View style={styles.upContainer}>
                <Title style={styles.title}>Fill your address</Title>
                <TextInput
                  label="Full name"
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({name: e})}
                  style={styles.text}></TextInput>
                <TextInput
                  label="Mobile number"
                  keyboardType='number-pad'
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({mobileNo: e})}
                  style={styles.text}></TextInput>
                <TextInput
                  label="PIN code"
                  keyboardType='number-pad'
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({pincode: e})}
                  style={styles.text}></TextInput>
                <TextInput
                  label="Flat, House no, Buildind,Apartment"
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({addressLine1: e})}
                  style={styles.text}></TextInput>
                <TextInput
                  label="Area, Colony, Street, Sector, Village"
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({addressLine2: e})}
                  style={styles.text}></TextInput>
                <TextInput
                  label="Landmark"
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({landmark: e})}
                  style={styles.text}></TextInput>
                <TextInput
                  label="Town/City"
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({city: e})}
                  style={styles.text}></TextInput>
                <TextInput
                  label="State"
                  mode="outlined"
                  theme={{
                    colors: {text: color.black, primary: color.MintyGreenDark},
                  }}
                  onChangeText={(e) => this.setState({state: e})}
                  style={styles.text}></TextInput>

                <Title style={styles.payOption}>
                  Choose your payment option
                </Title>
                <View style={styles.payment}>
                  <View style={styles.radiobtn}>
                    <RadioButton
                      value="first"
                      status={
                        this.state.checked == 'first' ? 'checked' : 'unchecked'
                      }
                      onPress={() => this.setState({checked: 'first'})}
                    />
                    <Text style={styles.rdText}>COD (Cash on delivery)</Text>
                  </View>
                  <View style={styles.radiobtn}>
                    <RadioButton
                      value="second"
                      status={
                        this.state.checked == 'second' ? 'checked' : 'unchecked'
                      }
                      onPress={() => this.setState({checked: 'second'})}
                    />
                    <Text style={styles.rdText}>Debit/Credit Cards</Text>
                  </View>
                  <View style={styles.radiobtn}>
                    <RadioButton
                      value="third"
                      status={
                        this.state.checked == 'third' ? 'checked' : 'unchecked'
                      }
                      onPress={() => this.setState({checked: 'third'})}
                    />
                    <Text style={styles.rdText}>Payments using UPI/Wallet</Text>
                  </View>
                </View>
                <Button
                  style={styles.placeOrder}
                  onPress={() => {
                    this.placeOrder();
                  }}>
                  Place order
                </Button>

                <Portal>
                  <Modal
                    onDismiss={() => {
                      this.toggleModal(false);
                      this.props.navigation.navigate('Home');
                    }}
                    visible={this.state.modalVisible}>
                    <View style={styles.modalViewContainer}>
                      <View style={styles.gif}>
                        <Image
                          source={require('../images/gif.gif')}
                          style={styles.img}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.text2}>
                        Your Order Placed Succesfully !
                      </Text>
                    </View>
                    <Button
                      mode="contained"
                      style={{
                        backgroundColor: color.MintyGreenDark,
                        marginTop: 50,
                        width: 250,
                        alignSelf: 'center',
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        this.toggleModal(false);
                        this.props.navigation.navigate('Products');
                      }}>
                      Browse More Products
                    </Button>
                  </Modal>
                </Portal>
              </View>
            </ScrollView>
          </View>
          <View>
            <Snackbar
              visible={this.state.visible}
              onDismiss={() => {
                this.onDismissSnackBar();
              }}
              action={{
                label: 'OK',
                onPress: () => this.onDismissSnackBar(),
              }}>
              Something Went Wrong ! Check If all Field are properly Filled !
            </Snackbar>
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    marginBottom: '5%',
    fontSize: 18,
  },
  radiobtn: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%',
  },
  rdText: {
    fontSize: 18,
    marginTop: '1%',
    marginLeft: '2%',
  },
  payment: {
    borderColor: color.black,
    borderWidth: 1,
    paddingBottom: '5%',
    borderRadius: 8,
    marginVertical: '5%',
  },
  payOption: {
    marginTop: '5%',
    fontWeight: 'bold',
  },
  placeOrder: {
    backgroundColor: color.burntyellow,
    borderBottomColor: 5,
    marginVertical: '5%',
  },
  upContainer: {
    flex: 1,
    padding: '5%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 100,
  },
  gif: {
    width: '100%',
    height: 200,
  },
  img: {
    height: null,
    width: null,
    flex: 1,
  },
  text2: {
    color: 'red',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalViewContainer: {
    backgroundColor: color.white,
    marginHorizontal: '5%',
    borderRadius: 10,
  },
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 60,
    zIndex: 1,
  },
});
