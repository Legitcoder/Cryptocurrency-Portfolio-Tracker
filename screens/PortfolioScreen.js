import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { coins } from '../App';
import SearchCoinsScreen from './SearchCoinsScreen';
import PortfolioAddButton from '../common/PortfolioAddButton';


class PortfolioScreen extends Component {
    static navigationOptions =  {
        header: null,
        tabBarIcon: ({ tintColor }) => {
            return <Ionicons name="md-checkmark-circle" size={32} color={tintColor} />
        }
    }
    render() {
        const { navigation } = this.props;
        return(
            <View style={styles.container}>
                <PortfolioAddButton onPress={() => {navigation.navigate('addtoporfolio'); console.log("Being Pressed")}} />
            </View>    
        );
    }
}



const styles = StyleSheet.create({
    buttonStyles: {
        backgroundColor: '#fff',
        width: 80,
        height: 75,
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
      backgroundColor: '#282E33',
    },
  });


export default connect(null)(PortfolioScreen);