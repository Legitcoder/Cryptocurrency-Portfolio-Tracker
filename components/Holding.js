import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, StyleSheet, Image } from 'react-native';
import { getCoinUSDPrice } from '../actions';



class Holding extends Component {
    constructor(props) {
        super(props);
        this.state = {currentUsdPrice: props.holding.usdPrice}
    }

    componentWillMount() {
        const { getCoinUSDPrice, holding } = this.props;
        getCoinUSDPrice(holding.coin.Symbol);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ currentUsdPrice: nextProps.holding.usdPrice});
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

    renderGains = () => {
        const { holding } = this.props;
        return(
            <View style={styles.rightStyle}>
                <Text style={{marginBottom: 3, color: "#fff", fontSize: 17, fontWeight: 'bold'}}>Percentage Gain</Text>
                <Text style={{marginTop: 3, color: "#fff", fontSize: 17, fontWeight: 'bold'}}>${(this.state.currentUsdPrice * holding.amount).toFixed(2)}</Text>
            </View>      
        );

   
    }

    render() {
        const { holding } = this.props;
        return(
            <View style={styles.container}>
                {this.renderLogoAndQuantity()}
                {this.renderGains()}
            </View>
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
    }
})



export default connect(mapStateToProps, { getCoinUSDPrice })(Holding);