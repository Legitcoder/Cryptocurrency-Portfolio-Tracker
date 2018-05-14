import React, { Component } from 'react';
import {View, Text, StyleSheet, List, FlatList, ListItem, ScrollView } from 'react-native';


class CoinList extends Component {
    render() {
        const { coins } = this.props;
        //if(coins === null) {return <Text style={styles.textStyles}>Loading...</Text>}
        return(
            <ScrollView style={styles.container}>
                <Text>CoinList</Text>
                    <FlatList
                        data={coins}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            if(!item) {console.log("Nothing")}
                            return <Text key={item.coinName}style={styles.textStyles}>{item.coinName}</Text>
                        }
                        }
                    />  
            </ScrollView>    
        );
    }
}

const styles = StyleSheet.create({
    textStyles: {
        color: '#fff',
        fontSize: 30
    },
    container: {
        flex: 1,
        height: 50,
        alignSelf: 'center',
    },
  });


export default CoinList;