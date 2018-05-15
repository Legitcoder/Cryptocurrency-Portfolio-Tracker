import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { coins } from '../App';
import { matchSearchArray } from '../actions';

import CoinList from './CoinList';




class SearchBar extends Component {

    findMatches(wordToMatch, coins) {
        if(wordToMatch === '') return [];
        return coins.filter(coin => {
            const regex = new RegExp(`(${wordToMatch})+`, 'gi');
            return coin.coinName.match(regex) || coin.symbol.match(regex);
        })
    }

    renderCoins = (text) => {
        const { matchSearchArray } = this.props;
        const searchArray = this.findMatches(text, coins);
        matchSearchArray(searchArray)
    }
    render() {
        return(
                <View style={styles.searchContainer}>
                    <TextInput onChangeText={this.renderCoins} style={styles.textInputStyles} placeholder="Search Coin" />
                </View>
  
        );
    }
}

const mapStateToProps = (state) => {
    return {searchArray: state.search.searchArray}
}

const styles =  StyleSheet.create({
    textInputStyles: {
        backgroundColor: "#fff",
        alignSelf: 'center',
        width: `${60}%`,
        height: `${50}%`,
        borderRadius: 10,
        padding: 10
    },
    searchContainer: {
        width: `${100}%`,
        height: `${10}%`,
        justifyContent: 'center',
        backgroundColor: '#778899',
    },
})

export default connect(mapStateToProps, { matchSearchArray } )(SearchBar);