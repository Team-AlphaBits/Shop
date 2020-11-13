import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Snackbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginAction, initializeCart} from '../Redux/index';
import color from '../colors/colors';

import {withTheme} from 'react-native-paper';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      visible: false,
      isLoading: false,
      buttonFlexDirection:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? 'column'
          : 'row',
      buttonWidth:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? '100%'
          : '50%',
    };
  }

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  loginFunction = () => {
    var myemail = this.state.email.trim();
    var myPassword = this.state.password.trim();

    if (myemail.length != 0 && myPassword.length != 0) {
      this.setState({isLoading: true});
      axios
        .post('https://calm-garden-34154.herokuapp.com/api/login', {
          email: myemail,
          password: myPassword,
        })
        .then((res) => {
          this.props.initializeCart(res.data.userData.cart.total_product);
          this.props.navigation.navigate('Home');
          this.props.loginAction({
            userData: res.data.userData,
            password: myPassword,
          });
        })
        .catch((e) => {
          switch (e.response.status) {
            case 401:
              this.onToggleSnackBar();
              break;
            default:
              this.onToggleSnackBar();
              break;
          }
        })
        .then(() => {
          this.setState({isLoading: false});
        });
    } else {
      this.onToggleSnackBar();
    }
  };

  onChange = ({window, screen}) => {
    if (window.height >= window.width) {
      this.setState({buttonFlexDirection: 'column', buttonWidth: '100%'});
    } else {
      this.setState({buttonFlexDirection: 'row', buttonWidth: '50%'});
    }
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }

  render() {
    const {colors} = this.props.theme;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.MintyGreenDark}}>
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.MintyGreenLight}
          size="large"
          style={styles.activityindicator}
        />
        <View style={styles.logostyle}>
          <Image
            source={require('../images/redicon.png')}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginHorizontal: 10,
          }}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                },
              ]}>
              Email
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Email"
                placeholderTextColor={color.darkgrey}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(e) => {
                  this.setState({email: e});
                }}
                value={this.state.email}
              />
            </View>
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: '1%',
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor={color.darkgrey}
                secureTextEntry={true}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(e) => {
                  this.setState({password: e});
                }}
                value={this.state.password}
              />
            </View>
            <View
              style={[
                styles.button,
                {flexDirection: this.state.buttonFlexDirection},
              ]}>
              <Pressable
                style={[styles.signIn,{width:this.state.buttonWidth}]}
                onPress={() => {
                  this.loginFunction();
                }}>
                <LinearGradient
                  colors={[color.MintyGreenLight, color.MintyGreenMedium]}
                  style={[styles.signIn,{width:'100%'}]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: color.white,
                      },
                    ]}>
                    Sign In
                  </Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                onPress={() => console.log('pressed')}
                style={[
                  styles.signIn,
                  {
                    borderColor: color.MintyGreenDark,
                    borderWidth: 1,
                    width:this.state.buttonWidth
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: color.MintyGreenDark,
                    },
                  ]}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </Animatable.View>
        </View>
        <View>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => {
              this.onDismissSnackBar();
            }}
            action={{
              label: 'OK',
              onPress: () => {
                this.onDismissSnackBar();
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
  header: {
    marginStart: 20,
    marginBottom: 5,
  },
  footer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  text_header: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingTop: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    marginTop: 10,
  },
  signIn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:5,
    marginHorizontal:5,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  img: {
    width: null,
    height: null,
    flex: 1,
  },
  logostyle: {
    width: '100%',
    height: '29%',
  },
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (params) => {
      dispatch(loginAction(params));
    },
    initializeCart: (params) => {
      dispatch(initializeCart(params));
    },
  };
};

export default connect(null, mapDispatchToProps)(withTheme(Login));
