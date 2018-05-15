import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';


class CoinList extends Component {
    render() {
        const { coins } = this.props;
        return(
            <ScrollView style={styles.container}>
                <List>
                    <FlatList
                        data={coins}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            console.log(item.length);
                            return <ListItem key={item.coinName} title={item.coinName} subtitle={item.symbol} styles={styles.listItemStyles} />
                        }
                        }
                    />  
                </List>    
            </ScrollView>    
        );
    }
}

const styles = StyleSheet.create({
    listItemStyles: {
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: -20
    },
  });


export default CoinList;