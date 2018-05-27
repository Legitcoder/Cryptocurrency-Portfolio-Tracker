import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


class GenericFlatList extends Component {

    render() {
        return(
            <FlatList
                style={styles.listStyle}
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
            />
        );
    }
}


const styles = StyleSheet.create({
    listStyle: {
        flex: 1
    }
});



export default GenericFlatList;