<<<<<<< HEAD
import React, {Component} from 'react';
=======
import React, {Component,PureComponent} from 'react';
>>>>>>> origin/master
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
<<<<<<< HEAD
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
=======
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Appbar,
  Searchbar,
  Button,
  Snackbar,
} from 'react-native-paper';
import color from '../colors/colors';
import axios from 'axios';

export default class Home extends PureComponent {
  constructor() {
    super();
    this.state = {
      carousal: [],
      mobile: null,
      clothing: null,
      decoration: [],
      gaming: [],
      electronics: [],
      visible: false,
      isLoading: false,
      mobilearr: null,
      bigMobileDisplay: null,
      bigDecorationDisplay: null,
      active:0
    };
  }
  mystate = {
    interval: null,
  };
  change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.active) {
      this.setState({active: slide});
    }
  };

  onToggleSnackBar = () => {
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  fetchandupdatedata = () => {
    this.setState({isLoading: true});

    const getCarousal = axios.get(
      'https://calm-garden-34154.herokuapp.com/api/home',
    );
    const getMobile = axios.get(
      'https://calm-garden-34154.herokuapp.com/api/category/Mobiles',
    );
    const getElectronics = axios.get(
      'https://calm-garden-34154.herokuapp.com/api/category/Electronics',
    );
    const getClothing = axios.get(
      'https://calm-garden-34154.herokuapp.com/api/category/Clothings',
    );
    const getGaming = axios.get(
      'https://calm-garden-34154.herokuapp.com/api/category/Video_Games',
    );
    const getDecoration = axios.get(
      'https://calm-garden-34154.herokuapp.com/api/category/Decoration',
    );

    axios
      .all([
        getCarousal,
        getMobile,
        getElectronics,
        getClothing,
        getGaming,
        getDecoration,
      ])
      .then((response) => {
        this.setState({
          carousal: response[0].data.carousal_data,
          mobile: response[1].data,
          electronics: response[2].data,
          clothing: response[3].data,
          gaming: response[4].data,
          decoration: response[5].data,
        });
        var marray = [];
        marray.push(this.state.mobile[14]);
        marray.push(this.state.mobile[15]);
        marray.push(this.state.mobile[16]);
        marray.push(this.state.mobile[10]);
        this.setState({mobilearr: marray});
        this.setState({
          bigMobileDisplay: this.state.mobilearr[0],
          bigDecorationDisplay: this.state.decoration[0],
        });
        this.setTimerFunction();
      })
      .catch((error) => {
        this.onToggleSnackBar();
      })
      .then(() => {
        this.setState({isLoading: false});
      });
  };

  setTimerFunction = () => {
    var count = 1;
    this.mystate.interval = setInterval(() => {
      this.setState({
        bigMobileDisplay: this.state.mobilearr[count],
        bigDecorationDisplay: this.state.decoration[count],
      });
      count += 1;
      count %= 4;
    }, 3000);
  };

  componentDidMount() {
    this.fetchandupdatedata();
  }

  componentWillUnmount() {
    clearInterval(this.mystate.interval);
  }

>>>>>>> origin/master
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
<<<<<<< HEAD
        <ScrollView>
=======
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.black}
          size="large"
          style={styles.activityindicator}
        />
        <ScrollView
         style={{flex: 1}}
         nestedScrollEnabled>
>>>>>>> origin/master
          <View style={styles.container}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={this.change}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
<<<<<<< HEAD
                width: images.length * 100 + '%',
                height: 300,
                flexGrow: 1,
              }}>
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image}}
=======
                width: this.state.carousal.length * 100 + '%',
                height: 300,
                flexGrow: 1,
              }}>
              {this.state.carousal.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image.carousal_images}}
>>>>>>> origin/master
                  style={styles.carimg}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <View style={styles.pos}>
