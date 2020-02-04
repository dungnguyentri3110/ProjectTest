import React, {Component} from 'react';
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
import {TabView, TabBar} from 'react-native-tab-view';
import Tab1 from './Tab1';
import Tab2 from './Tab2';

const {width, height} = Dimensions.get('window');

const HEIGHT_IMAGE = 180;

export default class AnimatedScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'tab1', title: 'Tab1'},
        {key: 'tab2', title: 'Tab2'},
      ],
    };
  }

  renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'tab1': {
        return <Tab1 />;
      }

      case 'tab2': {
        return <Tab2 />;
      }
    }
  };

  render() {
    const link =
      'https://exp.gg/vn/wp-content/uploads/2019/08/YoY0I7z-768x432.png';
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView scrollEnabled={true}>
          <View style={{flex: 1}}>
            <Image source={{uri: link}} style={styles.image} />
            <TabView
              onIndexChange={index => this.setState({index})}
              renderScene={this.renderScene}
              navigationState={this.state}
              renderTabBar={props => (
                <TabBar
                  activeColor="black"
                  getLabelText={({route}) => route.title}
                  labelStyle={styles.labelStyle}
                  inactiveColor="black"
                  {...props}
                  lazy={true}
                  style={styles.styleTabBar}
                  upperCaseLabel={false}
                  pressColor="#FFFFFF"
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  //   renderIndicator={this.renderIndicator}
                />
              )}
            />
            <Text> AnimatedScrollView </Text>
          </View>
        </ScrollView>
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
    height: 40,
    justifyContent: 'center',
    width: width,
    shadowColor: '#FFFFFF',
    elevation: 0,
  },
});
