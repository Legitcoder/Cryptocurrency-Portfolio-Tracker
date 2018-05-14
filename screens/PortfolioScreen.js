import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


class PortfolioScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Portfolio Screen</Text>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default PortfolioScreen;