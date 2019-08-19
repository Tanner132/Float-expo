import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Button
} from "react-native"
import SearchableDropdown from 'react-native-searchable-dropdown';
import Carousel from './Carousel';

var items = [
    {
      id: 1,
      name: 'Cahaba River',
    },
    {
      id: 2,
      name: 'Hatchet Creek',
    },
    {
      id: 3,
      name: 'Locust Fork',
    },
    {
      id: 4,
      name: 'Mulberry Fork',
    },
  ];
  

class Home extends Component {
    constructor() {
        super()
        this.state = {
            sites: [],
            selectedRiver: []
        }
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
                        FLOAT
              </Text>
                </View>
            ),
        };
    };

    render() {
        return (
            <Fragment>
                <View >
                <SearchableDropdown
            onItemSelect = {(river) => {
              console.log(this.state.selectedRiver)
                this.props.navigation.navigate("River", {riverName: river.name})
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
                placeholder: "Search..",
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
                <ScrollView >
                    <View style={{backgroundColor:'#2e404f'}}>
                    <TouchableOpacity>
                        <View>
                            <Carousel />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={() => this.props.navigation.navigate("Camera")} style = {styles.container}>
                                <Text style={styles.addPhotoButton}>
                                    +
                                </Text>
                            </TouchableOpacity>
                            <View >
                            <Text style={{
                                    alignSelf:'center',
                                    color:'#fff',
                            }}>
                                Make A Photo!
                            </Text>
                            </View>
                    </View>                           
                </ScrollView>

            </Fragment>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    view:{
        backgroundColor:'#2e404f'
    },
    container: {
        flex: 1,
        alignSelf: 'center',
        alignContent:'center',
        paddingTop:2,
    },
    addPhotoButton: {
        justifyContent:'center',
        paddingTop: 2,
        paddingLeft: 2,
        height:50,
        width:50,
        borderRadius:50/2,
        textAlign: 'center',
        backgroundColor: '#43669e',
        fontSize: 35,
    },
    text:{
        alignSelf: 'center'
    }
})