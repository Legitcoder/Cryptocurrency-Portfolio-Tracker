import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Text, TextInput, View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker  from 'react-native-modal-datetime-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { getTradingPairsPriceHash } from '../actions';


class TransactionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
             exchanges: [],
             tradingPairs: [],
             activeExchange: '', 
             activeTradingPair: '', 
             isDateTimePickerVisible: false,
             date: new Date().toString().slice(0 , -18),
             tradingPairsPrices: ''
             //coin: null
            }
    }

    componentDidMount() {
        console.log(this.props);
        const {coin, exchanges, getTradingPairsPriceHash } = this.props;
        if(coin && coin === null) this.setState({coin: coin});
        if(exchanges && exchanges === []) this.setState({exchanges: exchanges});
    }

    componentDidUpdate() {
        console.log(this.props);
        const {coin, exchanges } = this.props;
        if(coin && coin === null) this.setState({coin: coin});
        if(exchanges && exchanges === []) this.setState({exchanges: exchanges});
    }

    extractExchangeIndex(exchangeObjArray, activeExchange) {
        const exchanges = [];
        exchangeObjArray.forEach(exchangeObj => {
            exchanges.push(exchangeObj.exchange);
        });
        return exchanges.indexOf(activeExchange);
    }


    componentWillReceiveProps(nextProps) {
        const {getTradingPairsPriceHash, coin, tradingPairsPrices } = nextProps;
        let { exchanges } = nextProps;
        if(!exchanges) {exchanges = this.state.exchanges};
        let activeExchangeIndex = this.extractExchangeIndex(exchanges, this.state.activeExchange);
        if(activeExchangeIndex === -1) activeExchangeIndex = 0;
            this.setState({exchanges: exchanges,
                tradingPairs: exchanges.length === 0 ? [] : exchanges[activeExchangeIndex].pairs ,
                activeExchange: exchanges.length === 0 ? "N/A" : this.state.activeExchange === '' ? exchanges[0].exchange : this.state.activeExchange, 
                activeTradingPair: exchanges.length === 0 ? "N/A" : this.state.activeTradingPair === '' ? exchanges[0].pairs[0] : this.state.activeTradingPair
            }, () => {
                if(activeExchangeIndex !== -1) this.setState({tradingPairs: exchanges[activeExchangeIndex].pairs})
                if(!tradingPairsPrices) {
                    getTradingPairsPriceHash(coin.Symbol, this.state.tradingPairs, this.state.activeExchange);
                    this.setState({tradingPairsPrices: tradingPairsPrices});
                }
            });
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({date: date.toString().slice(0 , -18)})
        this._hideDateTimePicker();
    };


    onPressExchanges = (selectedExchange, tradingPairs) => {
        this.setState({ activeExchange: selectedExchange, activeTradingPair: tradingPairs[0], tradingPairs: tradingPairs});
    }

    onPressTradingPairs = (selectedTradingPair) => {
        this.setState({ activeTradingPair: selectedTradingPair});
    }

    renderSelectTradingPair = () => {

    }



    renderForm = () => {
        console.log(this.state);
        return(
            <View style={styles.formContainer}>
                <TouchableWithoutFeedback 
                onPress={ () => this.props.navigation.navigate('exchanges', {exchanges: this.state.exchanges, onPressExchanges: this.onPressExchanges})} >
                    <View style={[styles.formItemContainer]}>
                        <Text style={styles.labelTextStyle}>Exchange</Text>  
                        <Text style={styles.selectionTextStyles}>{this.state.activeExchange}</Text>
                        <MaterialIcons style={styles.navigateNextIconStyle} name="navigate-next" size={40} />
                    </View>
                </TouchableWithoutFeedback>
                <Divider style={{ backgroundColor: '#000' }} />
                <TouchableWithoutFeedback 
                onPress={ () => this.props.navigation.navigate('tradingPairs', {tradingPairs: this.state.tradingPairs, onPressTradingPairs: this.onPressTradingPairs})} >
                    <View style={styles.formItemContainer}>                                      
                        <Text style={styles.labelTextStyle}>Trading Pair</Text>
                        <Text style={styles.selectionTextStyles}>{`${this.props.coin.CoinName}/${this.state.activeTradingPair}`}</Text>
                        <MaterialIcons style={styles.navigateNextIconStyle} name="navigate-next" size={40} />
                    </View>
                </TouchableWithoutFeedback>
                <Divider style={{ backgroundColor: '#000' }} />
                <View style={styles.formItemContainer}>                     
                    <Text style={styles.selectionTextStyles}>{this.props.activeOrderState} Price in {this.state.activeTradingPair}</Text>
                    <TextInput underlineColorAndroid='transparent' style={[styles.selectionTextStyles, {width: '100%'}]} placeholder="Price" placeholderTextColor="#80808050" value={this.state.activeTradingPair[this.state.activeTradingPair]}/>
                </View>  
                <Divider style={{ backgroundColor: '#000' }} />
                <View style={styles.formItemContainer}>                     
                    <TextInput underlineColorAndroid='transparent' style={[styles.selectionTextStyles, {width: '100%'}]} placeholder="Amount Bought" placeholderTextColor="#80808050" />
                </View> 
                <Divider style={{ backgroundColor: '#000' }} />
                <View style={styles.formItemContainer}>
                    <Text style={styles.labelTextStyle}>Date & Time</Text>                       
                    <Text style={styles.selectionTextStyles} onPress={this._showDateTimePicker}>{this.state.date}</Text>
                </View>
                <DateTimePicker
                    mode="datetime"
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    />                  
            </View> 
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
        tradingPairsPrices: state.coins.tradingPairsPrices,
        exchanges: state.coins.exchanges,
        //coin: state.coins.coin,
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flexGrow: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#282E33',
        marginBottom: 80,
    },
    navigateNextIconStyle: {
        position: 'absolute',
        right: 0,
        color: "#fff"
    },
    formItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#282E33',
    },
    selectionTextStyles: {
        color: "#fff",
        fontSize: 18,
        margin: 2.5,
        marginLeft: 10
    },
    labelTextStyle: {
        color: "gray",
        fontSize: 14,
        margin: 2.5,
        marginLeft: 10
    }
});

export default connect(mapStateToProps, {getTradingPairsPriceHash})(TransactionForm);