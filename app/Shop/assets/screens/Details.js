import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button, Title, Paragraph, Appbar} from 'react-native-paper';
import color from '../colors/colors';
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
    var details=this.props.route.params.data;
    var imageUri=details.images;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate('Itemlist');
            }}
          />
          <Appbar.Content title={details.title.length>35?details.title.substring(0, 35 - 3) + '...':details.title} />
        </Appbar.Header>
        <View style={styles.MainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title style={styles.headText}>{details.short_desc}</Title>
            <View style={{marginHorizontal: '3%',marginTop:50}}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={this.change}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: '1%',
                  width: imageUri.length * 100 + '%',
                  height: 300,
                  flexGrow: 1,
                }}>
                {imageUri.map((image, index) => (
                  <Image
                    key={index}
                    source={{uri: image}}
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
              <Text style={styles.price}>{details.price[0]== '₹' ? details.price : '₹' + details.price}</Text>
                <Text style={[styles.avl,{color:details.quantity>0?"green":"red"}]}>{details.quantity>0?"In Stock ("+details.quantity+")":"Out OF STOCk"}</Text>
              <View
                style={{
                  margin: '3%',
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: '3%',
                  borderRadius: 8,
                }}>
                <Title>Description</Title>
                <Paragraph>
                 {details.description}
                </Paragraph>
              </View>
            </View>
          </ScrollView>
          <View style={{flexDirection: 'row', width: '100%'}}>
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
    marginHorizontal: '1%',
    marginVertical: '1%',
    backgroundColor: 'green',
    borderRadius: 8,
    width: '48%',
  },
  btn2: {
    marginHorizontal: '1%',
    marginVertical: '1%',
    backgroundColor: color.lightblue,
    borderRadius: 8,
    width: '48%',
  },
  price: {
    margin: '5%',
    marginBottom: '10%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  avl: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: '5%',
    marginBottom: '5%',
  },
  headText: {
    marginHorizontal: '5%',
  },
});
