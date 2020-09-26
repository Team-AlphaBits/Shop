import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Title, Paragraph} from 'react-native-paper';
export default class Details extends React.Component {
  state = {
    active: 0,
  };
  change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.active) {
      this.setState({active: slide});
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.MainContainer}>
          <ScrollView>
            <View style={{marginHorizontal: '3%'}}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={this.change}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: '3%',
                  width: imageUri.length * 100 + '%',
                  height: 300,
                  flexGrow: 1,
                }}>
                {imageUri.map((image, index) => (
                  <Image
                    source={image}
                    style={styles.img}
                    resizeMode="contain"
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.pagging}>
              {imageUri.map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == this.state.active
                      ? styles.paggingActiveText
                      : styles.paggingText
                  }>
                  ⬤
                </Text>
              ))}
            </View>
            <View style={styles.btnView}>
              <Text style={styles.price}>₹ 24,999.00</Text>
              <Text style={styles.avl}>In stock</Text>
            </View>
          </ScrollView>
          <View>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed')}
              style={styles.btn1}>
              Buy Now
            </Button>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed')}
              style={styles.btn2}>
              Add to cart
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const imageUri = [
  require('../images/img_1.jpg'),
  require('../images/Horse.jpg'),
  require('../images/img_2.jpg'),
  require('../images/img_3.jpg'),
  require('../images/img_4.jpg'),
];

const styles = StyleSheet.create({
  MainContainer: {flex: 1},
  pagging: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    marginHorizontal: 10,
  },
  paggingText: {
    color: 'black',
    margin: '3%',
    fontSize: 20,
  },
  paggingActiveText: {
    color: '#888',
    margin: '3%',
    fontSize: 20,
  },
  btnView: {
    marginTop: 20,
  },
  btn1: {
    marginHorizontal: '5%',
    marginVertical: '2%',
    borderRadius: 8,
  },
  btn2: {
    marginHorizontal: '5%',
    marginBottom: '2%',
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  price: {
    margin: '5%',
    marginBottom: '10%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  avl: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: '5%',
    marginBottom: '5%',
  },
});
