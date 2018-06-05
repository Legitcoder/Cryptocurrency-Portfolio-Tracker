import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import AddButton from '../common/AddButton';

class WatchlistScreen extends Component {
    renderWithoutWatchlist = () => {
        const { navigation } = this.props;
        return(
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <Text style={styles.welcomeTextStyles}>Nothing in your Watch List!</Text>
                <AddButton onPress={() => navigation.navigate('addtoporfolio')} />
            </View>
        );
    }


    render() {
        return(
            <View style={styles.container}>
                {this.renderWithoutWatchlist()}
            </View>  
        );
    }
}


const styles = StyleSheet.create({
    buttonTextStyles: {
        color: "#000",
        fontSize: 40
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#202428',
    },
    welcomeTextStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        color: '#fff',
        padding: 20
    },
  });

export default WatchlistScreen;