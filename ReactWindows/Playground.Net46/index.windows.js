/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

class Playground extends Component {
  constructor (props) {
    super(props)
    this.state = {
      devices: [],
      selectedDevice: null
    }
    DeviceInfo.getConnectedDevices((devices) => { this.setState({devices: devices}) })
    this.renderDevices = this.renderDevices.bind(this)
    this.renderDevice = this.renderDevice.bind(this)
    this.changeSelection = this.changeSelection.bind(this)
  }

  changeSelection (value) {
    this.setState({selectedDevice: value})
  }

  renderDevices () {
    if (this.state.devices && this.state.devices.length > 0) {
      return (
        <Picker onValueChange={this.changeSelection} selectedValue={this.state.selectedDevice}>
          {this.state.devices.map((device) => this.renderDevice(device))}
        </Picker>
      )
    } else {
      return (
        <Picker />
      )
    }
  }

  renderDevice (device) {
    if (device && device.Name && device.DeviceId) {
      return (
        <Picker.Item label={device.Name} value={device.DeviceId} key={device.DeviceId} />
      )
    }
  }

  render () {
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
        <View style={{flex: 1}}>
          {this.renderDevices()}
        </View>
      </View>
    )
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
