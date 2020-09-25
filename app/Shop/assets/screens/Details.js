/*This is an Example of Grid View in React Native*/
import React, {Component} from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
//import all the components we will need

export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
    };
  }
  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(10)).map((i) => {
      return {id: i};
    });
    that.setState({
      dataSource: items,
    });
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
        <View style={styles.MainContainer}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                }}>
                <Image
                  style={styles.imageThumbnail}
                  source={require('../images/img_1.jpg')}
                />
                <View style={{backgroundColor: 'white', width: 200}}>
                  <Text style={styles.name}>DSLR Camera</Text>
                  <Text style={styles.price}> ₹ 24,999.00 </Text>
                </View>
              </View>
            )}
            //Setting the number of column
            numColumns={2}
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
    height: 205,
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
