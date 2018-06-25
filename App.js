import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { MainNavigator } from './navigation';
console.ignoredYellowBox = ['Remote debugger'];
export const BASE_URL = 'https://www.cryptocompare.com';

//Temporary testing purposes
// AsyncStorage.removeItem('holdings');
// AsyncStorage.removeItem('transactions');

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>   
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202428',
  },
});

