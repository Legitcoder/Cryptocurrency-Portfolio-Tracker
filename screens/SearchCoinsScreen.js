import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Keyboard } from 'react-native';
import SearchBar from '../components/SearchBar';
import CoinList from '../components/CoinList'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


class SearchCoinsScreen extends Component {
    render() {
        const { searchArray } = this.props;
        if(!searchArray) return <ActivityIndicator />;
        return(
            <View style={styles.container}>
                <SearchBar />
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
                    <CoinList onPress={(coin) => {console.log(coin); this.props.navigation.navigate('portfolio'); }} coins={searchArray} />
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


export default connect(mapStateToProps)(SearchCoinsScreen);