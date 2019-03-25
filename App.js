import React, { Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { Root } from "native-base";
import { Font, AppLoading } from 'expo';
import MainStack from './src/MainStack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
    //StatusBar.setHidden(true);
  }
  async componentWillMount() {
    try {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      this.setState({ fontLoaded: false });
    }
  }
  render() {
    if (this.state.fontLoaded) {
      return (<MainStack />)
    } else {
      return (<Text>Loading...</Text>)
    }
  }
}

