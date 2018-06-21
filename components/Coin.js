import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



export default class Coin extends Component {
    render() {
        const { onPress, avatar, title, subtitle } = this.props;
        return (
            <TouchableWithoutFeedback onPress={ () => onPress() }>
            <View style={ styles.listItemContainer }>
                <Image style={styles.avatarStyles}  source={avatar} />
                <View style={styles.textContainer}>
                <Text>{title}</Text>
                <Text>{subtitle}</Text>
                </View>
                <MaterialIcons style={styles.rightArrowStyles} name="chevron-right" size={30} />
            </View>    
            </TouchableWithoutFeedback>   
        );
    }
}

styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5,
    },
    rightArrowStyles: {
        position: 'absolute',
        right: 0,
    },
    avatarStyles: {
        width: 40, 
        height: 40, 
        resizeMode: 'contain', 
        backgroundColor: '#D3D3D3', 
        padding: 5, 
        marginRight: 10,
        marginLeft: 5
    }
})