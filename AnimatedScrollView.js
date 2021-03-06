import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Tab1 from './Tab1';
import Tab2 from './Tab2';

const { width, height } = Dimensions.get('window');

const HEIGHT_IMAGE = 180;

const AniScrollView = Animated.createAnimatedComponent(ScrollView)

export default class AnimatedScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'tab1', title: 'Tab1' },
        { key: 'tab2', title: 'Tab2' },
      ],
    };

    this.animatedScrollView = new Animated.Value(0)
    this.offset = 0
  }

  onIndexChange = (index) => {
    //Check khi chuyen tab thi cuon het ve dau trang
    this.setState({ index }, () => {
      if (this.offset > HEIGHT_IMAGE) {
        this.AniScrollView.getNode().scrollTo({ x: 0, y: HEIGHT_IMAGE + 1, animated: true })
      }
    })
  }

  renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'tab1': {
        return <Tab1 parentScroll={this.state.scrollEnable} />;
      }
      case 'tab2': {
        return <Tab2 />;
      }
    }
  };

  render() {
    const link =
      'https://exp.gg/vn/wp-content/uploads/2019/08/YoY0I7z-768x432.png';

    //Animated Tab
    let translateTab = this.animatedScrollView.interpolate({
      inputRange: [0, HEIGHT_IMAGE, HEIGHT_IMAGE + 1],
      outputRange: [0, 0, 1]
    })
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView scrollEnabled={this.state.scrollEnable} onContentSizeChange={this.onContentSizeChange} onLayout={this.onLayout}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.animatedScrollView } } }], {
            useNativeDriver: true,
            listener: (event) => {
              this.offset = event.nativeEvent.contentOffset.y
            }
          })}
          style={{ zIndex: 0 }}
          ref={refs => this.AniScrollView = refs}
        >
          <View style={{ flex: 1 }}>
            <Image source={{ uri: link }} style={styles.image} />
            <TabView
              onIndexChange={this.onIndexChange}
              renderScene={this.renderScene}
              navigationState={this.state}
              renderTabBar={props => (
                <Animated.View style={{ transform: [{ translateY: translateTab }], zIndex: 1 }}>
                  <TabBar
                    activeColor="black"
                    getLabelText={({ route }) => route.title}
                    inactiveColor="black"
                    {...props}
                    lazy={true}
                    upperCaseLabel={false}
                    pressColor="#FFFFFF"
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </Animated.View>
              )}
            />
            <Text> AnimatedScrollView </Text>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width,
    height: HEIGHT_IMAGE,
  },
  labelStyle: {
    width: 40,
    height: 50,
  },
  styleTabBar: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: width,
    shadowColor: '#FFFFFF',
    elevation: 0,
  },
});
