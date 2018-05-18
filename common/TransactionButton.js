import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, Text, StyleSheet } from 'react-native';


class TransactionButton extends Component {
    render() {
        const { text, onPress } = this.props;
        let { buttonColor } = this.props;
        //console.log(buttonColor);
       // buttonColor = buttonColor.substring(0, buttonColor.length-2)
        const { buttonStyle, textStyle } = styles;
        return (
            <TouchableOpacity onPress={onPress} style={[buttonStyle, {backgroundColor: buttonColor || '#6495ED'}]}>
                <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>    
        );
    }
}


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    },
    buttonStyle: { 
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0
    },
  });

export default TransactionButton;