import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const ListItem = ({ title, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={ () => onPress() }>
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemTextStyles}> 
                    {title} 
                </Text>
                <MaterialIcons style={styles.rightArrowStyles} color={'#fff'} name="chevron-right" size={30} />
            </View>
        </TouchableWithoutFeedback>    
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemTextStyles: {
        color: '#fff',
        padding: 10,
        fontSize: 18
    }
});

export default ListItem;