import React, {Component, PureComponent} from 'react';
import {
  View,
  SafeAreaView,
  Pressable,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import color from '../colors/colors';
import {Appbar, Searchbar, Snackbar} from 'react-native-paper';
import axios from 'axios';

export default class Search extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchquery: '',
      searchData: null,
      visible: false,
      isLoading: false,
    };
  }

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  getSearchResults = () => {
    if (this.state.searchquery.trim().length != 0) {
      this.setState({isLoading: true});
      axios
        .get('https://calm-garden-34154.herokuapp.com/api/getSearchResults', {
          params: {
            query: this.state.searchquery.trim(),
          },
        })
        .then((res) => {
          this.setState({searchData: res.data.result});
        })
        .catch((e) => {
          this.onToggleSnackBar();
        })
        .then(() => {
          this.setState({isLoading: false});
        });
    } else {
      this.onToggleSnackBar();
    }
  };

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
              this.getSearchResults();
            }}
            searchAccessibilityLabel='search'
            placeholder="Search"
            style={{width: '80%', height: 40}}
            onChangeText={(e) => {
              this.setState({searchquery: e});
            }}
            value={this.state.searchquery}
          />
        </Appbar.Header>
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.MintyGreenDark}
          size="large"
          style={styles.activityindicator}
        />
        <View style={{flex: 1}}>
          {this.state.searchData == null ? (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{color: color.MintyGreenMedium}}>
                Your Search Results will appear here ...
              </Text>
            </View>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}}>
              <FlatList
                data={this.state.searchData}
                key={(item) => item._id}
                renderItem={({item, index}) => (
                  <Pressable
                    style={styles.itemContainer}
                    onPress={() => {
                      this.props.navigation.navigate('Details', {
                        data: item._id,
                        title: item.title,
                      });
                    }}>
                    <Image
                      style={styles.img}
                      source={{uri: item.home_image}}
                      resizeMode="contain"
                    />
                    <View style={{marginBottom: 5}}>
                      <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                        {item.title.length > 20
                          ? item.title.substring(0, 20 - 3) + '...'
                          : item.title}
                      </Text>
                      <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                        {item.price[0] == '₹' ? item.price : '₹' + item.price}
                      </Text>
                    </View>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>
        <View>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => {
              this.onDismissSnackBar();
            }}
            action={{
              label: 'Retry',
              onPress: () => {
                this.getSearchResults();
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
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 60,
  },
  img: {
    height: null,
    width: null,
    flex: 1,
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: color.white,
    width: 350,
    height: 200,
    elevation: 4,
    marginVertical: 10,
  },
});
