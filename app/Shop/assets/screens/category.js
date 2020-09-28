import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Title,
  Appbar,
  Button,
  Text,
  Surface,
  Subheading,
} from 'react-native-paper';

import color from '../colors/colors';

export default class products extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content titleStyle={{fontSize: 25}} title="Products" />
        </Appbar.Header>
        <View>
          <ScrollView style={{marginVertical: '5%', marginHorizontal: '5%'}}>
            <Pressable>
              <Surface style={style.categorycontainer}>
                <Image
                  source={require('../images/smartphones.jpeg')}
                  style={style.image}
                />
                <View>
                  <Text>SmartPhones</Text>
                </View>
              </Surface>
            </Pressable>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  image: {
    height: null,
    width: null,
    flex: 1,
  },
  categorycontainer: {
    width: 100,
    height: 100,
    elevation: 10,
  },
});
