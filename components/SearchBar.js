import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { coins } from '../App';
import { matchSearchArray } from '../actions';

import CoinList from './CoinList';


//Bug: User deletes input and the populated list doesn't disappear. List should dissapear once user completely erases input field

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    findMatches(wordToMatch, coins) {
        return coins.filter(coin => {
            const regex = new RegExp(wordToMatch, 'gi');
            return coin.coinName.match(regex) || coin.symbol.match(regex);
        })
    }

    renderCoins = (text) => {
        this.setState({text: text});
        const searchArray = this.findMatches(this.state.text, coins);
        this.props.matchSearchArray(searchArray)
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