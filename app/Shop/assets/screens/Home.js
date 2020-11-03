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
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Searchbar, Button, Snackbar} from 'react-native-paper';
import color from '../colors/colors';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      carousal: [],
      mobile: [],
      clothing: null,
      decoration: [],
      gaming: [],
      electronics: [],
      visible: false,
      isLoading: false,
    };
  }
  mystate = {
    active: 0,
  };
  change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.mystate.active) {
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
      })
      .catch((error) => {
        this.onToggleSnackBar();
        console.log(error);
      })
      .then(() => {
        this.setState({isLoading: false});
      });

  };

  componentDidMount() {
    this.fetchandupdatedata();
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
        <ActivityIndicator
          animating={this.state.isLoading}
          color={color.black}
          size="large"
        />
        <ScrollView>
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
              {this.state.mobile.slice(0, 4).map((image2, index) => (
                <Image
                  key={index}
                  source={{uri: image2.home_image}}
                  style={styles.img2}
                  resizeMode="contain"
                />
              ))}
            </View>
          </View>
          <Text style={styles.clothsDeal}>
            Great deals on clothings upto 20-40% off
          </Text>
          {this.state.clothing!=null?
          <View style={styles.clothsMain}>
            <View style={styles.clothsinner}>
              {this.state.clothing.slice(0,4).map((item,index)=>(
                <View style={styles.clothsimg}
                key={index}>
                <Image
                  style={styles.standardimg}
                  resizeMode="contain"
                  source={{
                    uri:
                     item.home_image,
                  }}
                />
                <Text style={styles.clothsTitle}>
                  {item.title}
                </Text>
            </View>
              ))}
            </View>
          </View>:<View></View>}
          <View style={styles.TopDeals}>
            <Text style={styles.TopDealsText}>Great Deals on Electronics</Text>
            <View style={styles.DealsMain}>
              <FlatList
                horizontal
                data={this.state.electronics}
                renderItem={({item, index}) => (
                  <View style={styles.DealCard} key={index}>
                    <View style={styles.DealImage}>
                      <Image
                        source={{
                          uri: item.home_image,
                        }}
                        style={styles.standardimg}
                        resizeMode='contain'
                      />
                    </View>
                    <View style={styles.DealCardTextView}>
                      <Text style={styles.DealCardText}>{item.title}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
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
  },
  clothsinner: {
    alignItems:'flex-start',
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  clothsimg: {
    width: 150,
    height: 200,
    borderColor: '#EEE8AA',
    borderWidth: 8,
    marginHorizontal: 20,
    marginVertical:20,
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
