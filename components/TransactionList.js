import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Transaction from './Transaction';
import AddButton from '../common/AddButton';
import { getCoinTransactions } from '../actions';

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing: false };
    }

    componentDidMount() {
        const { getCoinTransactions, holding } = this.props;
        const { coin } = holding;
        getCoinTransactions(coin);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
    }

    _onRefresh = () => {
        const { getTransactions, holding } = this.props;
        const { coin } = holding;
        this.setState({ refreshing: true}, () => getCoinTransactions(coin));
        this.setState({refreshing: false});
    } 

    render() {
        const {transactions, navigation, holding} = this.props;
        return(
         <View style={styles.container}> 
            <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                />
            }
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Transaction transaction={item} holding={holding} navigation={navigation} />}
            />
        </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
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


export default connect(mapStateToProps,  { getCoinTransactions })(TransactionList);