import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons, Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { coins } from '../App';
import SearchCoinsScreen from './SearchCoinsScreen';
import AddButton from '../common/AddButton';
import HoldingList from '../components/HoldingList';
import { getHoldings } from '../actions';
import _ from 'lodash';


class PortfolioScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#202428',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0
        }
    }

    constructor(props){
        super(props);
        this.state = { totalcurrentUSDPrices: [] }
    }

    componentDidMount() {
        const { getHoldings } = this.props;
        getHoldings();
    }

    componentWillReceiveProps(nextProps) {
        const { holdings } = nextProps;
        if(holdings) this.setState({ totalcurrentUSDPrices: holdings.map(holding => holding.currentUSDPrice * holding.amount)});
    }

    renderWithoutHoldings = () => {
        const { navigation } = this.props;
        return(
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <Text style={styles.welcomeTextStyles}>Your Portfolio Starts Here!</Text>
                <AddButton onPress={() => navigation.navigate('searchcoins')} />
            </View>
        );
    }

    renderPortfolioValue = () => {
        return(
            <View styles={styles.portfolioValueStyles}>
                <Text style={styles.portfolioValueTextStyles}>{this.calculatePortfolioValue()}</Text>
            </View>
        );
    }

    calculatePortfolioValue = () => {
        if(this.state.totalcurrentUSDPrices !== []) return `$${this.state.totalcurrentUSDPrices.reduce((accumulator, currentValue) => accumulator + currentValue).toFixed(2)}`;
        const {holdings} = this.props;
        const totalPrices = [];
        holdings.forEach(holding => totalPrices.push(parseFloat((holding.currentUSDPrice * holding.amount))));
        return `$${totalPrices.reduce((accumulator, currentValue) => accumulator + currentValue).toFixed(2)}`;

    }

    render() {
        const { navigation, holdings } = this.props;
        if(!holdings) return this.renderWithoutHoldings();
        return(
            <View style={styles.container}>
                {this.renderPortfolioValue()}
                <HoldingList navigation={navigation} holdings={holdings} />
            </View>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        holdings: state.holdings.holdings
    }
}



const styles = StyleSheet.create({
    buttonStyles: {
        backgroundColor: '#fff',
        width: 70,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100
    },
    buttonTextStyles: {
        color: "#000",
        fontSize: 40
    },

    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#202428',
    },
    welcomeTextStyles: {
        fontSize: 25,
        color: '#fff',
        padding: 20
    },
    portfolioValueStyles: {
        flex: 1
    },
    portfolioValueTextStyles: {
        fontSize: 40,
        color: "#fff"
    }
  });


export default connect(mapStateToProps, { getHoldings })(PortfolioScreen);