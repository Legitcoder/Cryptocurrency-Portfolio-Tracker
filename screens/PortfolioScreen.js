import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { coins } from '../App';
import SearchCoinsScreen from './SearchCoinsScreen';
import PortfolioAddButton from '../common/PortfolioAddButton';


class PortfolioScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#202428',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0
        }
    }

    render() {
        const { navigation } = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.welcomeTextStyles}>Your Portfolio Starts Here!</Text>
                <PortfolioAddButton onPress={() => navigation.navigate('addtoporfolio')} />
            </View>    
        );
    }
}



const styles = StyleSheet.create({
    buttonStyles: {
        backgroundColor: '#fff',
        width: 70,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100
    },
    buttonTextStyles: {
        color: "#000",
        fontSize: 40
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#202428',
    },
    welcomeTextStyles: {
        fontSize: 25,
        color: '#fff',
        padding: 20
    }
  });


export default connect(null)(PortfolioScreen);