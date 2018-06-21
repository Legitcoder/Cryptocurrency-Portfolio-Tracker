import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import ListScreen from '../components/ListScreen';
import ListItem from '../common/ListItem';
import { Feather } from '@expo/vector-icons';

//TradingPairListScreen and ExchangeListScreen appear identical.
//Come back later and modularize them into a reusable component

class TradingPairListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Change Trading Pair',
            headerLeft: <Feather name="arrow-left" size={25} color='#fff' onPress={() => navigation.goBack()} />,
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0,
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }

    render() {
        const { tradingPairs, onPressTradingPairs } = this.props.navigation.state.params;
        const { navigation } = this.props;
        return(
            <View style={styles.container}>
                <ListScreen
                    navigation={navigation}
                    data={tradingPairs}
                    onPress={onPressTradingPairs}/>}
                />
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202428',
    },
    titleStyle: {
        color: '#fff',
        fontWeight: 'bold'
    }
  });


export default TradingPairListScreen; 