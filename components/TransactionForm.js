import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Text, View, StyleSheet } from 'react-native';

class TransactionForm extends Component {
    render() {
        return(
            <View style={styles.formContainer}>
                <Text>{this.props.coin.CoinName}</Text>
            </View>   
        );
    }
}

const mapStateToProps = (state) => {
    return{
        coin: state.coins.coin
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 6,
        backgroundColor: '#fff'
    }
});

export default connect(mapStateToProps)(TransactionForm);