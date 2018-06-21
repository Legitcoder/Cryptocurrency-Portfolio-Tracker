import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const AddButton = ({ onPress, propsButtonStyle, activeOpacity }) => {
        return(
            <TouchableOpacity
                style={[styles.buttonStyles, propsButtonStyle ]}
                onPress={onPress}
                activeOpacity={activeOpacity ?  activeOpacity : 1}
            >
                <Text style={styles.buttonTextStyles}>+</Text>
            </TouchableOpacity>  
        );

}


const styles = StyleSheet.create({
    buttonStyles: {
        backgroundColor: '#fff',
        width: 70,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100,
    },
    buttonTextStyles: {
        color: "#000",
        fontSize: 40
    },
  });



export default AddButton;