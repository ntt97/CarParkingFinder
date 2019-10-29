import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Picker,
  FlatList
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
const {Marker} = MapView;
const { height, width } = Dimensions.get("screen");
const parkings = [
  {
    id: 1,
    title: "Parking 1",
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: 37.78845,
      longitude: -122.4344
    }
  },
  {
    id: 2,
    title: "Parking 2",
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: 37.78615,
      longitude: -122.4314
    }
  },
  {
    id: 3,
    title: "Parking 3",
    price: 10,
    rating: 4.0,
    spots: 50,
    free: 25,
    coordinate: {
      latitude: 37.78815,
      longitude: -122.4314
    }
  }
];
export default class Map extends Component {
  state = {
    hours: {},
    active:null
  };
  componentDidMount() {
    const hours = {};
    parkings.map(parking => {
      hours[parking.id] = 1;
    });
    this.setState({ hours });
  }
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
      <TouchableWithoutFeedback onPress={()=>this.setState({active:item.id})}>
        <View key={`parking-${item.id}`} style={styles.parking}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text>
            x {item.spots} {item.title}
          </Text>
          {/* <Picker
              selectedValue={this.state.hours[item.id ||1]}
              style={{height: 50, width: 120}}
              itemStyle={{borderWidth:1,borderColor:'grey'}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({hours: {...this.state.hours,[item.id]:itemValue}})
              }>
              <Picker.Item label="01:00" value={1} />
              <Picker.Item label="02:00" value={2} />
              <Picker.Item label="03:00" value={3} />
              <Picker.Item label="04:00" value={4} />
              <Picker.Item label="05:00" value={5} />
              <Picker.Item label="06:00" value={6} />
          </Picker> */}
          <View
            style={{
              width: 100,
              borderRadius: 6,
              borderColor: "grey",
              borderWidth: 0.5,
              padding: 4
            }}
          >
            <Text style={{ fontSize: 16 }}>05:00 hrs</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons color="#7D81BA" size={18} name="ios-pricetag" />
              <Text style={{ marginLeft: 12 }}>${item.price}</Text>
            </View>

            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons color="#7D81BA" size={18} name="ios-star" />
              <Text style={{ marginLeft: 12 }}>{item.rating}</Text>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.buy}>
              <View>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 25,
                    color: "#fff",
                    fontWeight: "500"
                  }}
                >
                  ${item.price * 2}
                </Text>
                <Text style={{ color: "#fff" }}>
                  {item.price}x{hours[item.id]} hrs
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ fontSize: 25, color: "#fff", fontWeight: "500" }}
                >
                  >
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      </TouchableWithoutFeedback>
      
    );
  }
  renderParkings() {
    return (
      <FlatList
        horizontal={true}
        style={styles.parkings}
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        data={parkings}
        renderItem={({ item }) => this.renderParking(item)}
        keyExtractor={item => `parking-${item.id}`}
      />
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
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121
          }}
          style={styles.map}
        >
          {parkings.map(parking => (
              <Marker
                key={`marker-${parking.id}`}
                coordinate={parking.coordinate}
              >
                <View style={[styles.marker,this.state.active===parking.id? styles.active:null]}>
                    <Text style={{color:"#B40815"}}>${parking.price}</Text>
                    <Text>({parking.free}/{parking.spots})</Text>
                </View>
              </Marker>
           ))}
        </MapView>
        
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
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 16,
  },
  buy: {
    flex: 1,
    backgroundColor: "#840B15",
    borderRadius: 6,
    padding: 12,
    flexDirection: "row"
  },
  marker:{
   
    flex:1,   
    flexDirection:"row",
    borderRadius:24,
    paddingVertical:12,
    paddingHorizontal:24,
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:'grey'
    

  },
  active:{
    borderColor:'#B40815',
    borderWidth:1
  }
});
