import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker  from 'react-native-modal-datetime-picker';


class TransactionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
             exchanges: [],
             activeExchange: '', 
             activeTradingPair: '', 
             isDateTimePickerVisible: false,
             date: new Date().toString().slice(0 , -18)}
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
        this.setState({exchanges: exchanges,
                       activeExchange: exchanges.length > 0 ? exchanges[0].exchange : "N/A", 
                       activeTradingPair: exchanges.length > 0 ? exchanges[0].pairs[0] : "None"})
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({date: date.toString().slice(0 , -18)})
        this._hideDateTimePicker();
      };

    renderForm() {
        return(
            <View style={styles.formContainer}>
                <View style={styles.formItemContainer}>
                    <Text style={styles.labelTextStyle}>Exchange</Text>  
                    <Text style={styles.selectionTextStyles}>{this.state.activeExchange}</Text>
                </View>
                <Divider style={{ backgroundColor: '#000' }} />
                <View style={styles.formItemContainer}>                                      
                    <Text style={styles.labelTextStyle}>Trading Pair</Text>
                    <Text style={styles.selectionTextStyles}>{this.props.coin.CoinName}/{this.state.activeTradingPair}</Text>
                </View>
                <Divider style={{ backgroundColor: '#000' }} />
                <View style={styles.formItemContainer}>                     
                    <Text style={styles.selectionTextStyles}>{this.props.activeOrderState} Price in {this.state.activeTradingPair}</Text>
                    <TextInput underlineColorAndroid='transparent' style={[styles.selectionTextStyles, {width: '100%'}]} placeholder="Price" placeholderTextColor="#80808050"/>
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
        // coin: state.coins.coin,
        exchanges: state.coins.exchanges,
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

export default connect(mapStateToProps)(TransactionForm);