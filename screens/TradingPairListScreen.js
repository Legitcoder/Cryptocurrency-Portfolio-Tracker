import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

//TradingPairListScreen and ExchangeListScreen appear identical.
//Come back later and modularize them into a reusable component

class TradingPairListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Change Trading Pair',
            headerLeft: <Feather name="arrow-left" size={30} color='#fff' onPress={() => navigation.goBack()} />,
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
                <FlatList
                    style={styles.listStyle}
                    keyExtractor={(item, index) => index.toString()}
                    data={tradingPairs}
                    renderItem={({item}) => <ListItem titleStyle={styles.titleStyle} title={item} 
                    onPress={ () => { onPressTradingPairs(item); navigation.goBack(); } }/>}
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