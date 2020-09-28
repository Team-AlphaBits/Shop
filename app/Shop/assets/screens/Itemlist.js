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
} from 'react-native';

import {Appbar} from 'react-native-paper';

export default class Itemlist extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      cols:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? 2
          : 3,
    };
  }

  onChange = ({window, screen}) => {
    if (window.height >= window.width) {
      this.setState({cols: 2});
    } else {
      this.setState({cols: 3});
    }
  };

  componentDidMount() {
    let items = Array.apply(null, Array(12)).map((i) => {
      return {id: i, name: 'DSLR Camera', price: '₹ 24,999.00'};
    });
    this.setState({
      dataSource: items,
    });

    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate('Products');
            }}
          />
          <Appbar.Content title="Header" />
        </Appbar.Header>
        <View style={styles.MainContainer}>
          <FlatList
            key={this.state.cols}
            data={this.state.dataSource}
            renderItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  margin: '2%',
                }}>
                <Image
                  style={styles.imageThumbnail}
                  source={require('../images/img_1.jpg')}
                />
                <View style={{backgroundColor: 'white', width: 190}}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>
            )}
            //Setting the number of column
            numColumns={this.state.cols}
            keyExtractor={(item, index) => index.toString()}
          />
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
    height: 150,
    width: 190,
    padding: '2%',
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
});
