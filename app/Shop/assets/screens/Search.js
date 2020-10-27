import React, { Component } from 'react'
import { Text, View,SafeAreaView,StatusBar } from 'react-native'

import color from '../colors/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Searchbar, Button} from 'react-native-paper';

export default class Search extends Component {

    constructor() {
        super();
        this.state = {
          searchquery: '',
        };
      }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="keyboard-backspace"
            size={30}
            onPress={() => {
                this.props.navigation.navigate('Home');
            }}
          />
         <Searchbar
          onIconPress={() => {
            console.log(this.state.searchquery)
          }}
          placeholder="Search"
          style={{width: '80%', height: 40}}
          onChangeText={(e) => {
            this.setState({searchquery: e});
          }}
          value={this.state.searchquery}
        />
        </Appbar.Header>
      </SafeAreaView>
        )
    }
}
