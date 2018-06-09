import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import TransactionButton from '../common/TransactionButton';
import TransactionForm from '../components/TransactionForm';
import { saveTransaction, getHoldings } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather, Ionicons } from '@expo/vector-icons';


class TransactionScreen extends Component {
    static navigationOptions = ({navigation}) => {

        handleTrash = () => {
            alert("Clicking Trash");
            navigation.navigate('portfolio');
        }

        const { CoinName, Symbol, ImageUrl } = navigation.state.params.coin;
        return{
            headerTitle:  <Image style={{width: 40, height: 40, alignSelf: 'center', flex: 1, resizeMode: 'contain'}} source={{ uri: ImageUrl}} />,
            headerLeft: <Feather name="arrow-left" size={25} color='#fff' onPress={() => navigation.goBack()} />,
            title: `${CoinName} - ${Symbol}`,
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0,
            },
            headerRight: <Ionicons name="md-trash" size={20} color="#fff" style={{marginRight: 10}} onPress={this.handleTrash} /> //For Android the Image doesn't center and veers off to the right so adding an empty View centers it
        };
    }

    constructor(props){
        super(props);
        this.state = {buttonbackgroundColor: null, activeState: "Buy", buyButtonColor: '#00800080', sellButtonColor: 'transparent', scrollHeight: -60 }
    }
    renderBuyButton() {
        return(
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.buttonStyles, {backgroundColor: this.state.buyButtonColor}]} onPress={() => this.setState({buyButtonColor: '#00800060', sellButtonColor: 'transparent', activeState: 'Buy'})} >
                    <Text style={[styles.textStyles]}>Buy</Text>
                </TouchableOpacity>
            </View> 
        );   
    }
    
    renderSellButton() {
        return(
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.buttonStyles, {backgroundColor: this.state.sellButtonColor}]} onPress={() => this.setState({sellButtonColor: '#FF000060', buyButtonColor: 'transparent', activeState: 'Sell'})} >
                    <Text style={[styles.textStyles]}>Sell</Text>
                </TouchableOpacity>
            </View> 
        );   
    }

    renderHeader() {
        const {CoinName, Symbol, ImageUrl} = this.props.navigation.state.params.coin;
        return(
            <View style={styles.headerContainerStyles}>
                <Text style={styles.headerTextStyles}>{CoinName} - {Symbol}</Text>
            </View>    
        );
    }

    handleTransaction = (formState) => {
        const { coin } = this.props.navigation.state.params;
        const { navigation, saveTransaction } = this.props;
        const transaction= { exchange: formState.activeExchange, amount: formState.amount, date: formState.date, priceBought: formState.priceBought, tradingPair: formState.activeTradingPair, activeOrderState: formState.activeOrderState, coin: coin, usdPriceBought: formState.usdPriceBought, btcPriceBought: formState.btcPriceBought, currentUSDPrice: formState.currentUSDPrice, currentBTCPrice: formState.currentBTCPrice};
        saveTransaction(transaction);
        navigation.navigate('managecoin', { refresh: () => {
            const { getHoldings } = this.props;
            getHoldings();
        }});
    } 


    render() {
        const { coin } = this.props.navigation.state.params;
        const { scrollHeight, activeState } = this.state;
        const { container, buttonsContainer} = styles;
        return(
           <View style={container}> 
            <KeyboardAwareScrollView
            scrollEnabled={true}
            enableOnAndroid={true}
            resetScrollToCoords={{ x: 0, y: 0 }}   
            contentContainerStyle={container}
            onKeyboardWillShow={ (e) => this.setState({scrollHeight: -60})} 
            onKeyboardWillHide={ (e) => this.setState({scrollHeight: 0})} 
            extraScrollHeight={scrollHeight}
            keyboardShouldPersistTaps='handled'
            >
            <View style={container}>
                    {this.renderHeader()}
                <View style={buttonsContainer}>
                    {this.renderBuyButton()}
                    {this.renderSellButton()}
                </View>
                <TransactionForm navigation={this.props.navigation} activeOrderState={activeState} onPress={ this.handleTransaction} />
             </View>   
            </KeyboardAwareScrollView>
           </View> 
        );
    }
 }


 const styles = StyleSheet.create({
     headerContainerStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     },
     buttonContainer: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'stretch',
     },
     headerTextStyles: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
     },
     textStyles: {
        alignSelf: 'center',
        opacity: 1,
        color: '#fff',
        fontWeight: 'bold'
     },

     buttonStyles: {
        justifyContent: 'center',
        alignSelf: 'center', 
        padding: 20,
        borderRadius: 10,
        width: '60%',
        borderColor: '#fff',
        borderWidth: 2
     },
     container: {
        flexGrow: 1,
        backgroundColor: '#202428',
        justifyContent: 'space-between'
     },
     buttonsContainer: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-around',
         //backgroundColor: "#fff",
         //marginTop: -30
     },
 })


 export default connect(null, { saveTransaction, getHoldings })(TransactionScreen);