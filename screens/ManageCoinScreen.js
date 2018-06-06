import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


class ManageCoinScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        console.log(navigation.state.params)
        return {
            title: 'CoinInfo',
            headerLeft: <Feather name="arrow-left" size={25} color='#fff' onPress={() => {
                navigation.state.params.refresh();
                navigation.navigate('portfolio');
            }} />,
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0,
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Coin info</Text>
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


 export default ManageCoinScreen;