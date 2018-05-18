import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


class TransactionScreen extends Component {

    renderButton(text, bgColor){
        return(
            <View style={[styles.buttonContainer, {backgroundColor: bgColor} ]}>
                <TouchableOpacity>
                    <Text>{text}</Text>
                </TouchableOpacity>
            </View> 
        );   
    }
    
    render() {
        return(
            <View style={styles.buttonsContainer}>
            {this.renderButton("Buy", "green")}
            {this.renderButton("Sell", "red")}
            </View>
        );
    }
 }


 const styles = StyleSheet.create({
     buttonContainer: {
     },

     buttonsContainer: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-around',
     }
 })


 export default TransactionScreen;