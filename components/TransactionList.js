import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Transaction from './Transaction';
import AddButton from '../common/AddButton';
import { getTransactions } from '../actions';

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing: false };
    }

    componentDidMount() {
        const { getTransactions } = this.props;
        getTransactions();
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
    }

    render() {
        const {transactions, navigation} = this.props;
        return(
         <View style={styles.container}> 
            <FlatList
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Transaction transaction={item} navigation={navigation} />}
            />
        </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions.transactions,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    addButtonViewStyles: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
})


export default connect(mapStateToProps,  { getTransactions })(TransactionList);