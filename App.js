import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import CardStackStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import cryptocurrencies from 'cryptocurrencies';
import cryptoCompareApi from 'cryptocompare';
import _ from 'lodash';
import PorfolioScreen from './screens/PortfolioScreen';
import SettingsScreen from './screens/SettingsScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import AddToPortfolioScreen from './screens/AddToPortfolioScreen';
console.ignoredYellowBox = ['Remote debugger'];
var cryptos = _.invert(cryptocurrencies);
export const BASE_URL = 'https://www.cryptocompare.com';
export const coins = Object.entries(cryptos).map(([coinName, symbol]) => ({coinName,symbol}));
coins.pop();


export default class App extends React.Component {

  render() {

    const MainNavigator = createBottomTabNavigator({
      portfolio: {
        screen: createStackNavigator( {
          portfolio: { screen: PorfolioScreen },
          addtoporfolio: { screen: AddToPortfolioScreen }
        },
        {
          //TransitionConfig Changes Stack Navigation from Right to Left in Android
          //to be consistent with IOS Transition
          transitionConfig: () => ({
            screenInterpolator: sceneProps => {
              const { layout, position, scene } = sceneProps;
              const { index } = scene;
  
              const translateX = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [layout.initWidth, 0, 0]
              });
  
              const opacity = position.interpolate({
                  inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                  outputRange: [0, 1, 1, 0.3, 0]
              });
  
              return { opacity, transform: [{ translateX }] }
            }
          }),
        }
      )
      },
      watchlist: { screen: WatchlistScreen},
      settings: { screen: SettingsScreen }
    },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            let size = 25;
            if (routeName === 'portfolio') {
              return <Entypo name='wallet' size={size} color={tintColor} />;
            } else if (routeName === 'settings') {
              return <MaterialIcons name='settings' size={size} color={tintColor} />;
            }
              else if (routeName === 'watchlist') {
              return <FontAwesome name='binoculars' size={size} color={tintColor} />;
            }
          },
        }),
        swipeEnabled: false,
        tabBarOptions: {
          showLabel: false
        }
      }
  )



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
    backgroundColor: '#282E33',
  },
});

