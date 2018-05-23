import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { nextTick } from 'async';

class TransactionForm extends Component {

    constructor(props){
        super(props);
        this.state = {exchanges: [], activeExchange: '', activeTradingPair: ''}
    }

    componentDidMount() {
        const {coin, exchanges } = this.props;
        if(coin && coin === null) this.setState({coin: coin});
        if(exchanges && exchanges === []) this.setState({exchanges: exchanges});
        console.log(this.state.exchanges);
    }

    componentDidUpdate() {
        const {coin, exchanges } = this.props;
        if(coin && coin === null) this.setState({coin: coin});
        if(exchanges && exchanges === []) this.setState({exchanges: exchanges});
        console.log(this.state.exchanges);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const { exchanges } = nextProps;
        this.setState({exchanges: exchanges, activeExchange: exchanges[0].exchange, activeTradingPair: exchanges[0].pairs[0]})
    }

    renderForm() {
        return(
            <View style={styles.formItemContainer}>
                <FormLabel>Exchange</FormLabel>
                <Text>{this.state.activeExchange}</Text>
                <FormLabel>Trading Pair</FormLabel>
                <Text>{this.state.activeTradingPair}</Text>
                <FormLabel>{this.props.activeOrderState} in Price in {this.state.activeTradingPair}</FormLabel>
                <TextInput />
            </View>  
        );
    }

    render() {
        return(
            <ScrollView style={styles.formContainer}>
                <View style={styles.formItemContainer}>
                    <FormLabel>Exchange</FormLabel>  
                    <Text>{this.state.activeExchange}</Text>
                </View>
                <View style={styles.formItemContainer}>                                      
                    <FormLabel>Trading Pair</FormLabel>
                    <Text>{this.props.coin.CoinName}/{this.state.activeTradingPair}</Text>
                </View>
                <View style={styles.formItemContainer}>                     
                    <FormLabel>{this.props.activeOrderState} in Price in {this.state.activeTradingPair}</FormLabel>
                    <TextInput />
                </View>  
                <View style={styles.formItemContainer}>                     
                    <TextInput placeholder="Amount Bought" />
                </View> 
                <View style={styles.formItemContainer}>                     
                    <FormLabel>Date & Time</FormLabel>
                    <TextInput />
                </View>                  
            </ScrollView>
                 
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        // coin: state.coins.coin,
        exchanges: state.coins.exchanges,
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 10,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 80
    },
    formItemContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#35383a',
    }
});

export default connect(mapStateToProps)(TransactionForm);