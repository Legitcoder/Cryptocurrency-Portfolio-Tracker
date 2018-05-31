import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import Holding from './Holding';



class HoldingList extends Component {
    render() {
        const {holdings} = this.props;
        return(
         <View style={styles.container}>   
            <ScrollView contentContainerStyle={styles.container}>
                <Holding holdings={holdings} />
                <Holding holdings={holdings}/>
                <Holding holdings={holdings}/>
                <Holding holdings={holdings}/>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        margin: 15
    }
})


export default HoldingList;