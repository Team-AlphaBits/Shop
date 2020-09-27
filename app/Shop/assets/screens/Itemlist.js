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

export default class Itemlist extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      cols: 2,
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
        <View style={styles.MainContainer}>
          <Text style={styles.header}>Header</Text>

          <FlatList
            key={this.state.cols}
            horizontal={false}
            data={this.state.dataSource}
            renderItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  margin: 10,
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
    paddingTop: 30,
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    padding: '2%',
  },
});
