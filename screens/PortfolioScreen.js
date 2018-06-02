import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { coins } from '../App';
import SearchCoinsScreen from './SearchCoinsScreen';
import AddButton from '../common/AddButton';
import HoldingList from '../components/HoldingList';
import { getHoldings } from '../actions';


class PortfolioScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#202428',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0
        }
    }

    componentDidMount() {
        const { getHoldings } = this.props;
        getHoldings();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    renderWithoutHoldings = () => {
        const { navigation } = this.props;
        return(
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <Text style={styles.welcomeTextStyles}>Your Portfolio Starts Here!</Text>
                <AddButton onPress={() => navigation.navigate('addtoporfolio')} />
            </View>
        );
    }

    renderPortfolioValue = () => {
        return(
            <View styles={styles.portfolioValueStyles}>
                <Text style={styles.portfolioValueTextStyles}>$153,670</Text>
            </View>
        );
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