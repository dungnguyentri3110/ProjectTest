import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import ItemList from './ItemList';
import moment from 'moment'

const dataFake = [
  {
    image:
      'http://images5.fanpop.com/image/photos/30100000/ssj4-Goku-goku-30185168-505-389.jpg',
    id: 1,
    choose: true
  },
  {
    image:
      'http://images5.fanpop.com/image/photos/30100000/ssj4-Goku-goku-30185168-505-389.jpg',
    id: 2,
    choose: false
  },
  {
    image:
      'http://images5.fanpop.com/image/photos/30100000/ssj4-Goku-goku-30185168-505-389.jpg',
    id: 3,
    choose: false
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: dataFake
    };
  }

  onSlideComplete = index => {
    let data = [...this.state.dataList];

    for (let i = 0; i <= data.length; i++) {
      if (!data[i]) continue;

      let itemNext = {...data[i + 1]};

      if (data[i].id == index) {
        itemNext.choose = true;
        data.splice(i, 1);

        data.splice(i, 1);
        let element = {};

        element = {
          id: data.length + 1 + moment().valueOf(),
          image:
            'https://genknews.genkcdn.vn/2019/4/14/avata-1555222480392572000500.jpg',
        };
        data.push(element);

        data.unshift(itemNext);
      }
    }

    this.setState({dataList: data});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>{this.state.dataList.map(this.renderItem)}</View>
      </View>
    );
  }

  renderItem = (item, index) => {
    return (
      <ItemList
        index={index}
        item={item}
        key={item.id}
        onSlideComplete={this.onSlideComplete}
        dataLength={this.state.dataList.length}
      />
    );
  };
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


