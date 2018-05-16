import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';



class CoinList extends Component {
    render() {

        const { coins, onPress } = this.props;
        console.log(height);
        const height = Dimensions.get('window').height;
        return(
            //Keyboard and Scrolling through the List aren't playing well together even with KeyboardAvoidingView
            <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS ==='android' ?  (-(height)*.1) : (-(height)*.053)} style={styles.container}  behavior="padding">
            <List>
                    <FlatList
                        data={coins}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            return <ListItem 
                                        onPress={() => onPress(item)}
                                        key={item.coinName} 
                                        title={item.coinName} 
                                        subtitle={item.symbol} 
                                        style={styles.listItemStyles} 

                                    />
                        }
                        }
                    />
            </List>    
            </KeyboardAvoidingView>            
  
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