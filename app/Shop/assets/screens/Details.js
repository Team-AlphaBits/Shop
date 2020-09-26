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
import {Button} from 'react-native-paper';
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
      <View style={styles.MainContainer}>
        <ScrollView>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={this.change}
            showsHorizontalScrollIndicator={false}
            style={{
              width,
              height: 300,
              marginTop: 30,
              alignSelf: 'flex-start',
            }}>
            {imageUri.map((image, index) => (
              <Image source={image} style={styles.img} />
            ))}
          </ScrollView>
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
        </ScrollView>
      </View>
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
const {width} = Dimensions.get('screen');
const height = (width * 100) / 60;

const styles = StyleSheet.create({
  MainContainer: {flex: 1, width, height},
  pagging: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 320,
    alignSelf: 'center',
  },
  img: {
    width,
    height: 300,
    resizeMode: 'cover',
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
    margin: '5%',
    marginVertical: '2%',
    borderRadius: 8,
  },
  btn2: {
    margin: '5%',
    marginVertical: '2%',
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
    marginHorizontal: '5%',
    marginBottom: '5%',
  },
});
