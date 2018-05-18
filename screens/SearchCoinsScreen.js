import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Keyboard } from 'react-native';
import SearchBar from '../components/SearchBar';
import CoinList from '../components/CoinList'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


class SearchCoinsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {scrollHeight: 0}
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
                    keyboardShouldPersistTaps='handled'>
                    <CoinList onPress={(coin) => {console.log(this.props); this.props.navigation.navigate('transaction', {coin: coin}); }} coins={searchArray} />
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