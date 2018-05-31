import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';



class Holding extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>This is where an individual holding will be displayed</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default Holding;