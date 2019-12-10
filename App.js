import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import ItemList from './ItemList';
import moment from 'moment';

const dataFake = [
  {
    image: 'http://pm1.narvii.com/6427/04f373c19e32073ba7e8af5fbbce202b7541defa_00.jpg',
    id: 1,
    choose: true,
  },
  {
    image: 'https://image.winudf.com/v2/image/Y29tLmFuZHJvbW8uZGV2NjYwNjE0LmFwcDczNTM1MF9zY3JlZW5fMV8xNTE3NDQ3OTUzXzA1NA/screen-1.jpg?fakeurl=1&type=.jpg',
    id: 2,
    choose: false,
  },
  {
    image: 'https://i.ebayimg.com/images/g/wnkAAOSwsYpaPzzq/s-l400.jpg',
    id: 3,
    choose: false,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: dataFake.reverse(),
    };
    this.countAdd = 0
  }

  onSlideComplete = index => {
    let data = [...this.state.dataList];

    for (let i = 0; i <= data.length; i++) {
      if (!data[i]) continue;

      let itemNext = {};

      if (data[i].id == index) {
        data.splice(i, 1);
        itemNext = {...data[i - 1]};
        itemNext.choose = true;
        data.splice(i - 1, 1);
        data.push(itemNext);

        //add new item
        if(this.countAdd <= 5){
          let element = {};
          element = {
            id: data.length + 1 + moment().valueOf(),
            image: 'https://i.ytimg.com/vi/XLdigyRgREw/hqdefault.jpg',
          };
          data.unshift(element);
          this.countAdd +=1
        }
      }
    }
    this.setState({dataList: [...data]});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {this.state.dataList.map(this.renderItem)}
        </View>
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
