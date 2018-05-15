import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { coins } from '../App';
import SearchCoinsScreen from './SearchCoinsScreen';


class PortfolioScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <SearchCoinsScreen />
            </View>    
        );
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: 30
    },
  });


export default connect(null)(PortfolioScreen);