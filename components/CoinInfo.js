import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


class CoinInfo extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Coin Info Screen</Text>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default CoinInfo;