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
const Deals = [
  {
    src:
      'https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Jupiter/Phase-3/GW/DesktopGateway_CategoryCard_758X608_40.5x._SY304_CB417695846_.jpg',
    name: 'Electronic Products',
  },
  {
    src:
      'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Fashion/EVENT/Jupiter_GW_Softlines/Phase-3/QC-English/PC/DesktopGateway_QuadCard_186x116_ASIN_LIFESTYLE2-fashion-3._SY116_CB417610420_.jpg',
    name: 'School Kit',
  },
  {
    src:
      'https://images-eu.ssl-images-amazon.com/images/G/31/Launchpad/2019/FA/GW/JupiterPhase3/Home-decor-storage-essentials_379X304._SY304_CB418065311_.jpg',
    name: 'Home Deoration',
  },
  {
    src: 'https://m.media-amazon.com/images/I/81gobc50x6L._AC_UY327_QL65_.jpg',
    name: 'Books',
  },
  {
    src: 'https://m.media-amazon.com/images/I/81cIK-WlKDL._AC_UY327_QL65_.jpg',
    name: 'Video Games',
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
          <View style={styles.imgslide}>
            <Image
              style={styles.standardimg}
              source={{
                uri:
                  'https://images-eu.ssl-images-amazon.com/images/G/31/img16/vineet/Jupiter_GW-Editorial_1150x323_P3._CB418019451_.jpg',
              }}
            />
          </View>
          <View style={styles.mobliepar}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Blockbuster deals on on mobiles
            </Text>
            <View style={styles.mobilein}>
              <Image
                style={styles.standardimg}
                resizeMode="contain"
                source={{
                  uri:
                    'https://images-na.ssl-images-amazon.com/images/I/71dujTTJDZL._SL1500_.jpg',
                }}
              />
              <Text style={styles.mobtitle}>
                Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage)
              </Text>
            </View>
            <View style={styles.minimob}>
              {img.map((image2, index) => (
                <Image
                  key={index}
                  source={{uri: image2.src}}
                  style={styles.img2}
                  resizeMode="contain"
                />
              ))}
            </View>
          </View>
          <Text style={styles.clothsDeal}>
            Great deals on clothings upto 20-40% off
          </Text>
          <View style={styles.clothsMain}>
            <View style={styles.clothsinner}>
              <View style={styles.clothsimg}>
                <Image
                  style={styles.standardimg}
                  resizeMode="contain"
                  source={{
                    uri:
                      'https://rukminim1.flixcart.com/image/580/696/jws547k0/jacket/f/3/p/l-torn-2-klizen-original-imafhd3n3tmdnwev.jpeg?q=50',
                  }}
                />
                <Text style={styles.clothsTitle}>
                  Full Sleeve Washed Men Denim Jacket
                </Text>
              </View>
              <View style={styles.clothsimg}>
                <Image
                  style={styles.standardimg}
                  resizeMode="contain"
                  source={{
                    uri:
                      'https://m.media-amazon.com/images/I/81niC633wIL._AC_UL480_QL65_.jpg',
                  }}
                />
                <Text style={styles.clothsTitle}>
                  Full Sleeve Solid Denim Jacket
                </Text>
              </View>
            </View>
            <View style={styles.clothsinner}>
              <View style={styles.clothsimg}>
                <Image
                  style={styles.standardimg}
                  resizeMode="contain"
                  source={{
                    uri:
                      'https://rukminim1.flixcart.com/image/880/1056/kfeamq80-0/shirt/p/d/k/xl-bss-try-this-original-imafvvae4ghhy5pd.jpeg?q=50',
                  }}
                />
                <Text style={styles.clothsTitle}>
                  Solid Men Polo Neck White, Black T-Shirt
                </Text>
              </View>
              <View style={styles.clothsimg}>
                <Image
                  style={styles.standardimg}
                  resizeMode="contain"
                  source={{
                    uri:
                      'https://rukminim1.flixcart.com/image/580/696/jp02t8w0/sweatshirt/4/s/3/s-trdsweatabs1-tripr-original-imafba7amtg5z4bd.jpeg?q=50',
                  }}
                />
                <Text style={styles.clothsTitle}>
                  Full Sleeve Printed Men Jacket
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.TopDeals}>
            <Text style={styles.TopDealsText}>Great Deals on Product</Text>
            <View style={styles.DealsMain}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Deals.map((Deal, index) => (
                  <View style={styles.DealCard} key={index}>
                    <View style={styles.DealImage}>
                      <Image
                        source={{
                          uri: Deal.src,
                        }}
                        style={styles.standardimg}
                      />
                    </View>
                    <View style={styles.DealCardTextView}>
                      <Text style={styles.DealCardText}>{Deal.name}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
  carimg: {
    width: null,
    height: null,
    flex: 1,
  },
  imgslide: {
    marginTop: -150,
    flex: 1,
    width: '100%',
    height: 150,
  },
  mobliepar: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    marginVertical: 50,
    marginHorizontal: 10,
  },
  indicator: {color: '#888', margin: 3, fontSize: 10},
  indicatorActive: {color: '#fff', margin: 3, fontSize: 10},
  pos: {
    flexDirection: 'row',
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
  },
  mobilein: {flex: 1, width: '100%', height: 300, marginTop: 20},
  standardimg: {width: null, height: null, flex: 1},
  mobtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
  minimob: {
    flex: 1,
    flexDirection: 'row',
    height: 200,
    marginTop: 20,
  },
  img2: {width: null, height: null, flex: 1, margin: 20},
  clothsDeal: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
  },
  clothsMain: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 20,
    margin: 10,
  },
  clothsinner: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  clothsimg: {
    flex: 1,
    width: '40%',
    height: 200,
    borderColor: '#EEE8AA',
    borderWidth: 8,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  clothsTitle: {fontWeight: 'bold', justifyContent: 'center'},
  TopDeals: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    marginBottom: 20,
  },
  TopDealsText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  DealCard: {
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  DealImage: {flex: 2},
  DealCardTextView: {flex: 1, paddingLeft: 20, paddingTop: 10},
  DealCardText: {fontSize: 16, fontWeight: '700'},
  DealsMain: {height: 130, marginTop: 20},
});
