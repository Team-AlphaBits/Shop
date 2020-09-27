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
//import all the components we will need

export default class Itemlist extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
      cols: 2,
    };
  }

  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(12)).map((i) => {
      return {id: i, name: 'DSLR Camera', price: '₹ 24,999.00'};
    });
    that.setState({
      dataSource: items,
    });
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        this.setState({cols: 2});
      } else {
        this.setState({cols: 3});
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
        <View style={styles.MainContainer}>
          <Text style={styles.header}>Header</Text>

          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
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
    if (this.state.orientation === 'portrait') {
      return (
        //Render View to be displayed in portrait mode
        this.setState({cols: 3})
      );
    } else {
      return (
        //Render View to be displayed in landscape mode
        this.setState({cols: 3})
      );
    }
  }
}
const width = Dimensions.get('screen');
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
