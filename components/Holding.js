import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getHoldings, selectHolding, getHistoricalBTCPrices } from '../actions';
import { Entypo } from '@expo/vector-icons';

class Holding extends Component {
    constructor(props) {
        super(props);
    }

    renderLogoAndQuantity = () => {
        const { holding } = this.props;
        return(
            <View style={styles.leftStyle}>
                <View style={styles.iconSymbolContainer}> 
                    <Image source={{uri: holding.coin.ImageUrl}} style={{width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain', marginRight: 5}} />
                    <Text style={{marginLeft: 5, color: "#fff", fontSize: 17, fontWeight: 'bold'}}>{holding.coin.Symbol}</Text>
                </View>
                <Text style={{marginTop: 5, color: "#fff", fontSize: 17, fontWeight: 'bold'}}>{holding.amount} {holding.coin.Symbol}</Text> 
            </View>   
        );

    }

    renderGreenDelta = () => <Entypo style={{color: '#008000', alignSelf: 'center'}} name="triangle-up" size={25} />; 

    renderRedDelta = () => <Entypo style={{color: '#ff0000', alignSelf: 'center', }} name="triangle-down" size={25} /> ;

    calculatePercentage = () => {
        const { holding } = this.props;
        return `${((Math.abs(1-(holding.currentUSDPrice/holding.usdPriceTransacted))*100).toFixed(2))}%`;
    }

    renderGains = () => {
        const { holding } = this.props;
        return(
            <View style={styles.rightStyle}>
                <Text style={{marginBottom: 3, color: "#fff", fontSize: 17, fontWeight: 'bold'}}>
                {holding.usdPriceTransacted < holding.currentUSDPrice ? this.renderGreenDelta() : this.renderRedDelta()}
                {this.calculatePercentage()}
                </Text>
                <Text style={{marginTop: 3, color: "#fff", fontSize: 17, fontWeight: 'bold'}}>${(holding.currentUSDPrice * holding.amount).toFixed(2)}</Text>
            </View>      
        );
    }

    handlePressHolding = () => {
        const { selectCoin, navigation, holding, selectHolding, getHistoricalBTCPrices } = this.props;
        navigation.navigate('managecoin', { holding: holding, refresh: () => {
            const { getHoldings } = this.props;
            getHoldings();
        }});
        selectHolding(holding);
        //getHistoricalBTCPrices(holding.coin);
    }

    render() {
        const { holding, navigation } = this.props;
        return(
            <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => this.handlePressHolding()}>
                {this.renderLogoAndQuantity()}
                {this.renderGains()}
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        usdPrice: state.coins.usdPrice
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2b3136',
        margin: 15,
        borderRadius: 5,
        height: '20%',
        padding: 15
    },
    leftStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSymbolContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    deltaIconStyles: {
        color: 'green'
    }
})



export default connect(mapStateToProps, {getHoldings, selectHolding, getHistoricalBTCPrices })(Holding);