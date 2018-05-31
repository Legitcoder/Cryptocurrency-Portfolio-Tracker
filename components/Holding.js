import React, { Component } from 'react';
import {Text, View, StyleSheet, Image } from 'react-native';



class Holding extends Component {

    renderLeft = () => {
        const { holdings } = this.props;
        let holding = holdings[0];
        console.log(holding);
        return(
            <View style={styles.leftStyle}>
                <View style={styles.iconSymbolContainer}> 
                    <Image source={{uri: holding.coin.ImageUrl}} style={{width: 40, height: 40, alignSelf: 'center', resizeMode: 'contain'}} />
                    <Text>{holding.coin.Symbol}</Text>
                </View>
                <Text>{holding.amount} {holding.coin.Symbol}</Text> 
            </View>   
        );

    }

    renderRight = () => {
        const { holdings } = this.props;
        let holding = holdings[0];
        return(
            <View style={styles.rightStyle}>
                <Text>Percentage Gain</Text>
                <Text>{holding.priceBought}</Text>
            </View>      
        );

   
    }

    render() {
        const { holdings } = this.props;
        let holding = holdings[0];
        return(
            <View style={styles.container}>
                {this.renderLeft()}
                {this.renderRight()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        margin: 15,
        borderRadius: 5
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
        alignItems: 'center'
    }
})


export default Holding;