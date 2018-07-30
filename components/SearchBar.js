import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TextInput, StyleSheet, FlatList, Platform, Keyboard, TouchableOpacity } from 'react-native';
import regexSort from 'regex-sort';
import { matchSearchArray, getCoins } from '../actions';
import CoinList from './CoinList';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {coins: null}
    }

    componentDidMount(){
        const { getCoins } = this.props; 
        getCoins();
    }

    componentWillReceiveProps(nextProps) {
        const {coins} = nextProps;
        if(coins && this.state.coins === null) this.setState({coins: coins});
    }

    findMatches(wordToMatch, coins) {
        if(wordToMatch === '' || coins === null) return [];
        const regex = new RegExp(`(${wordToMatch})+`, 'gi');
        const filteredCoins = coins.filter(coin => {
            return coin.CoinName.match(regex) || coin.Symbol.match(regex);
        });
        return regexSort(filteredCoins, new RegExp(`^(${wordToMatch})`, 'gi'));
    }

    renderCoins = (text) => {
        const { matchSearchArray } = this.props;
        const searchArray = this.findMatches(text, this.state.coins);
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
                </View>
  
        );
    }
}

const mapStateToProps = (state) => {
    return {
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
        backgroundColor: "#3e4850",
        alignSelf: 'center',
        width: `60%`,
        height:`60%`,
        borderRadius: 100,
        padding: 10, 
    },
    container: {
        width: `100%`,
        height: `10%`,
        justifyContent: 'center',
        backgroundColor: '#282E33',
        zIndex: 5,
    },
})

export default connect(mapStateToProps, { matchSearchArray, getCoins } )(SearchBar);