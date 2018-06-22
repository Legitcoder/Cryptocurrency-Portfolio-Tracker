import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StockChart from './StockChart';

class CoinInfo extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StockChart/>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#282E33',
      justifyContent: 'center'
    },
  });


export default CoinInfo;