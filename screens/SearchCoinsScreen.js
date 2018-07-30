import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Keyboard } from 'react-native';
import SearchBar from '../components/SearchBar';
import CoinList from '../components/CoinList'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { selectCoin, getExchangesCoinBelongsTo } from '../actions';
import { Feather } from '@expo/vector-icons';


class SearchCoinsScreen extends Component { 
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Search Cryptocurrencies',
            headerLeft: <Feather name="arrow-left" size={25} color='#fff' onPress={() => navigation.goBack()} />,
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    } 

    constructor(props) {
        super(props);
        this.state = {scrollHeight: -50, searchArray: []}
    }

    componentWillReceiveProps(nextProps) {
        const { searchArray } = nextProps;
        this.setState({ searchArray: searchArray })
    }

    handleSelectedCoin = (coin) => {
        const {getExchangesCoinBelongsTo, selectCoin, navigation} = this.props;
        navigation.navigate('transaction', {coin: coin}); 
        getExchangesCoinBelongsTo(coin.Symbol);
        selectCoin(coin);
    }

    render() {
        const { searchArray } = this.state;
        return(
            <View style={styles.container}>
                <SearchBar />
                <KeyboardAwareScrollView style={{flex: 1}} 
                    onKeyboardWillShow={ (e) => this.setState({scrollHeight: (e.startCoordinates.height - e.endCoordinates.height - 50)})} 
                    onKeyboardWillHide={ (e) => this.setState({scrollHeight: 0})} 
                    extraScrollHeight={this.state.scrollHeight}
                    enableOnAndroid={true}  
                    keyboardShouldPersistTaps='handled'>
                    <CoinList onPress={this.handleSelectedCoin} 
                        coins={searchArray} />
                </KeyboardAwareScrollView>    
            </View>    
        );
    }
}

const mapStateToProps = (state) => {
    return {searchArray: state.search.searchArray}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#202428',
    },
  });


export default connect(mapStateToProps, { selectCoin, getExchangesCoinBelongsTo })(SearchCoinsScreen);