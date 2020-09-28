import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Title, Appbar, Button, Text, Surface} from 'react-native-paper';

import color from '../colors/colors';

export default class products extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {name: 'Smartphone', path: require('../images/smartphones.jpeg')},
        {name: 'laptop', path: require('../images/laptop.jpg')},
        {name: 'Electronics', path: require('../images/electronics.jpg')},
        {name: 'Clothing', path: require('../images/clothing.jpg')},
        {name: 'Cosmetics', path: require('../images/cosmetics.jpg')},
        {name: 'Grocery', path: require('../images/grocery.jpg')},
        {name: 'Sports', path: require('../images/sports.jpg')},
        {name: 'Toys & Baby', path: require('../images/baby_things.jpg')},
        {name: 'Books', path: require('../images/books.jpeg')},
      ],
      columnno:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? 2
          : 3,
    };
  }

  onchange = ({window, screen}) => {
    if (window.height >= window.width) {
      this.setState({columnno: 2});
    } else {
      this.setState({columnno: 3});
    }
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onchange);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onchange);
  }

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
        <View style={{marginStart: 5, marginBottom: 60}}>
          <FlatList
            key={this.state.columnno}
            data={this.state.data}
            renderItem={({item, index}) => (
              <Pressable>
                <Surface style={style.card}>
                  <Image source={item.path} style={style.image} />
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                </Surface>
              </Pressable>
            )}
            numColumns={this.state.columnno}
            keyExtractor={(item, index) => index.toString()}
          />
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
  card: {
    width: 170,
    height: 170,
    elevation: 4,
    marginVertical: '5%',
    marginHorizontal: '5%',
  },
});
