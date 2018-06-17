import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StockChart from './StockChart';

class CoinInfo extends Component {
    render() {
        const { holding } = this.props;
        return(
            <View style={styles.container}>
                <StockChart holding={holding}/>
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