import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import TransactionButton from '../common/TransactionButton';
import TransactionForm from '../components/TransactionForm';

class TransactionScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const { coinName, symbol, ImageUrl } = navigation.state.params.coin;
        return{
            headerTitle:  <Image style={{width: 40, height: 40}} source={{ uri: ImageUrl}} />,
            title: `${coinName} - ${symbol}`,
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0
            },
            headerTintColor: '#fff',
        };
    }

    constructor(props){
        super(props);
        this.state = {buttonbackgroundColor: null, activeState: "Buy", buyButtonColor: '#00800080', sellButtonColor: 'transparent' }
    }
    renderBuyButton() {
        return(
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.buttonStyles, {backgroundColor: this.state.buyButtonColor}]} onPress={() => this.setState({buyButtonColor: '#00800080', sellButtonColor: 'transparent', activeState: 'Buy'})} >
                    <Text style={[styles.textStyles]}>Buy</Text>
                </TouchableOpacity>
            </View> 
        );   
    }
    
    renderSellButton() {
        return(
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.buttonStyles, {backgroundColor: this.state.sellButtonColor}]} onPress={() => this.setState({sellButtonColor: '#FF000080', buyButtonColor: 'transparent', activeState: 'Sell'})} >
                    <Text style={[styles.textStyles]}>Sell</Text>
                </TouchableOpacity>
            </View> 
        );   
    }

    renderHeader() {
        const {coinName, symbol, ImageUrl} = this.props.navigation.state.params.coin;
        return(
            <View style={styles.headerContainerStyles}>
                <Text style={styles.headerTextStyles}>{coinName} - {symbol}</Text>
            </View>    
        );
    }


    render() {
        console.log(this.props.navigation.state.params)
        return(
            <View style={styles.container}>
                    {this.renderHeader()}
                <View style={styles.buttonsContainer}>
                    {this.renderBuyButton()}
                    {this.renderSellButton()}
                </View>
                <TransactionForm/>
                <TransactionButton style={{flex: 1}} text={this.state.activeState ? 'Add Transaction' : ''} buttonColor={this.state.activeState === "Buy" ? '#008000' : '#FF0000'} />
            </View>
        );
    }
 }


 const styles = StyleSheet.create({
     headerContainerStyles: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
     },
     buttonContainer: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'stretch',
     },
     headerTextStyles: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
     },
     textStyles: {
        alignSelf: 'center',
        opacity: 1,
        color: 'lightgray',
        fontWeight: 'bold'
     },

     buttonStyles: {
        justifyContent: 'center',
        alignSelf: 'center', 
        padding: 20,
        borderRadius: 10,
        width: '60%',
        borderColor: 'lightgray',
        borderWidth: 2
     },
     container: {
        flex: 1,
        backgroundColor: '#282E33',
        justifyContent: 'space-between'
     },
     buttonsContainer: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-around',
         //backgroundColor: "#fff",
         marginTop: -30
     },
 })


 export default TransactionScreen;