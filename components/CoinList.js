import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Platform, Keyboard, Dimensions, Animated } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


class CoinList extends Component {

    constructor(props) {
        super(props);

        let LIST_HEIGHT = 100;
        this.keyboardHeight = new Animated.Value(0);
        this.listHeight = new Animated.Value(LIST_HEIGHT)
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }

      _keyboardDidShow = (event) => {
          console.log(event);
        Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.height,
          }),
          Animated.timing(this.listHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.screenY - 100,
          }),
        ]).start();
      };
    
      _keyboardDidHide = (event) => {
        Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: 0,
          }),
          Animated.timing(this.listHeight, {
            duration: event.duration,
            toValue: 100,
          }),
        ]).start();
      };


    render() {
        const { coins, onPress } = this.props;
        return(
            //Keyboard and Scrolling through the List aren't playing well together even with KeyboardAvoidingView
            <Animated.View style={[styles.listContainer, {height: this.listHeight}]}>
            <List  keyboardShouldPersistTaps='handled'>
                {/* <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'> */}
                    <FlatList keyboardShouldPersistTaps='handled'
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
                {/* </KeyboardAwareScrollView>     */}
            </List>
            </Animated.View>      
        );
    }
}

const styles = StyleSheet.create({
    listItemStyles: {
        backgroundColor: "#fff"
    },
    container: {
        flex: 1
    },
    listContainer: {

    }
  });


export default CoinList;