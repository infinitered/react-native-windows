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
  Image,
  TouchableHighlight,
  PanResponder
} from 'react-native';
import WinGif from 'react-native-win-gif';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';

class Playground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      someNumber: 0
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 0;
    this._previousTop = 0;
    this._dragStyles = {style: {}}
  }

  componentDidMount() {
    this.timer = window.setInterval(this._fpsFlub, 1000)
    this._updateNativeStyles()
  }

  componentWillUnmount() {
    this.clearInterval(this.timer)
  }

  _fpsFlub = () => {
    const min = 30
    const max = 70
    let someNumber = Math.round(Math.random() * (max - min) + min)
    this.setState({someNumber})
  }

  _renderTopStats = () => {
    return (
      <View style={Styles.horizontal}>
        <View style={Styles.textSection}>
          <Text style={Styles.titleSection}>
            BlueJeans Design Sprint
          </Text>
            <Text>
              00:00
            </Text>
          <View style={Styles.horizontal}>
            <Text style={Styles.updateText}>
              0x0
            </Text>
            <Text style={Styles.updateText}>
              Hardware
            </Text>
            <Text style={Styles.updateText}>
              Render:{this.state.someNumber} fps.
            </Text>
            <Text style={Styles.updateText}>
              Stream:0 fps.
            </Text>
          </View>
        </View>
        <View style={Styles.controlsSection}>
          <View style={Styles.horizontal}>
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              style={Styles.attendeesButton}
            >
              <Image source={require('./Images/user-icon.png')} style={Styles.user} />
              <Text style={Styles.attendeesText}>6</Text>
            </Animatable.View>
            <TouchableHighlight onPress={() => null} underlayColor={Colors.highlight}>
              <Image source={require('./Images/chatbubble-outline.png')} style={Styles.chat} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => null} underlayColor={Colors.highlight}>
              <Image source={require('./Images/settings-128.png')} style={Styles.settings} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  _renderDragMenu = () => {
    // TODO: Clean this up, it's functional but kinda blah
    return (
      <View
        style={Styles.container}>
        <View
          ref={(dragBar) => {
            this.dragBar = dragBar;
          }}
          style={Styles.dragBar}
          {...this._panResponder.panHandlers}
        >
          <Text style={Styles.attendeesText} >Video Controls</Text>
        </View>
      </View>
    )
  }

  _handleStartShouldSetPanResponder (e, gestureState) {
    // Should we become active when the user presses down?
    return true;
  }

  _handleMoveShouldSetPanResponder (e, gestureState) {
    // Should we become active when the user moves a touch over?
    return true;
  }

  _handlePanResponderMove = (e, gestureState) => {
    this._dragStyles.style.left = this._previousLeft + gestureState.dx;
    this._dragStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  }

  _handlePanResponderEnd = (e, gestureState) => {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }

  _updateNativeStyles() {
    this.dragBar && this.dragBar.setNativeProps(this._dragStyles);
  }

  render() {
    return (
      <View style={Styles.mainContainer}>
        { this._renderTopStats() }
        <View style={Styles.horizontal}>
          <WinGif source={require('./Images/meow.gif')} style={Styles.videoBox} />
          <WinGif source={require('./Images/beg.gif')}  style={Styles.videoBox} />
          <WinGif source={require('./Images/kittyTyper.gif')}  style={Styles.videoBox} />
          <WinGif source={require('./Images/stairs.gif')} style={Styles.videoBox}  />
          <WinGif source={{ uri: 'https://slack-imgs.com/?c=1&url=http%3A%2F%2Fstream1.gifsoup.com%2Fview2%2F1567149%2Fdun-dun-dun-o.gif'}} style={Styles.videoBox}  />
        </View>
        <View style={{width: 600, height: 400}}>
          <Video
            source={{uri: 'http://www.w3schools.com/HTML/mov_bbb.mp4'}}
            paused={false}
            repeat={true}
            volume={1.0}
            rate={1.0}
            style={{flex: 1, backgroundColor: "#00ff00", width: 600, height: 400}}
            />
        </View>
        { this._renderDragMenu() }
      </View>
    );
  }
}

Colors = {
  background: '#afc4df',
  clear: 'rgba(0,0,0,0)',
  agua: '#0000ff',
  transparent: 'rgba(0,0,0,0)',
  silver: '#f0f4f9',
  snow: 'white',
  coal: '#1f1f1f',
  charcoal: '#030303',
  highlight: '#FF0066'
}

const Metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth: 500,
  screenHeight: 500,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    normal: 60,
    large: 160,
    logo: 300
  }
}
const type = {
  base: 'HelveticaNeue',
  bold: 'HelveticaNeue-Bold',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
}

const Fonts = { style: {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}}


const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.transparent
  },
  horizontal: {
    flexDirection: "row"
  },
  textSection: {
    padding: Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin
  },
  controlsSection: {
    flex: 1,
    padding: Metrics.doubleBaseMargin,
    alignItems: 'flex-end',
  },
  updateText: {
    paddingHorizontal: Metrics.baseMargin,
    color: Colors.agua
  },
  attendeesButton: {
    backgroundColor: Colors.charcoal,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Metrics.buttonRadius,
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.baseMargin
  },
  attendeesText: {
    color: Colors.snow,
    textAlign: 'center',
    ...Fonts.style.h3,
    margin: Metrics.baseMargin,
    flex: 1
  },
  user: {
    width: Metrics.images.medium,
    height: Metrics.images.medium,
    marginVertical: Metrics.baseMargin,
    resizeMode: "contain"
  },
  chat: {
    width: Metrics.images.normal,
    height: Metrics.images.normal,
    padding: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin
  },
  settings: {
    width: Metrics.images.normal,
    height: Metrics.images.normal,
    marginHorizontal: Metrics.baseMargin
  },
  videoBox: {
    width: 300,
    height: 300,
    margin: Metrics.baseMargin,
    borderColor: "#ff0000",
    borderWidth: 1
  },
  dragBar: {
    width: 300,
    height: 80,
    borderRadius: Metrics.borderRadius,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: Colors.charcoal
  },
  container: {
    flex: 1,
    paddingTop: 64
  }

})

AppRegistry.registerComponent('Playground.Net46', () => Playground);
