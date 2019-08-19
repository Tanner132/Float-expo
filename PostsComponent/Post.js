import React, {Component} from 'react';
import {Image, StyleSheet, Button, Text, View, Alert} from 'react-native';
import * as Firebase from 'firebase';

export default class post extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgDescription: '',
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

    async componentDidMount() {
       console.log(this.props.Image)
    }

    // // onChooseImagePress = async() => {
     
    // // }

    // uploadImage = async(uri, imgName, imgDescription) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();

    //     var ref = firebase.storage().ref().child("images/" + imgName + imgDescription)
    //     return ref.put(blob);
    // }

    render(){
        return(
            <View>
                {/* <Image
                    // source = {{uri: this.props.Image}}
                /> */}
                <Button title="Choose image...." />
            </View>
        )
    }
}