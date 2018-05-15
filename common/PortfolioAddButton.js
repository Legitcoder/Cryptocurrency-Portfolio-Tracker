import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


class PortfolioAddButton extends Component {
    render() {
        return(
        <TouchableOpacity
            style={styles.buttonStyles}
        >
            <Text style={styles.buttonTextStyles}>+</Text>
        </TouchableOpacity>  
        );
    }
}


const styles = StyleSheet.create({
    buttonStyles: {
        backgroundColor: '#fff',
        width: 80,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100
    },
    buttonTextStyles: {
        color: "#000",
        fontSize: 40
    },
  });



export default PortfolioAddButton;