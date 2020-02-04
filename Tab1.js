import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window')

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {parentScroll} = this.props
    return (
      <ScrollView>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>
          <View style={styles.content}/>

      </ScrollView>
    );
  }
}

const styles = {
    content:{
        width: width - 40, height: 80, borderRadius: 10, backgroundColor: 'skyblue', marginVertical: 10
    }
}
