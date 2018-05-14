import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, Text, StyleSheet } from 'react-native';


class Button extends Component {
    render() {
        const { text, buttonColor, onPress } = this.props;
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
      alignSelf: 'stretch',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Button;