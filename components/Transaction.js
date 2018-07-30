import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { getExchangesCoinBelongsTo, selectCoin, deleteTransaction, getHoldings } from '../actions';

class Transaction extends Component {

    renderTransactionPercentage = () => {
        const { transaction } = this.props;
        const { activeOrderState } = transaction;
        const percentage  = ((Math.abs(1-(transaction.currentUSDPrice/transaction.usdPriceTransacted))*100).toFixed(2));
        if(percentage !== 0) {
            return(
                <Text style={[styles.transactionTextStyles, {alignSelf: 'center'}]}>Percentage:
                    {transaction.usdPriceTransacted < transaction.currentUSDPrice ? this.renderGreenDelta() : this.renderRedDelta()}
                    {percentage}% 
                 </Text> 
            );
        }
    }

    navigateToTransactionForm = () => {
        //Edit Transaction
        const { navigation, transaction, getExchangesCoinBelongsTo, selectCoin, deleteTransaction, getHoldings } = this.props;
        const { coin } = this.props.transaction;
        getExchangesCoinBelongsTo(coin.Symbol);
        selectCoin(coin);
        navigation.navigate('transaction', { coin: coin, transaction: transaction, deleteTransaction: deleteTransaction, refresh: () => getHoldings() });
    }

    renderGreenDelta = () => <Entypo style={{color: '#008000', alignSelf: 'center'}} name="triangle-up" size={25} />; 

    renderRedDelta = () => <Entypo style={{color: '#ff0000', alignSelf: 'center', }} name="triangle-down" size={25} /> ;

    render() {
        const { transaction, navigation } = this.props;
        const activeColor = transaction.activeOrderState === "Sell" ? "#ff0000" : "#008000";
        const action = transaction.activeOrderState === "Sell" ? "Sold" : "Bought";   
        return(
            <TouchableWithoutFeedback onPress={() => this.navigateToTransactionForm()}>
                <View style={styles.container}>
                    <View style={[styles.orderStatusTextContainer, {backgroundColor: activeColor}]}>
                        <Text style={styles.orderStatusTextStyles}>{transaction.activeOrderState.split('')[0]}</Text>
                    </View>
                <View style={styles.transactionContainer}>    
                    <View style={styles.innerTransactionContainer}>
                        <View style={styles.leftSide}>
                            <Text style={styles.transactionTextStyles}>Amount: {transaction.amount}</Text>
                            <Text style={styles.transactionTextStyles}>TradingPair: {transaction.tradingPair}</Text>
                        </View>
                    <View style={styles.rightSide}>    
                        <Text style={styles.transactionTextStyles}>{action}: ${transaction.usdPriceTransacted.toFixed(2)}</Text>
                        <Text style={styles.transactionTextStyles}>Profit/Loss: ${(((transaction.currentUSDPrice) - (transaction.usdPriceTransacted))*transaction.amount).toFixed(2)}</Text>
                    </View>
                    </View>
                    {this.renderTransactionPercentage()}
                </View>
                </View>
            </TouchableWithoutFeedback>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'flex-start'       
    },
    transactionContainer: {
        flex: 1,
        backgroundColor: '#2b3136',
        margin: 5,
        padding: 10,
    },
    innerTransactionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderStatusTextStyles: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    orderStatusTextContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginBottom: 5,
        height: 35,
        width: 40,
        justifyContent: 'center'
    },
    transactionTextStyles: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 5
    },
    leftSide: {
        alignItems: 'flex-end'
    },
    rightSide: {
        alignItems: 'flex-end'
    }
  });


export default connect(null, { getExchangesCoinBelongsTo, selectCoin, deleteTransaction, getHoldings })(Transaction);