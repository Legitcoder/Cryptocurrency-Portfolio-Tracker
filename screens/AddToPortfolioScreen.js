import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SearchCoinsScreen from './SearchCoinsScreen';


class AddToPortfolioScreen extends Component {
    
    render() {
        return(
            <View style={styles.container}>
                <SearchCoinsScreen navigation={this.props.navigation} />
            </View>
        );
    }
 }


 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#202428',
         justifyContent: 'flex-start'
     }
 })


 export default AddToPortfolioScreen;