import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


class Transaction extends Component {
    render() {
        return(
            <View style={styles.container}>
                {/* <Text>Individual Transaction List Item Goes Here</Text> */}
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default Transaction;