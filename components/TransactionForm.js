import React, { Component } from 'react'
import {Text, View, StyleSheet } from 'react-native';
import { Transaction } from 'apollo-cache';

class TransactionForm extends Component {
    render() {
        return(
            <View style={styles.formContainer}>
                <Text>This is the transaction form</Text>
            </View>   
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 6,
        backgroundColor: '#fff'
    }
});

export default TransactionForm;