/*This is an Example of Grid View in React Native*/
import React, {Component} from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';

import {Appbar, Snackbar} from 'react-native-paper';
import axios from 'axios';
import color from '../colors/colors';

export default class Itemlist extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      marg:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? 5
          : 30,
      cols:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? 2
          : 3,
      visible: false,
      isLoading: false,
    };
  }

  setCategorytpe = () => {
    switch (this.props.route.params.categoryid) {
      case 0:
        return 'Mobiles';
        break;
      case 1:
        return 'Electronics';
        break;
      case 2:
        return 'Clothings';
        break;
      case 3:
        return 'Sports';
        break;
      case 4:
        return 'Books';
        break;
      case 5:
        return 'Decoration';
        break;
      case 6:
        return 'Video_Games';
        break;
      case 7:
        return 'Computer&peripheral';
        break;
      default:
        return 'Mobiles';
        break;
    }
  };

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  unsubscribe_function = {
    unsubscribe: null,
  };

  fetchandupdatedata = () => {
    this.setState({isLoading: true, dataSource: []});
    var categorytype = this.setCategorytpe();
    axios
      .get(
        'https://calm-garden-34154.herokuapp.com/api/category/' + categorytype,
      )
      .then((res) => {
        this.setState({dataSource: res.data});
      })
      .catch((error) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  };

  onChange = ({window, screen}) => {
    if (window.height >= window.width) {
      this.setState({cols: 2, marg: 5});
    } else {
      this.setState({cols: 3, marg: 30});
    }
  };

  componentDidMount() {
    //subscribing to screen changes to call fetchandupdatedata function
    this.unsubscribe_function.unsubscribe = this.props.navigation.addListener(
      'focus',
      () => {
        this.fetchandupdatedata();
      },
    );

    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    //unsubscribing from screen changes
    this.unsubscribe_function.unsubscribe();

    Dimensions.removeEventListener('change', this.onChange);
  }

  render() {
    var categorytype = this.setCategorytpe();
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate('Products');
            }}
          />
          <Appbar.Content title={categorytype} />
        </Appbar.Header>
        <View style={[styles.MainContainer, {marginStart: this.state.marg}]}>
          <FlatList
            onRefresh={() => {
              this.fetchandupdatedata();
            }}
            refreshing={this.state.isLoading}
            key={this.state.cols}
            data={this.state.dataSource}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  this.props.navigation.navigate('Details', {
                    data: item._id,
                    title: item.title,
                  });
                }}>
                <View style={styles.itemcontainer}>
                  <Image
                    style={styles.imageThumbnail}
                    source={{uri: item.home_image}}
                    resizeMode="contain"
                  />
                  <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.name}>
                      {item.title.length > 20
                        ? item.title.substring(0, 20 - 3) + '...'
                        : item.title}
                    </Text>
                    <Text style={styles.price}>
                      {item.price[0] == '₹' ? item.price : '₹' + item.price}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
            //Setting the number of column
            numColumns={this.state.cols}
            keyExtractor={(item, index) => index.toString()}
          />
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
                this.fetchandupdatedata();
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
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 20,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null,
    marginTop: 10,
    flex: 1,
  },
  name: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemcontainer: {
    flex: 1,
    margin: '2%',
    width: 190,
    height: 290,
    backgroundColor: color.white,
    elevation:4
  },
});
