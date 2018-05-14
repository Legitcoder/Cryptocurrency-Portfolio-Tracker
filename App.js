import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import cryptocurrencies from 'cryptocurrencies';
import _ from 'lodash';

import Button from './common/Button';

// Invert key value pairs for search
var coins = _.invert(cryptocurrencies);
console.log(coins);


export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>   
      <View style={styles.container}>
      <Text>SOme Text Here</Text>
        <Button onPress={() => {console.log("Do something")}} text={'Add Transaction'} buttonColor={'#228B22'} />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0
  },
});
