import React, { Component } from 'react';
import {Text, View, StyleSheet, Image } from 'react-native';



class Holding extends Component {
    render() {
        const { holdings } = this.props;
        let holding = holdings[0];
        return(
            <View style={styles.container}>
                <Image source={{uri: holding.coin.ImageUrl}} style={{width: 40, height: 40, alignSelf: 'center', flex: 1, resizeMode: 'contain'}} />
                <Text>{holding.coin.Symbol}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        margin: 15
    }
})


export default Holding;