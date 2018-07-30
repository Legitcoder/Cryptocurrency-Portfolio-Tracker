import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createTopTabNavigator } from 'react-navigation';
import CardStackStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import PorfolioScreen from './screens/PortfolioScreen';
import SettingsScreen from './screens/SettingsScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import TransactionScreen from './screens/TranscationScreen';
import ExchangeListScreen from './screens/ExchangeListScreen';
import TradingPairListScreen from './screens/TradingPairListScreen';
import ManageCoinScreen from './screens/ManageCoinScreen';
import SearchCoinsScreen from './screens/SearchCoinsScreen';

export const MainNavigator = createBottomTabNavigator({
    portfolio: {
      screen: createStackNavigator( {
        portfolio: { screen: PorfolioScreen },
        searchcoins: { screen: SearchCoinsScreen },
        managecoin: { screen: ManageCoinScreen },
        transaction: {screen: TransactionScreen},
        exchanges: {screen: ExchangeListScreen},
        tradingPairs: {screen: TradingPairListScreen}
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
    // watchlist: {
    //   screen: createStackNavigator({
    //     watchlist: { screen: WatchlistScreen},
    //     searchcoins: { screen: SearchCoinsScreen }
    //   }), 
    // }
    // settings: { screen: SettingsScreen },
    
  },
    {
      // navigationOptions: ({ navigation }) => ({
      //   tabBarIcon: ({tintColor }) => {
      //     const { routeName } = navigation.state;
      //     let iconName;
      //     let size = 25;
      //     if (routeName === 'portfolio') {
      //       return <Entypo name='wallet' size={size} color={tintColor} />;
      //     } else if (routeName === 'settings') {
      //       return <MaterialIcons name='settings' size={size} color={tintColor} />;
      //     }
      //       else if (routeName === 'watchlist') {
      //       return <FontAwesome name='binoculars' size={size} color={tintColor} />;
      //     }
      //   },
      // }),
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: false,
        activeTintColor: '#fff',
        style: {
          backgroundColor: '#282e33'
        }
      }
    }
)
