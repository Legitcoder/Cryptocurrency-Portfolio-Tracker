import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SearchCoinsScreen from './SearchCoinsScreen';
import { Feather } from '@expo/vector-icons';


class AddToPortfolioScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Search Cryptocurrencies',
            headerLeft: <Feather name="arrow-left" size={25} color='#fff' onPress={() => navigation.goBack()} />,
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }   
    
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