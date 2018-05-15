import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import TransactionButton from '../common/TransactionButton';

class WatchlistScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>SOme Text Here</Text>
                <TransactionButton onPress={() => {console.log("Do something")}} text={'Add Transaction'} buttonColor={'#228B22'} />
            </View>  
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default WatchlistScreen;