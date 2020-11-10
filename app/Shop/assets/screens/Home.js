import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Snackbar, Badge} from 'react-native-paper';
import color from '../colors/colors';
import axios from 'axios';
import {connect} from 'react-redux';
import {FetchAndLoginData, initializeCart} from '../Redux/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends PureComponent {
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
      active: 0,
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
      'https://calm-garden-34154.herokuapp.com/api/home?',
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
          carousal: response[0].data.carousalData,
          mobile: response[1].data.productData,
          electronics: response[2].data.productData,
          clothing: response[3].data.productData,
          gaming: response[4].data.productData,
          decoration: response[5].data.productData,
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

  storageData = async () => {
    try {
      var data = await AsyncStorage.multiGet(['email', 'password']);
      axios
        .post('https://calm-garden-34154.herokuapp.com/api/login', {
          email: data[0][1],
          password: data[1][1],
        })
        .then((res) => {
          this.props.initializeCart(res.data.userData.cart.total_product);
          this.props.FetchAndLoginData(res.data.userData, data[1][1]);
        })
        .catch((e) => {
          console.log(e + ' error occured in networking while relogging');
        });
    } catch (e) {
      console.log(e + 'storage error');
    }
  };

  componentDidMount() {
    this.fetchandupdatedata();
    this.storageData();
  }

  componentWillUnmount() {
    clearInterval(this.mystate.interval);
  }

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
            color={color.white}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content
            title="SHOP"
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 35,
              marginStart: '35%',
              color: '#03045e',
            }}
          />
          <Appbar.Action
            icon="magnify"
            size={30}
            color={color.white}
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}
          />
          <View>
            <Appbar.Action
              icon="cart"
              color={color.white}
              size={30}
              onPress={() => {
                this.props.navigation.navigate('MyCart');
              }}
            />
            <Badge
              style={{position: 'absolute', backgroundColor: color.BadgeColor}}>
              {this.props.total_product}
            </Badge>
          </View>
        </Appbar.Header>
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.MintyGreenDark}
          size="large"
          style={styles.activityindicator}
        />
        <ScrollView style={{flex: 1}} nestedScrollEnabled>
          <View style={styles.container}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={this.change}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                width: this.state.carousal.length * 100 + '%',
                height: 300,
                flexGrow: 1,
              }}>
              {this.state.carousal.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image.carousal_images}}
                  style={styles.carimg}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <View style={styles.pos}>
              {this.state.carousal.map((i, k) => (
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
          {this.state.bigMobileDisplay != null ? (
            <View style={styles.mobliepar}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Blockbuster Deals on Mobiles :
              </Text>
              <View style={styles.mobilein}>
                <Image
                  style={styles.standardimg}
                  resizeMode="contain"
                  source={{
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    borderColor: color.GoldenYellow,
    borderWidth: 8,
    paddingHorizontal: '5%',
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
});

const mapStateToProps = (state) => {
  return {
    total_product: state.cartReducer.total_product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchAndLoginData: (params) => {
      dispatch(FetchAndLoginData(params));
    },
    initializeCart: (params) => {
      dispatch(initializeCart(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
