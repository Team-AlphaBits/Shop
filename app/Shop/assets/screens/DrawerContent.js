import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {Avatar, Text, Title, Drawer} from 'react-native-paper';
import color from '../colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class DrawerContent extends Component {
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
      <Title onPress={() => this.props.navigation.navigate('Login')}>
        Login/Signup
      </Title>
    );
    if (this.state.signIn) {
      profilepic = (
        <Avatar.Image
          size={100}
          source={{
            uri: 'https://randomuser.me/api/portraits/lego/2.jpg',
          }}
        />
      );
      gotologin = <Title>Username</Title>;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <DrawerContentScrollView>
          <View style={style.userinfo}>
            <View>{profilepic}</View>
            <View style={{marginTop: 20, marginStart: 10}}>{gotologin}</View>
          </View>

          <View>
            <Drawer.Section title="Myoptions">
              <DrawerItem
                icon={() => (
                  <Icon name="home" color={color.darkblue} size={50} />
                )}
                label="Home"
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon name="shopping-cart" color={color.darkblue} size={50} />
                )}
                label="Products"
                onPress={() => {
                  this.props.navigation.navigate('Products');
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon name="shopping-cart" color={color.darkblue} size={50} />
                )}
                label="Details"
                onPress={() => {
                  this.props.navigation.navigate('Details');
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
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
