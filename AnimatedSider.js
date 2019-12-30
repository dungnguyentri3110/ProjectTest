import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, PanResponder, Dimensions, Easing } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class AnimatedSlider extends Component {
  static defaultProps = {
    style: {
      thumb: {
        width: 30,
        height: 15,
        position: 'absolute',
        borderRadius: 10,
        alignSelf: 'flex-end'
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.widthParent = 0;
    this.sliderMove = new Animated.ValueXY({ x: 0, y: 0 });
    this.caculWidth = 0;
    this.minPercent = 0;
    this.widthChild = 0;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (event, gestureState) => {
        //callback onSliding Start
        this.props.onStartSliding();
        this.caculWidth = this.sliderMove.x._value;
        // console.log(`grand`, this.caculWidth);
      },
      onPanResponderMove: (event, gestureState) => {
        if (this.caculWidth <= 0) {
          let leftLength = this.caculWidth + gestureState.dx;
          let ratio = -leftLength / this.widthParent;
          const dx = Math.max(0, Math.min(1, ratio));
          this.sliderMove.setValue({ x: -(-this.widthParent * (1 - dx) + this.widthParent), y: 0 });

          const widthMove = -this.widthParent * (1 - dx) + this.widthParent;
          this.onValueChange(widthMove);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx !== 0) {
          this.widthChild += gestureState.dx;
          if (this.widthChild >= this.widthParent) {
            this.widthChild = this.widthParent;
          } else if (this.widthChild <= 0) {
            this.widthChild = 0;
          }
          this.onSlidingComplete();
        } else {
          this.widthChild = this.widthParent + this.caculWidth;
          this.onSlidingComplete();
        }
        this.sliderMove.flattenOffset();
      }
    });
  }

  onValueChange = widthMove => {
    const percent = Math.round(((this.widthParent - widthMove) / this.widthParent) * 100);
    this.props.onValueChange(percent / 100);
  };

  onSlidingComplete = () => {
    const percent = Math.round((this.widthChild / this.widthParent) * 100);
    this.props.onSlidingComplete(percent / 100 + 0.01);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      if (nextProps.value == 0) {
        this.widthChild = 0;
        Animated.timing(this.sliderMove, {
          toValue: { x: -this.widthParent, y: 0 },
          duration: 200
        }).start();
      } else {
        Animated.timing(this.sliderMove, {
          toValue: { x: -((1 - nextProps.value) * this.widthParent), y: 0 },
          duration: 200,
          easing: Easing.linear
        }).start();
      }
    }
    return nextProps !== this.props;
  }

  onLayout = event => {
    const { thumbStyle } = this.props;
    let ratio = thumbStyle && thumbStyle.width ? thumbStyle.width : 30;
    this.widthParent = event.nativeEvent.layout.width - ratio;
    this.sliderMove.setValue({ x: -(event.nativeEvent.layout.width - ratio), y: 0 });
  };

  renderItem = () => {
    if (this.props.renderItem) {
      return this.props.renderItem();
    }
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={{...styles.viewBehind, ...this.props.viewTrack}} onLayout={this.onLayout}>
          <Animated.View
            style={[styles.viewSlider, { ...this.props.sliderStyle, transform: [{ translateX: this.sliderMove.x }] }]}
          />
        </View>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.thumb, { ...this.props.thumbStyle, transform: [{ translateX: this.sliderMove.x }] }]}
          onLayout={this.onLayout1}>
          {this.renderItem()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: width - 100,
    justifyContent: 'center'
    // backgroundColor: 'yellow'
  },
  viewBehind: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 1.5
  },
  viewSlider: {
    width: '100%',
    height: 5,
    backgroundColor: 'skyblue',
    position: 'absolute'
  },
  thumb: {
    width: 30,
    height: 15,
    // backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
