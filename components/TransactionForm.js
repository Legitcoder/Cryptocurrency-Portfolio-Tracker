import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements'
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
            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.formItemContainer}>
                    <Text>Exchange</Text>  
                    <Text>{this.state.activeExchange}</Text>
                </View>
                <Divider style={{ backgroundColor: 'blue' }} />
                <View style={styles.formItemContainer}>                                      
                    <Text>Trading Pair</Text>
                    <Text>{this.props.coin.CoinName}/{this.state.activeTradingPair}</Text>
                </View>
                <Divider style={{ backgroundColor: 'blue' }} />
                <View style={styles.formItemContainer}>                     
                    <Text>{this.props.activeOrderState} in Price in {this.state.activeTradingPair}</Text>
                    <TextInput />
                </View>  
                <Divider style={{ backgroundColor: 'blue' }} />
                <View style={styles.formItemContainer}>                     
                    <TextInput placeholder="Amount Bought" />
                </View> 
                <Divider style={{ backgroundColor: 'blue' }} />
                <View style={styles.formItemContainer}>                     
                    <Text>Date & Time</Text>
                    <TextInput />
                </View>                  
            </ScrollView> 
        );
    }

    render() {
        return(
            <View style={{flex: 6}}>
            {this.renderForm()}
            </View>
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
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 80,
    },
    formItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#35383a',
    }
});

export default connect(mapStateToProps)(TransactionForm);