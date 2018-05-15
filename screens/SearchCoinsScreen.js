import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import CoinList from '../components/CoinList'


class SearchCoinsScreen extends Component {
    render() {
        const { searchArray } = this.props;
        if(!searchArray) return <ActivityIndicator />;
        return(
            <View style={styles.container}>
                <SearchBar />
                <CoinList coins={searchArray} />
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
      marginTop: 30
    },
  });


export default connect(mapStateToProps)(SearchCoinsScreen);