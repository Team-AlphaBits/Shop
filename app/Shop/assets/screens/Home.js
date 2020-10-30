import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  Pressable,
  ScrollView,
  Title,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Searchbar, Button} from 'react-native-paper';
import color from '../colors/colors';
const img = [
  {
    src:
      'https://images-na.ssl-images-amazon.com/images/I/71dujTTJDZL._SL1500_.jpg',
    name: 'Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage)',
  },
  {
    src: 'https://m.media-amazon.com/images/I/61lxgxsz7VL._AC_UY327_QL65_.jpg',
    name: 'Oppo A52 (Twilight Black, 6GB RAM, 128GB Storage)',
  },
  {
    src:
      'https://images-na.ssl-images-amazon.com/images/I/71aqNzEqj0L._SL1500_.jpg',
    name: 'OnePlus Nord 5G (Gray Onyx, 12GB RAM, 256GB Storage) ',
  },
  {
    src: 'https://m.media-amazon.com/images/I/81u6E5niDiL._AC_UY327_QL65_.jpg',
    name: 'Redmi Note 9 Pro Max (Aurora Blue, 6GB RAM, 64GB Storage)',
  },
];
const {width} = Dimensions.get('window');
const height = width * 0.6; //60%
const images = [
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/GWphase3/V4/Phase3_Unrec_PC_Hero_ENGLISH_1X._CB417898155_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Jupiter/Phase-3/GW/Starting99_3000x1200._CB417694208_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Fashion/EVENT/Jupiter_GW_Softlines/Phase-3/Unrec_Amazon_GRD_3000x1200._CB417611024_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Recunrecphase3/1300._CB417698488_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img18/Lawn_Garden/Mobile_hero_wave-3_3000x1200._CB417897278_.jpg',
];
export default class Home extends Component {
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
        <StatusBar
          backgroundColor={color.MintyGreenDark}
          barStyle="light-content"
        />
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content
            title="SHOP"
            titleStyle={{fontWeight: 'bold', fontSize: 35, marginStart: '35%'}}
          />
          <Appbar.Action
            icon="magnify"
            size={30}
            color={color.white}
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}
          />
          <Appbar.Action
            icon="cart"
            color={color.white}
            size={30}
            onPress={() => {
              this.props.navigation.navigate('MyCart');
            }}
          />
        </Appbar.Header>
        <ScrollView>
          <View style={styles.container}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={this.change}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: '1%',
                width: images.length * 100 + '%',
                height: 300,
                flexGrow: 1,
              }}>
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image}}
                  style={styles.carimg}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <View style={styles.pos}>
              {images.map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == this.state.active
                      ? styles.indicatorActive
                      : styles.indicator
                  }>
                  ⬤
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 5,
              marginTop: -150,
            }}>
            <View style={{flex: 1, width: '100%', height: 300, marginTop: 20}}>
              <Image
                style={{width: null, height: null, flex: 1}}
                resizeMode="contain"
                source={{
                  uri:
                    'https://images-na.ssl-images-amazon.com/images/I/71dujTTJDZL._SL1500_.jpg',
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginHorizontal: '5%',
                }}>
                Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage)
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: 200,
                marginTop: 20,
              }}>
              {img.map((image2, index) => (
                <Image
                  key={index}
                  source={{uri: image2.src}}
                  style={{width: null, height: null, flex: 1, margin: 20}}
                  resizeMode="contain"
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  carimg: {
    width: null,
    height: null,
    flex: 1,
  },
  indicator: {color: '#888', margin: 3, fontSize: 20},
  indicatorActive: {color: '#fff', margin: 3, fontSize: 20},
  pos: {
    flexDirection: 'row',
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
  },
});
