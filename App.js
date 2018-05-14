import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import query from './queries';
import { client } from './queries';
import cryptocurrencies from 'cryptocurrencies';
import _ from 'lodash';

// Invert key value pairs for search
var coins = _.invert(cryptocurrencies);
console.log(coins);


export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>   
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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
