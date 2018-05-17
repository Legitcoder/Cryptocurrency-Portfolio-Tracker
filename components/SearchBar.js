import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, FlatList, Platform, Keyboard } from 'react-native';
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
                    <TextInput underlineColorAndroid='rgba(0,0,0,0)' autoCorrect={false} onChangeText={this.renderCoins} style={styles.textInputStyles} placeholder="Search Coin" />
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
        height:`${60}%`,
        borderRadius: 100,
        padding: 10,
    },
    searchContainer: {
        width: `${100}%`,
        height: `${10}%`,
        justifyContent: 'center',
        backgroundColor: '#52575B',
        marginBottom: -20,
        zIndex: 5,
    },
})

export default connect(mapStateToProps, { matchSearchArray } )(SearchBar);