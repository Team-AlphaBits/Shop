import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

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
      <Title
        onPress={() => this.props.navigation.navigate('Login')}
        style={{fontWeight: 'bold', color: color.darkblue}}>
        Login/Signup
      </Title>
    );
    var showlogout = <View></View>;
    if (this.state.signIn) {
      profilepic = (
        <Avatar.Image
          size={100}
          source={{
            uri: 'https://randomuser.me/api/portraits/lego/2.jpg',
          }}
        />
      );
      gotologin = (
        <View>
          <Title style={{color: color.darkblue}}>Username</Title>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              console.log('Going to profile');
            }}>
            <Text style={{color: color.darkblue}}>Open Profile</Text>
            <Icon name="open-in-new" size={20} color={color.darkblue} />
          </TouchableOpacity>
        </View>
      );

      showlogout = (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingStart: '7%',
            paddingBottom: '3%',
          }}
          onPress={() => {
            console.log('Goes to logout');
          }}>
          <Icon name="logout" size={30} color={color.darkblue} />
          <Title style={{color: color.darkblue, fontSize: 25}}>Logout</Title>
        </TouchableOpacity>
      );
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
                  <Icon name="home" color={color.darkblue} size={30} />
                )}
                label="Home"
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon name="grid-view" color={color.darkblue} size={30} />
                )}
                label="Products"
                onPress={() => {
                  this.props.navigation.navigate('Products');
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon name="shopping-cart" color={color.darkblue} size={30} />
                )}
                label="MyCart"
                onPress={() => {
                  console.log('Going to my cart');
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <View>{showlogout}</View>
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
