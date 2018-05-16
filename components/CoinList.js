import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


class CoinList extends Component {
    render() {

        const { coins, onPress } = this.props;
        console.log(height);
        const height = Dimensions.get('window').height;
        return(
            //Keyboard and Scrolling through the List aren't playing well together even with KeyboardAvoidingView
            <List styles={styles.container}>
                <KeyboardAwareScrollView>
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
                </KeyboardAwareScrollView>   
            </List>      
        );
    }
}

const styles = StyleSheet.create({
    listItemStyles: {
    },
    container: {
    },
  });


export default CoinList;