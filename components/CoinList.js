import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import { BASE_URL } from '../App';
import Coin from './Coin';

//<ActivityIndicator style={{flex: 1}} size="large" color="#fff" />; 

class CoinList extends Component {
    renderList() {
        const { coins, onPress } = this.props;
        return(
            <FlatList keyboardShouldPersistTaps='handled'
                data={coins}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return <Coin 
                                onPress={() => onPress({...item, ImageUrl: `${BASE_URL}${item.ImageUrl}` })}
                                avatar={{ uri: `${BASE_URL}${item.ImageUrl}` }}
                                key={item.CoinName} 
                                title={item.CoinName} 
                                subtitle={item.Symbol} 
                            />
                }}
                        /> 
            );
    }

    render() {     
        return <View >{this.renderList()}</View>
    }
}


export default CoinList;