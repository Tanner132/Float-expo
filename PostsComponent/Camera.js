import React, { Component } from 'react';
import { CameraRoll, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class cameraPage extends Component {
  constructor(){
    super();
    this.takePicture = this.takePicture.bind(this);
    this.requestStoragePermission = this.requestStoragePermission.bind(this);
    this.requestCameraPermission = this.requestCameraPermission.bind(this);
    this.state = {
      Image: ''
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'Please allow Float to access storage.',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can save photos');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    };
  };

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Float needs access to your camera.',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    };
  };

  componentDidMount(){
    this.requestStoragePermission()
    this.requestCameraPermission()
  }


    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
          header: (
            <View
              style={{
                height: 80,
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
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true, pauseAfterCapture: true };
      const data = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri);
      console.log(data.uri)
      this.setState.Image = data.uri
      setTimeout(() => this.props.navigation.navigate('Post', {uri: data.uri}), 1500);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2e404f',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 100/10,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
