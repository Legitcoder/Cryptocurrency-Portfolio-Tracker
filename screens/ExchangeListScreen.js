import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import ListScreen from '../components/ListScreen'
import ListItem from '../common/ListItem';
import { Feather } from '@expo/vector-icons';

//TradingPairListScreen and ExchangeListScreen appear identical.
//Come back later and modularize them into a reusable component

class ExchangeListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Change Exchange',
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
        const { exchanges, onPressExchanges } = this.props.navigation.state.params;
        const { navigation } = this.props;
        const filteredExchanges = exchanges.map( exchangeObject => exchangeObject.exchange);
        console.log(filteredExchanges);
        return(
            <View style={styles.container}>
                <ListScreen
                    navigation={navigation}
                    data={exchanges}
                    onPress={onPressExchanges}/>}
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


export default ExchangeListScreen;