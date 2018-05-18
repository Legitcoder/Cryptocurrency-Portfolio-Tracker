import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import TransactionButton from '../common/TransactionButton';


class TransactionScreen extends Component {

    constructor(props){
        super(props);
        this.state = {buttonbackgroundColor: null, activeState: null, buyButtonColor: 'transparent', sellButtonColor: 'transparent' }
    }
    renderBuyButton() {
        return(
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.buttonStyles, {backgroundColor: this.state.buyButtonColor}]} onPress={() => this.setState({buyButtonColor: '#00800080', sellButtonColor: 'transparent', activeState: 'Buy'})} >
                    <Text style={[styles.textStyles]} >Buy</Text>
                </TouchableOpacity>
            </View> 
        );   
    }
    
    renderSellButton() {
        return(
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.buttonStyles, {backgroundColor: this.state.sellButtonColor}]} onPress={() => this.setState({sellButtonColor: '#FF000080', buyButtonColor: 'transparent', activeState: 'Sell'})} >
                    <Text style={[styles.textStyles]} >Sell</Text>
                </TouchableOpacity>
            </View> 
        );   
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    {this.renderBuyButton()}
                    {this.renderSellButton()}
                </View>
                <View style={styles.formContainer}/>
                <TransactionButton text={this.state.activeState ? 'Add Transaction' : ''} buttonColor={this.state.buyButtonColor != 'transparent' ? this.state.buyButtonColor : this.state.sellButtonColor} />
            </View>
        );
    }
 }


 const styles = StyleSheet.create({
     buttonContainer: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'stretch'
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
     },
     buttonsContainer: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-around',
     },
     formContainer: {
         flex: 8
     }
 })


 export default TransactionScreen;