import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Keyboard } from 'react-native';
import SearchBar from '../components/SearchBar';
import CoinList from '../components/CoinList'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { selectCoin, getExchangesCoinBelongsTo } from '../actions';


class SearchCoinsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {scrollHeight: -50}
    }

    handleSelectedCoin = (coin) => {
        const {getExchangesCoinBelongsTo,selectCoin, navigation} = this.props;
        navigation.navigate('transaction', {coin: coin}); 
        selectCoin(coin);
        getExchangesCoinBelongsTo(coin.Symbol);
    }

    render() {
        const { searchArray } = this.props;
        if(!searchArray) return <ActivityIndicator />;
        return(
            <View style={styles.container}>
                <SearchBar />
                <KeyboardAwareScrollView style={{flex: 1}} 
                    onKeyboardWillShow={ (e) => this.setState({scrollHeight: -50})} 
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
        alignItems: 'stretch'
    },
  });


export default connect(mapStateToProps, { selectCoin, getExchangesCoinBelongsTo })(SearchCoinsScreen);