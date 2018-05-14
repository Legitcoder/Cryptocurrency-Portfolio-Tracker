import React from 'react';
import { StyleSheet, Text, View, Platform, YellowBox } from 'react-native';
import { createBottomTabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import cryptocurrencies from 'cryptocurrencies';
import _ from 'lodash';

import Button from './common/Button';
import PorfolioScreen from './screens/PortfolioScreen';
import SettingsScreen from './screens/SettingsScreen';
import WatchlistScreen from './screens/WatchlistScreen';

console.ignoredYellowBox = ['Remote debugger'];
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
// Invert key value pairs for search
export const coins = _.invert(cryptocurrencies);






export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      portfolio: { screen: PorfolioScreen },
      watchlist: { screen: WatchlistScreen},
      settings: { screen: SettingsScreen }
    })



    return (
    <Provider store={store}>   
      <View style={styles.container}>
        <MainNavigator />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0
  },
});
