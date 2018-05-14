import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { coins } from '../App';


class PortfolioScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <SearchBar />
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: 30
    },
  });


export default PortfolioScreen;