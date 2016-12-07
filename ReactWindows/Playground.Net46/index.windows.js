/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

class Playground extends Component {
  constructor(props) {
    super(props)
    DeviceInfo.getConnectedDevices((devices) => {console.info(devices)});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.windows.js
        </Text>
        <Text style={styles.instructions}>
          Press Ctrl+R to reload
        </Text>
        <Text style={styles.instructions}>
          Press Ctrl+D or Ctrl+M for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    width: 500
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    width: 500
  },
});

AppRegistry.registerComponent('Playground.Net46', () => Playground);
