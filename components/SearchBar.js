import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TextInput, StyleSheet, FlatList, Platform, Keyboard, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { matchSearchArray, getCoins } from '../actions';
import CoinList from './CoinList';




class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {coins: null}
    }

    componentWillMount(){
        this.props.getCoins();
        const {coins} = this.props;
        if(coins && this.state.coins === null) this.setState({coins: coins});
    }

    componentWillUpdate() {
        const {coins} = this.props;
        if(coins && this.state.coins === null) this.setState({coins: coins});
    }

    findMatches(wordToMatch, coins) {
        if(wordToMatch === '' || coins === null) return [];
        return coins.filter(coin => {
            const regex = new RegExp(`(${wordToMatch})+`, 'gi');
            return coin.CoinName.match(regex) || coin.Symbol.match(regex);
        })
    }

    renderCoins = (text) => {
        const { matchSearchArray } = this.props;
        const searchArray = this.findMatches(text, this.state.coins);
        console.log(searchArray)
        matchSearchArray(searchArray)
    }
    render() {
        return(
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <FontAwesome style={styles.searchIconStyles} name="search" size={15} />
                        <TextInput style={styles.textInputStyles} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#fff" autoCorrect={false} onChangeText={this.renderCoins} placeholder="Search Coin">
                        </TextInput> 
                    </View>    
                    {/* <TouchableOpacity>
                        <Text>Cancel</Text>
                    </TouchableOpacity>     */}
                </View>
  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchArray: state.search.searchArray,
        coins: state.coins.coins
    }
}

const styles =  StyleSheet.create({
    searchIconStyles: {
       color: '#fff', 
       alignSelf: 'center',
       marginRight: 5
    },

    textInputStyles: {
        flex: 1,
        color: "#fff"
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: "#525659",
        alignSelf: 'center',
        width: `${60}%`,
        height:`${60}%`,
        borderRadius: 100,
        padding: 10, 
    },
    container: {
        width: `${100}%`,
        height: `${10}%`,
        justifyContent: 'center',
        backgroundColor: '#35383a',
        marginBottom: -25,
        zIndex: 5,
    },
})

export default connect(mapStateToProps, { matchSearchArray, getCoins } )(SearchBar);