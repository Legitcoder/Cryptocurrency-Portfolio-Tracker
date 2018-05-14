import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { coins } from '../App';

import CoinList from './CoinList';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', matchArray: null};
    }

    findMatches(wordToMatch, coins) {
        return coins.filter(coin => {
            const regex = new RegExp(wordToMatch, 'gi');
            return coin.coinName.match(regex) || coin.symbol.match(regex);
        })
    }

    renderCoins = (text) => {
        this.setState({text: text});
        const matchArray = this.findMatches(this.state.text, coins);
        this.setState({matchArray: matchArray});
    }
    render() {
        if(this.state.text = '') this.setState({matchArray: null})
        return(
            <View style={styles.container}>
                <TextInput onChangeText={this.renderCoins} style={styles.textInputStyles} placeholder="Search Coin" />
                <CoinList coins={this.state.matchArray} />
            </View>
        );
    }
}

const styles =  StyleSheet.create({
    textInputStyles: {
        backgroundColor: "#fff",
        alignSelf: 'center',
        width: `${70}%`,
        height: `${5}%`,
    },
    container: {
        flex: 1,
        backgroundColor: 'gray',
        width: `${100}%`,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 10,
    }
})

export default SearchBar;