<<<<<<< HEAD
              {images.map((i, k) => (
=======
              {this.state.carousal.map((i, k) => (
>>>>>>> origin/master
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
<<<<<<< HEAD
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
=======
          {this.state.bigMobileDisplay != null ? (
            <View style={styles.mobliepar}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Blockbuster Deals on Mobiles :
              </Text>
              <View style={styles.mobilein}>
>>>>>>> origin/master
                <Image
                  style={styles.standardimg}
                  resizeMode="contain"
                  source={{
<<<<<<< HEAD
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
=======
                    uri: this.state.bigMobileDisplay.home_image,
                  }}
                />
                <Text style={styles.mobtitle}>
                  {this.state.bigMobileDisplay.title}
                </Text>
              </View>
              <View style={styles.minimob}>
                {this.state.mobilearr.map((image2, index) => (
                  <Pressable
                    key={index}
                    style={{flex: 1}}
                    onPress={() => {
                      this.props.navigation.navigate('Details', {
                        data: image2._id,
                      });
                    }}>
                    <View style={{flex: 1}}>
                      <Image
                        source={{uri: image2.home_image}}
                        style={styles.img2}
                        resizeMode="contain"
                      />
                    </View>
                  </Pressable>
                ))}
              </View>
              <Pressable
                onPress={() => {
                  this.props.navigation.navigate('Itemlist', {categoryid: 0});
                }}>
                <View style={styles.linkingPage}>
                  <Text style={{color: color.MintyGreenMedium}}>
                    Show All Deals{' '}
                  </Text>
                  <Icon
                    name="arrow-right"
                    size={20}
                    color={color.MintyGreenMedium}
                  />
                </View>
              </Pressable>
            </View>
          ) : (
            <View></View>
          )}
          {this.state.clothing != null ? (
            <View>
              <Text style={styles.clothsDeal}>
                Great deals on clothings upto 20-40% off :
              </Text>
              <View style={styles.clothsMain}>
                <View style={styles.clothsinner}>
                  {this.state.clothing.slice(0, 4).map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        this.props.navigation.navigate('Details', {
                          data: item._id,
                        });
                      }}>
                      <View style={styles.clothsimg}>
                        <Image
                          style={styles.standardimg}
                          resizeMode="contain"
                          source={{
                            uri: item.home_image,
                          }}
                        />
                        <Text style={styles.clothsTitle}>{item.title}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
                <Pressable
                  onPress={() => {
                    this.props.navigation.navigate('Itemlist', {categoryid: 2});
                  }}>
                  <View style={styles.linkingPage}>
                    <Text style={{color: color.MintyGreenMedium}}>
                      Show All Deals{' '}
                    </Text>
                    <Icon
                      name="arrow-right"
                      size={20}
                      color={color.MintyGreenMedium}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          ) : (
            <View></View>
          )}
          <View style={styles.TopDeals}>
            <Text style={styles.TopDealsText}>Great Deals on Electronics</Text>
            <View style={styles.DealsMain}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.electronics}
                renderItem={({item, index}) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      this.props.navigation.navigate('Details', {
                        data: item._id,
                      });
                    }}>
                    <View style={styles.DealCard}>
                      <View style={styles.DealImage}>
                        <Image
                          source={{
                            uri: item.home_image,
                          }}
                          style={styles.standardimg}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.DealCardTextView}>
                        <Text style={styles.DealCardText}>{item.title}</Text>
                      </View>
                    </View>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <Pressable
                onPress={() => {
                  this.props.navigation.navigate('Itemlist', {categoryid: 1});
                }}>
                <View style={styles.linkingPage}>
                  <Text style={{color: color.MintyGreenMedium}}>
                    Show All Deals{' '}
                  </Text>
                  <Icon
                    name="arrow-right"
                    size={20}
                    color={color.MintyGreenMedium}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => {
              this.onDismissSnackBar();
            }}
            action={{
              label: 'Retry',
              onPress: () => {
                this.fetchandupdatedata();
              },
            }}>
            Something Went Wrong !
          </Snackbar>
        </View>
>>>>>>> origin/master
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
<<<<<<< HEAD
  DealImage: {flex: 2},
  DealCardTextView: {flex: 1, paddingLeft: 20, paddingTop: 10},
  DealCardText: {fontSize: 16, fontWeight: '700'},
  DealsMain: {height: 130, marginTop: 20},
=======
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
    marginVertical: 50,
    paddingHorizontal: 10,
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
    justifyContent: 'center',
    alignSelf: 'center',
  },
  minimob: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    width: '100%',
    marginTop: 20,
  },
  img2: {width: null, height: null, flex: 1},
  clothsDeal: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
  },
  clothsMain: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  clothsinner: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  clothsimg: {
    width: 150,
    height: 200,
    borderColor: '#EEE8AA',
    borderWidth: 8,
    paddingHorizontal:'5%',
    marginVertical: '5%',
    borderRadius: 5,
  },
  clothsTitle: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
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
  DealImage: {flex: 1},
  DealCardTextView: {flex: 1, paddingLeft: 20, paddingTop: 10},
  DealCardText: {fontSize: 16, fontWeight: '700'},
  DealsMain: {height: 130, marginTop: 20},
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 60,
  },
  linkingPage: {
    flexDirection: 'row',
    marginVertical: 10,
    marginStart: 20,
  },
>>>>>>> origin/master
});
