import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Pressable} from 'react-native';

import {Avatar, Title, Drawer} from 'react-native-paper';
import color from '../colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {logoutAction} from '../Redux/index';

class DrawerContent extends Component {
  constructor() {
    super();
    this.state = {
      signIn: false,
    };
  }

  render() {
    var profilepic = (
      <Icon name="account-circle" size={100} color={color.darkblue} />
    );
    var gotologin = (
      <Pressable onPress={() => this.props.navigation.navigate('Login')}>
        <Title style={{fontWeight: 'bold', color: color.darkblue}}>
          Login/Signup
        </Title>
      </Pressable>
    );
    var showlogout = <View></View>;
    if (this.props.isLoggedIn) {
      profilepic = (
        <Avatar.Image
          size={100}
          source={{
            uri: 'https://randomuser.me/api/portraits/lego/2.jpg',
          }}
        />
      );
      gotologin = (
        <View
          style={{
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            width: 150,
            flexDirection: 'row',
          }}>
          <Title style={{color: color.darkblue, fontSize: 20}}>Welcome, </Title>
          <Title style={{color: color.darkblue, fontSize: 20}}>
            {this.props.username}
          </Title>
        </View>
      );

      showlogout = (
        <Pressable
          style={{
            flexDirection: 'row',
            paddingStart: '7%',
            paddingBottom: '3%',
          }}
          onPress={() => {
            this.props.logoutAction();
          }}>
          <Icon name="logout" size={30} color={color.darkblue} />
          <Title style={{color: color.darkblue, fontSize: 25}}>Logout</Title>
        </Pressable>
      );
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient
          colors={[
            color.MintyGreenDark,
            color.MintyGreenLight,
            color.MintyGreenLight,
            color.MintyGreenLight,
            color.MintyGreenLight,
            color.MintyGreenLight,
          ]}
          style={{flex: 1}}>
          <DrawerContentScrollView>
            <View style={style.userinfo}>
              <View>{profilepic}</View>
              <View style={{marginTop: 20, marginStart: 10}}>{gotologin}</View>
            </View>

            <View>
              <Drawer.Section title="My Options">
                <DrawerItem
                  icon={() => (
                    <Icon name="home" color={color.darkblue} size={30} />
                  )}
                  label="Home"
                  labelStyle={{fontWeight: 'bold', color: color.darkblue}}
                  onPress={() => {
                    this.props.navigation.navigate('Home');
                  }}
                />
                <DrawerItem
                  icon={() => (
                    <Icon name="view-grid" color={color.darkblue} size={30} />
                  )}
                  label="Products"
                  labelStyle={{fontWeight: 'bold', color: color.darkblue}}
                  onPress={() => {
                    this.props.navigation.navigate('Products');
                  }}
                />
                <DrawerItem
                  icon={() => (
                    <Icon name="cart" color={color.darkblue} size={30} />
                  )}
                  label="MyCart"
                  labelStyle={{fontWeight: 'bold', color: color.darkblue}}
                  onPress={() => {
                    this.props.navigation.navigate('MyCart');
                  }}
                />

                <DrawerItem
                  icon={() => (
                    <Icon
                      name="clipboard-list"
                      color={color.darkblue}
                      size={30}
                    />
                  )}
                  label="My Order"
                  labelStyle={{fontWeight: 'bold', color: color.darkblue}}
                  onPress={() => {
                    this.props.navigation.navigate('MyOrder');
                  }}
                />
                <DrawerItem
                  icon={() => (
                    <Icon name="information" color={color.darkblue} size={30} />
                  )}
                  label="About"
                  labelStyle={{fontWeight: 'bold', color: color.darkblue}}
                  onPress={() => {
                    this.props.navigation.navigate('About');
                  }}
                />
              </Drawer.Section>
            </View>
          </DrawerContentScrollView>
          <View>{showlogout}</View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  userinfo: {
    marginStart: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
});

const mapStatetoProps = (state) => {
  return {
    username: state.LoginReducer.username,
    isLoggedIn: state.LoginReducer.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(DrawerContent);
