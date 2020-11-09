import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Snackbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginAction} from '../Redux/index';
import color from '../colors/colors';

import {withTheme} from 'react-native-paper';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      visible: false,
      isLoading:true
    };
  }

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  loginFunction = () => {
    this.setState({isLoading:true})

    var myemail=this.state.email.trim();
      var myPassword=this.state.password.trim();

    if (myemail != '' && myPassword != '') {
      axios
        .post('https://calm-garden-34154.herokuapp.com/api/login', {
          email: myemail,
          password: myPassword,
        })
        .then((res) => {
         this.props.loginAction({
            userData:res.data.userData,
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
        .then(()=>{
          this.setState({isLoading:false})
        })
    } else {
      this.onToggleSnackBar();
    }
  };
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
        <ScrollView
         style={{flex:1,marginHorizontal:10}}>
          <View style={styles.logostyle}>
            <Image
              source={require('../images/redicon.png')}
              style={styles.img}
              resizeMode="contain"
            />
          </View>
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
                  autoCompleteType="email"
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
                  autoCompleteType="password"
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
                />
              </View>
              <View style={styles.button}>
                <Pressable
                  style={styles.signIn}
                  onPress={() => {
                    this.loginFunction();
                  }}>
                  <LinearGradient
                    colors={[color.MintyGreenLight, color.MintyGreenMedium]}
                    style={styles.signIn}>
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
                      marginTop: '5%',
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
        </ScrollView>
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
    flex: 1,
    marginStart: 20,
    paddingBottom: 5,
    paddingTop: 5,
  },
  footer: {
    flex: 1,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop:40,
    height:585,
    marginTop:"5%"
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
    paddingVertical: 10,
  },

  textInput: {
    flex: 1,
    marginTop:Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop:10
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '30%',
    marginTop:60
  },
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex:1
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (params) => {
      dispatch(loginAction(params));
    },
  };
};

export default connect(null, mapDispatchToProps)(withTheme(Login));
