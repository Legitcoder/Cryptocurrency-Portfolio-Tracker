import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';


class ExchangeListScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Exchange List Screen</Text>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default ExchangeListScreen;