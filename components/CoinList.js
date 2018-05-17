import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CryptoCompareApi from 'cryptocompare';
import { BASE_URL } from '../App';
import { getCoinHash } from '../actions';

//<ActivityIndicator style={{flex: 1}} size="large" color="#fff" />; 

class CoinList extends Component {
    constructor(props){
        super(props);
        this.state = {coinHash : null } 
    }

    componentWillMount() {
        this.props.getCoinHash();
        const {coinHash} = this.props;
        console.log(coinHash);
        if(coinHash) this.setState({coinHash: coinHash});
    }

    componentWillUpdate() {
        const {coinHash} = this.props;
        console.log(coinHash);
        if(coinHash) this.setState({coinHash: coinHash});
    }

    renderList() {
        const { coinHash, coins, onPress } = this.props;
        if(!this.state.coinHash) {return <Text style={styles.textStyles}>Search for Cryptocurrencies</Text>}
        else if(this.state.coinHash){
        return(
                //Keyboard and Scrolling through the List aren't playing well together even with KeyboardAvoidingView
                <List style={{flex: 1}}  keyboardShouldPersistTaps='handled'>

                        <FlatList style={{flex: 1}} keyboardShouldPersistTaps='handled'
                            data={coins}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => {
                                return <ListItem 
                                            onPress={() => onPress(item)}
                                            avatar={{ uri: this.state.coinHash[item.symbol] ? `${BASE_URL}${this.state.coinHash[item.symbol].ImageUrl}` :
                                                           `${BASE_URL}${this.state.coinHash['BTC'].ImageUrl}` }}
                                            key={item.coinName} 
                                            title={item.coinName} 
                                            subtitle={item.symbol} 
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
        
        return <View>{this.renderList()}</View>
    }
}

const mapStateToProps = (state) => {
    return {coinHash: state.coins.coinHash }
}

const styles = StyleSheet.create({
    textStyles: {
        flex: 1, 
        color: '#fff',
        fontSize: 20
    },
    listItemStyles: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
  });


export default connect(mapStateToProps, { getCoinHash })(CoinList);