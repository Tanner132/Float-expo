import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import siteData from "./siteData";
import SearchableDropdown from 'react-native-searchable-dropdown';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from "react-native-maps";


let items = [];

class River extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedRiver: [],
      sites: [],
      sitesLoaded: false,
      siteLoaded: false,
      siteSelected: false,
      gotCFS: false,
      siteCFS: "Temp cfs Text",
      siteRivHeight: "Temp siteRivHeight Text",
      siteLat: 33.5186,
      siteLong: 86.8104,
      siteName: "",
      siteDesc: "",
      siteTemp: 0,
      mapStyle: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.icon",
          "stylers": [
            {
              "color": "#758799"
            },
            {
              "saturation": 100
            },
            {
              "visibility": "on"
            },
            {
              "weight": 8
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]


    };
    this.getRivData = this.getRivData.bind(this);
    this.getRivWeather = this.getRivWeather.bind(this);
  }



  static navigationOptions = ({ navigation }) => {
    //return header with Custom View which will replace the original header 
    return {
      header: (
        <View
          style={{
            height: 120,
            backgroundColor: '#43669e',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              paddingTop: 30,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {navigation.state.params.riverName}
          </Text>
        </View>
      ),
    };
  };

  componentDidMount() {
    fetch(`https://sleepy-earth-25064.herokuapp.com/api/sites/${this.props.navigation.getParam("riverName")}`)
      .then(res => res.json())
      .then(sitesData => {
        console.log(sitesData)
        this.setState({
          ...this.state,
          sites: sitesData,
          sitesLoaded: true
        })
      })
  }

  getRivWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.siteLat}&lon=${this.state.siteLong}&APPID=a7e04a65a9a6e5f58c2a7d08f4e7ebc1`)
      .then(res => res.json())
      .then(degreesdata => {
        console.log(degreesdata)
        this.setState({
          siteName: degreesdata.name,
          siteDesc: degreesdata.weather[0].description,
          siteTemp: Math.round(((parseFloat(degreesdata.main.temp) - 273.15) * 1.8) + 32)
        })
      })
  }

  getRivData(siteNum) {
    this.setState({
      ...this.state,
      siteLoaded: false,
      siteSelected: true
    }
    )
    fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteNum}&parameterCd=00060,00065&siteStatus=all`)
      .then(res => res.json())
      .then(siteData => {
        console.log(siteData)
        console.log(siteData.value.timeSeries[0].values[0].value[0].value)
        // console.log(siteData.value.timeSeries[1].values[0].value[0].value)
        console.log(`${siteData.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude}`)
        console.log(`${siteData.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude}`)

        if (siteData.value.timeSeries[1]) {
          this.setState({
            ...this.state,
            siteCFS: siteData.value.timeSeries[0].values[0].value[0].value,
            siteRivHeight: siteData.value.timeSeries[1].values[0].value[0].value,
            siteLat: siteData.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude,
            siteLong: siteData.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude,
            siteLoaded: true,
            gotCFS: true
          })
          this.getRivWeather();
        } else {
          this.setState({
            ...this.state,
            siteCFS: "CFS data unavailable",
            siteRivHeight: siteData.value.timeSeries[0].values[0].value[0].value,
            siteLat: siteData.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude,
            siteLong: siteData.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude,
            siteLoaded: true,
            gotCFS: false
          })
          this.getRivWeather();
        }
      })
  }
  



  render() {
    if (this.state.sitesLoaded) {
      if (this.state.siteLoaded && this.state.gotCFS) {
        items = [];
        this.state.sites.forEach((site) => {
          items.push({
            id: site._id,
            name: site.siteName,
            siteNumber: site.siteNumber
          })
        })
        return (
          <Fragment>
            <View >
              <SearchableDropdown
                onItemSelect={(site) => {
                  this.getRivData(site.siteNumber)
                }}
                containerStyle={{ padding: 5 }}
                onRemoveItem={(river, index) => {
                  const rivers = this.state.selectedRivers.filter((sriver) => sriver.id !== river.id);
                  this.setState({ selectedRivers: rivers });
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={items}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Select a Site...",
                    underlineColorAndroid: "transparent",
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
              <Text style={{ textAlignVertical: 'bottom', fontSize: 20 }}>River Flow Rate: {this.state.siteCFS} ft</Text>
              <Text style={{ lineHeight: 22, fontSize: 12, textAlignVertical: "top" }} >3</Text>
              <Text style={{ textAlignVertical: 'bottom', fontSize: 20 }}>/s</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>River Height: {this.state.siteRivHeight} ft</Text>
            </View>
            <View>
              <Text>{this.state.siteName}</Text>
              <Text>{this.state.siteDesc}</Text>
              <Text>{this.state.siteTemp}</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: 250, height: 250 }}
                region={{
                  latitude: this.state.siteLat,
                  longitude: this.state.siteLong,
                  latitudeDelta: .02,
                  longitudeDelta: .02,
                }}
                customMapStyle={this.state.mapStyle}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.siteLat,
                    longitude: this.state.siteLong,
                  }}
                ></Marker>
              </MapView>
            </View>
          </Fragment >
        )
      } else if (this.state.siteLoaded) {
        items = [];
        this.state.sites.forEach((site) => {
          items.push({
            id: site._id,
            name: site.siteName,
            siteNumber: site.siteNumber
          })
        })
        return (
          <Fragment>
            <View >
              <SearchableDropdown
                onItemSelect={(site) => {
                  this.getRivData(site.siteNumber)
                }}

                containerStyle={{ padding: 5 }}
                onRemoveItem={(river, index) => {
                  const rivers = this.state.selectedRivers.filter((sriver) => sriver.id !== river.id);
                  this.setState({ selectedRivers: rivers });
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={items}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Select a Site...",
                    underlineColorAndroid: "transparent",
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
              <Text style={{ textAlignVertical: 'bottom', fontSize: 20 }}>{this.state.siteCFS}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{this.state.siteRivHeight} ft</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: 250, height: 250 }}
                region={{
                  latitude: this.state.siteLat,
                  longitude: this.state.siteLong,
                  latitudeDelta: .02,
                  longitudeDelta: .02,
                }}
                customMapStyle={this.state.mapStyle}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.siteLat,
                    longitude: this.state.siteLong,
                  }}
                ></Marker>
              </MapView>
            </View>
          </Fragment>
        )
      } else if (this.state.siteSelected) {
        items = [];
        this.state.sites.forEach((site) => {
          items.push({
            id: site._id,
            name: site.siteName,
            siteNumber: site.siteNumber
          })
        })
        return (
          <Fragment>
            <View >
              <SearchableDropdown
                onItemSelect={(site) => {
                  this.getRivData(site.siteNumber)
                }}

                containerStyle={{ padding: 5 }}
                onRemoveItem={(river, index) => {
                  const rivers = this.state.selectedRivers.filter((sriver) => sriver.id !== river.id);
                  this.setState({ selectedRivers: rivers });
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={items}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Select a Site...",
                    underlineColorAndroid: "transparent",
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
              <Text>Loading River Data</Text>
            </View>
          </Fragment>
        )
      } else {
        items = [];
        this.state.sites.forEach((site) => {
          items.push({
            id: site._id,
            name: site.siteName,
            siteNumber: site.siteNumber
          })
        })
        return (
          <Fragment>
            <View >
              <SearchableDropdown
                onItemSelect={(site) => {
                  this.getRivData(site.siteNumber)
                }}

                containerStyle={{ padding: 5 }}
                onRemoveItem={(river, index) => {
                  const rivers = this.state.selectedRivers.filter((sriver) => sriver.id !== river.id);
                  this.setState({ selectedRivers: rivers });
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={items}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Select a Site...",
                    underlineColorAndroid: "transparent",
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
              <Text>Select a site</Text>
            </View>
          </Fragment>
        )
      }
    } else {
      return (
        <Fragment>
          <View>
            <Text>Sites Loading</Text>
          </View>
          <ScrollView>
            {this.state.sites.map(site => (
              <TouchableOpacity>
                <View>
                  <Text>{site.siteName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Fragment>

      )
    }
  }


}

export default River;