import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


class SearchBar extends Component {
    render() {
        return(
            <View style={styles.container}>
                <TextInput style={styles.textInputStyles} placeholder="Search Coin" />
            </View>
        );
    }
}

const styles =  StyleSheet.create({
    textInputStyles: {
        backgroundColor: "#fff",
        alignSelf: 'center',
        width: `${70}%`,
        height: `${80}%`,
    },
    container: {
        backgroundColor: 'gray',
        width: `${85}%`,
        height: `${5}%`,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    }
})

export default SearchBar;