import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { BASE_URL } from '../App';


//<ActivityIndicator style={{flex: 1}} size="large" color="#fff" />; 

class CoinList extends Component {
    renderList() {
        const { coins, onPress } = this.props;
        if(!coins) {return <View style={styles.textContainer}><Text style={styles.textStyles}>Search for Cryptocurrencies</Text></View>; }
        else if(coins){
        return(
                //Keyboard and Scrolling through the List aren't playing well together even with KeyboardAvoidingView
                <List style={styles.listStyles}  keyboardShouldPersistTaps='handled'>

                        <FlatList keyboardShouldPersistTaps='handled'
                            data={coins}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => {
                                return <ListItem 
                                            onPress={() => onPress({...item, ImageUrl: `${BASE_URL}${item.ImageUrl}` })}
                                            avatar={{ uri: `${BASE_URL}${item.ImageUrl}` }}
                                            key={item.CoinName} 
                                            title={item.CoinName} 
                                            subtitle={item.Symbol} 
                                            style={styles.listItemStyles} 

                                        />
                            }
                            }
                        /> 
 
                </List>   
            );
        }
    }

    render() {     
        return <View style={styles.container}>{this.renderList()}</View>
    }
}



const styles = StyleSheet.create({
    listStyles: {
        // flexGrow: 1
    },
    textStyles: {
        flex: 1, 
        color: '#fff',
        fontSize: 20
    },
    listItemStyles: {
        //flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
  });


export default CoinList;