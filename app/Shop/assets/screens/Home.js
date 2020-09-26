import React, {Component} from 'react';
import {Button} from 'react-native-paper';
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
import {Appbar, Searchbar} from 'react-native-paper';

class Homescreen extends Component {
  constructor() {
    super();
    this.state = {
      searchpress: true,
    };
  }
  render() {
    var search = (
      <>
        <Appbar.Content
          titleStyle={{marginStart: '25%', fontWeight: 'bold', fontSize: 30}}
          title="SHOP"
        />
        <Appbar.Action
          icon="search"
          size={40}
          onPress={() => {
            this.setState({searchpress: true});
          }}
        />
      </>
    );
    if (this.state.searchpress) {
      search = (
        <Searchbar
          placeholder="Search"
          style={{height: 40, width: '100%'}}
          onChangeText={(e) => {
            console.log(e);
          }}
        />
      );
    }
    return (
      <SafeAreaView style={style.container}>
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
          <View style={{width: 100, height: 50}}>
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              Press me
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Homescreen;

const style = StyleSheet.create({
  headerBar: {
    height: 60,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
});
