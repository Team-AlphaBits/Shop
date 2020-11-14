import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
const Data = [
  {
    index: 1,
    src: 'https://m.media-amazon.com/images/I/41xg1z2h-uL._AC_SY200_.jpg',
    name: 'Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage) ',
  },
  {
    index: 2,
    src: 'https://m.media-amazon.com/images/I/41IGxaJjq8L._AC_SY200_.jpg',
    name: 'OnePlus Nord 5G (Gray Onyx, 12GB RAM, 256GB Storage) ',
  },
  {
    index: 3,
    src:
      'https://images-na.ssl-images-amazon.com/images/I/61pW8BWBq1L._SL1000_.jpg',
    name: 'Lenovo Legion 5Pi 10th Gen Intel Core i7 15.6" FHD Gaming Laptop ',
  },
  {
    index: 4,
    src:
      'https://images-na.ssl-images-amazon.com/images/I/61p3lA4N3uL._SL1000_.jpg',
    name:
      'Lenovo Legion 5i 10th Gen Intel Core i7 15.6 inch Full HD Gaming Laptop  ',
  },
  {
    index: 5,
    src:
      'https://images-na.ssl-images-amazon.com/images/I/914o5xV1%2B8L._SL1500_.jpg',
    name: 'ASUS TUF Gaming F15 Laptop 15.6" FHD Intel Core i7 10th Gen ',
  },
];
export default class MyOrder extends Component {
  render() {
    return (
      <View style={styles.maincontainer}>
        <FlatList
          data={Data}
          renderItem={({item}) => (
            <View style={styles.container}>
              <View style={styles.imgcontainer}>
                <Image
                  style={styles.img}
                  resizeMode="contain"
                  source={{
                    uri: item.src,
                  }}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.name} </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  maincontainer: {
    marginTop: 10,
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    height: 120,
    borderBottomWidth: 2,
  },
  imgcontainer: {
    flex: 1,
    width: '20%',
    height: 100,
    padding: 10,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
  },
  textContainer: {
    width: '60%',
    height: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '15%',
  },
});
