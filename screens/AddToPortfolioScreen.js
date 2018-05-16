import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SearchCoinsScreen from './SearchCoinsScreen';


class AddToPortfolioScreen extends Component {
    
    render() {
        return(
            <View style={styles.container}>
                <SearchCoinsScreen />
            </View>
        );
    }
 }


 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#282E33',
     }
 })


 export default AddToPortfolioScreen;