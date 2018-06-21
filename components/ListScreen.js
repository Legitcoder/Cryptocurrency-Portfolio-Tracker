import React from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import ListItem from '../common/ListItem';
import { Feather } from '@expo/vector-icons';

const ListScreen = ({navigation, data, onPress }) => {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.listStyle}
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={({item}) => <ListItem 
                titleStyle={styles.titleStyle} 
                title={item.exchange ? item.exchange : item} 
                onPress={ () => {
                    onPress(item); 
                    navigation.goBack(); 
                } }/>}
            />
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202428',
    },
    titleStyle: {
        color: '#fff',
        fontWeight: 'bold'
    }
  });


export default ListScreen;