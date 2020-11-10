import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import color from '../colors/colors';

import {withTheme} from 'react-native-paper';

class Login extends Component {
  constructor() {
    super();
  }
  render() {
    const {colors} = this.props.theme;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.MintyGreenDark}}>
        <ScrollView contentContainerStyle={styles.container}>
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
          <View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                  },
                ]}>
                Username
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color={colors.text} size={20} />
                <TextInput
                  placeholder="Your Username"
                  placeholderTextColor={color.darkgrey}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  autoCapitalize="none"
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
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity>
                <Text
                  style={{color: color.MintyGreenDark, marginTop: 15}}
                  onPress={() => console.log('forgot password')}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {
                    console.log('pressed');
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
                </TouchableOpacity>

                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(Login);

const styles = StyleSheet.create({
  container: {marginHorizontal: 10},
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: '5%',
    marginTop: '5%',
  },
  footer: {
    flex: 1,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: '10%',
    paddingBottom: '56%',
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
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
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
  },
});
