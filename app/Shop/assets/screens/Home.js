import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import color from '../colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Appbar, Searchbar, Button} from 'react-native-paper';

export default class Homescreen extends Component {
  constructor() {
    super();
    this.state = {
      searchpressed: false,
      searchquery: '',
    };
  }

  render() {
    var search = (
      <View style={{flexDirection: 'row', width: '80%'}}>
        <Appbar.Content
          title="SHOP"
          titleStyle={{fontWeight: 'bold', fontSize: 30, marginStart: '35%'}}
        />
        <Icon
          name="search"
          color={color.white}
          size={40}
          onPress={() => {
            this.setState({searchpressed: true});
          }}
        />
      </View>
    );
    if (this.state.searchpressed) {
      search = (
        <Searchbar
          onIconPress={() => {
            this.setState({searchpressed: false});
          }}
          placeholder="Search"
          style={{width: '80%',height:40}}
          onChangeText={(e) => {
            this.setState({searchquery: e});
          }}
          value={this.state.searchquery}
        />
      );
    }
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
          {search}
        </Appbar.Header>
        <View>
          <Text>Hello</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
