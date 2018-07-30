import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import ListScreen from '../common/ListScreen'
import ListItem from '../common/ListItem';
import { Feather } from '@expo/vector-icons';

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
        return(
            <View style={styles.container}>
                <ListScreen
                    navigation={navigation}
                    data={exchanges}
                    onPress={onPressExchanges}/>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202428',
    },
  });


export default ExchangeListScreen;