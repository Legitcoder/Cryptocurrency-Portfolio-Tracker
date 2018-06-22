import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { getCoinTransactions } from '../actions';
import TransactionList from './TransactionList';


class Transactions extends Component {

    componentDidMount() {
        const { getCoinTransactions } = this.props;
        const { coin } = this.props.holding;
        getCoinTransactions(coin);
    }

    render() {
        const { holding } = this.props;
        return(
            <View style={styles.container}>
                <TransactionList holding={holding} />
            </View>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        holding: state.holdings.holding,
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#282E33',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });

export default connect(mapStateToProps, { getCoinTransactions })(Transactions);