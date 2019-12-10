import React, {Component} from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Easing,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.animatedImage = new Animated.Value(1);
    this.rotageLeft = new Animated.Value(0);
    this.animatedValue = new Animated.ValueXY({x: 0, y: 0});

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        const {dx} = gestureState;
        return dx !== 0;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        const {dx} = gestureState;
        return dx !== 0;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const {dx} = gestureState;
        return dx !== 0;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const {dx} = gestureState;
        return dx !== 0;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animatedValue.setOffset({x: 0, y: this.animatedValue.y._value});
        this.animatedValue.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animatedValue.setValue({x: gestureState.dx, y: gestureState.dy});
        if (gestureState.dx <= 50 || gestureState.dx >= -50) {
          this.rotageLeft.setValue(gestureState.dx);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx <= -50) {
          Animated.timing(this.animatedValue.x, {
            toValue: -width,
            duration: 300,
            easing: Easing.linear,
          }).start(() => {
            this.props.onSlideComplete(this.props.item.id);
          });
        } else if (gestureState.dx >= 50) {
          Animated.timing(this.animatedValue.x, {
            toValue: width,
            duration: 300,
          }).start(() => {
            this.props.onSlideComplete(this.props.item.id);
          });
        } else {
          Animated.parallel([
            Animated.timing(this.animatedValue.x, {
              toValue: 0,
              duration: 200,
            }),
            Animated.timing(this.rotageLeft, {
              toValue: 0,
              duration: 200,
            }),
          ]).start();
        }
        this.animatedValue.flattenOffset();
      },
    });

    this.valueScale = 1; //check scale item o stack sau
    if (
      this.props.index == this.props.dataLength - 1 ||
      (this.props.index == 0 && this.props.dataLength == 1)
    ) {
      this.valueScale = 1;
    } else if (this.props.index == 0) {
      let index = (this.props.dataLength - 1) / 10;
      this.valueScale = 1 - index;
    } else {
      this.valueScale = 1 - this.props.index / 10;
    }

    this.toggle = false;
    this.animateRotage = new Animated.Value(0);
    this.animatedScale = new Animated.Value(1);
    this.scaleParent = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.spring(this.scaleParent, {
      toValue: this.valueScale,
      friction: 7,
    }).start();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.item.choose == true) {
      if(nextProps.index == nextProps.dataLength) this.valueScale = 1
      Animated.spring(this.scaleParent, {
        toValue: 1,
        friction: 8,
      }).start();
    } else {
      if(nextProps.index == 0){
        let index = (nextProps.dataLength-1)/10
        this.valueScale = 1-index
      }else {
        this.valueScale = 1 - (nextProps.index/10)
      }
      Animated.spring(this.scaleParent, {
        toValue: this.valueScale,
        friction: 8,
      }).start();
    }
    return true;
  }

  onPressToggle = () => {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.onSpringOut();
    } else {
      this.onSpringIn();
    }
  };

  onSpringOut = () => {
    Animated.spring(this.animatedScale, {
      toValue: 1.2,
      friction: 8,
    }).start();
    setTimeout(() => {
      Animated.timing(this.animateRotage, {
        toValue: 1,
        duration: 500,
      }).start(() => {
        Animated.spring(this.animatedScale, {
          toValue: 1,
          friction: 8,
        }).start();
      });
    }, 200);
  };

  onSpringIn = () => {
    Animated.spring(this.animatedScale, {
      toValue: 1.2,
      friction: 8,
    }).start();
    setTimeout(() => {
      Animated.timing(this.animateRotage, {
        toValue: 0,
        duration: 500,
      }).start(() => {
        Animated.spring(this.animatedScale, {
          toValue: 1,
          friction: 8,
        }).start();
      });
    }, 200);
  };

  render() {
    const {item, index, dataLength} = this.props;

    const rotageY1 = this.animateRotage.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const rotageY2 = this.animateRotage.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    });

    const rolLeft = this.rotageLeft.interpolate({
      inputRange: [0, 60],
      outputRange: ['0deg', '20deg'],
    });

    const translateY = index * 13;

    const imageBackground =
      'https://sohanews.sohacdn.com/2018/11/16/photo-5-15423775910181643963083.jpg';
 
    const isPan = item.choose && dataLength > 1;
    return (
      <Animated.View
        {...(isPan ? {...this.panResponder.panHandlers} : null)}
        style={[
          styles.parent,
          {
            transform: [
              {translateX: this.animatedValue.x},
              {translateY},
              {scale: this.scaleParent},
              {rotate: rolLeft},
            ],
            // zIndex: -index,
          },
        ]}>
        <TouchableOpacity
          onPress={this.onPressToggle}
          activeOpacity={1}
          disabled={item.choose ? false : true}>
          <View>
            <Animated.View
              style={[
                styles.content,
                {
                  transform: [{scale: this.animatedScale}, {rotateY: rotageY2}],
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              ]}>
              <Image
                source={{
                  uri: imageBackground,
                }}
                style={[styles.image, {position: 'absolute'}]}
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.content,
                {
                  transform: [{scale: this.animatedScale}, {rotateY: rotageY1}],
                },
                {zIndex: index * -1},
              ]}
              pointerEvents={'box-none'}>
              <Image source={{uri: item.image}} style={[styles.image]} />
              {/* <View style={[styles.image, {backgroundColor: item.image}]} /> */}
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    flex: 1,
  },
  image: {
    width: 200,
    height: 220,
    borderRadius: 20,
  },
  parent: {
    position: 'absolute',
  },
});
