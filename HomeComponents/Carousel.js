import React, { Component } from 'react';
import ImageCarousel from 'react-native-image-carousel';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
 
const urls = [
  'https://source.unsplash.com/random',
  'https://source.unsplash.com/random',
  'https://source.unsplash.com/random',
  'https://sourec.unsplash.com/random',
];

class Carousel extends Component {
   imageCarousel;

  componentWillMount() {
  StatusBar.setBarStyle('dark-content');
  }
  captureImageCarousel = (imageCarousel) => {
      this.imageCarousel = imageCarousel;
  }

  handleHeaderPress = () => (this.imageCarousel).close();

  _renderHeader() {
    return (
      <TouchableWithoutFeedback onPress={this.handleHeaderPress}>
        <View>
          <Text style={styles.closeText}>Exit</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
 
  _renderFooter() {
    return (
      <Text style={styles.footerText}>Footer!</Text>
    );
  }
 
  _renderContent(idx) {
    return (
      <Image
        style={styles.container}
        resizeMode= "contain"
        source={{ uri: urls[idx] }}
      />
    );
  }
 
  render() {
    return (
      <View style={styles.container}>
          <View>
        <ImageCarousel
          ref={this.captureImageCarousel} 
          renderContent={this.renderImage}
        >
          {urls.map(url  => (
            <Image
              key={url}
              style={styles.image}
              source={{ uri: url, width: 275 }}
              resizeMode="contain"
            />
          ))}
        </ImageCarousel>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom:3,
    },
    closeText: {
      color: 'white',
      textAlign: 'right',
      padding: 10,
    },
    footerText: {
      color: 'white',
      textAlign: 'center',
    },
    image: {
      marginRight: 2,
      height: 400,
    },
  });

export default Carousel;