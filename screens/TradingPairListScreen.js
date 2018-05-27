import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';


class TradingPairListScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Trading Pair List Screen</Text>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default TradingPairListScreen;