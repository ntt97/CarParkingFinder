import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import MapView from "react-native-maps";

const { height, width } = Dimensions.get("screen");
const parkings = [
  {
    id: 1,
    title: "Parking 1",
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    location: {
      lat: 37.78835,
      lng: -122.4334
    }
  },
  {
    id: 2,
    title: "Parking 2",
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    location: {
      lat: 37.78825,
      lng: -122.4324
    }
  },
  {
    id: 3,
    title: "Parking 3",
    price: 10,
    rating: 4.0,
    spots: 50,
    free: 25,
    location: {
      lat: 37.78815,
      lng: -122.4314
    }
  }
];
export default class Map extends Component {
  state = {
    hours: {}
  };
  renderHeader() {
    return (
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
    );
  }
  renderParking(item) {
    const { hours } = this.state;
    return (
      <View key={`parking-${item.id}`} style={styles.parking}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text>
            x {item.spots} {item.title}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{flex:1}}> 
            <Text>${item.price}</Text>
            <Text>{item.rating}</Text>
          </View>

          <TouchableWithoutFeedback>
            <View style={styles.buy}>
              <View >
                <Text style={{flex:2,fontSize:25,color:"#fff",fontWeight:'500'}}>${item.price * 2}</Text>
                <Text style={{color:"#fff"}}>{item.price}x{hours[item.id]} hrs</Text>
              </View>
              <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:25,color:'#fff'}}>></Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  renderParkings() {
    return (
      <ScrollView
        horizontal={true}
        style={styles.parkings}
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
      >
        {parkings.map(parking => this.renderParking(parking))}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={styles.map}
        />
        {this.renderParkings()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff"
  },
  header: {
    flex: 0.5
  },
  map: {
    flex: 3
  },
  parkings: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 24
  },
  parking: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 24,
    width: width - 24 * 2,
    flexDirection: "row"
  },
  buy: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 6,
    padding:12,
    flexDirection:'row'
  }
});
