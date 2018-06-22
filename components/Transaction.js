import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

class Transaction extends Component {
    render() {
        const { transaction } = this.props;
        //console.log(transaction);
        return(
            <View style={styles.container}>
                <Text>{transaction.amount}</Text>
                <Text>{transaction.tradingPair}</Text>
                <Text>Current USD: ${transaction.currentUSDPrice.toFixed(2)}</Text>
                <Text>Bought USD: ${transaction.usdPriceTransacted.toFixed(2)}</Text>
                <Text>Gains: ${((transaction.currentUSDPrice) - (transaction.usdPriceTransacted)).toFixed(2)}</Text>
                <Text>Percentage: {((Math.abs(1-(transaction.currentUSDPrice/transaction.usdPriceTransacted))*100).toFixed(2))}% </Text>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin: 10
    },
  });


export default Transaction;