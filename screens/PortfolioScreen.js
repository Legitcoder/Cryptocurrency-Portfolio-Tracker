import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import CoinList from '../components/CoinList'
import { coins } from '../App';


class PortfolioScreen extends Component {
    render() {
        const { searchArray } = this.props;
        if(!searchArray === null) return <ActivityIndicator />
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


export default connect(mapStateToProps)(PortfolioScreen);