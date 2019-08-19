
import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./HomeComponents/Home"
import River from "./RiverComponents/River"
import cameraPage from "./PostsComponent/Camera"
import Post from './PostsComponent/Post'

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  River: {
    screen: River
  },
  Camera:{
    screen: cameraPage
  },
  Post:{
    screen: Post
  },
},
  {
    initialRouteName: "Home",
  }
);


const App = createAppContainer(MainNavigator);
  

export default App;


