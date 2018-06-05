import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, ScrollView, StyleSheet, Image, RefreshControl, FlatList } from 'react-native';
import Holding from './Holding';
import AddButton from '../common/AddButton';
import { getCoinUSDPrice } from '../actions';



class HoldingList extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing: false };
    }

    renderaddButton() {
        const { navigation } = this.props;
        return(
            <View style={styles.addButtonViewStyles}>
                <AddButton activeOpacity={0.7} propsButtonStyle={{opacity: 0.7, margin: 8, marginRight: 25 }} onPress={() => navigation.navigate('addtoporfolio')}/>  
            </View>    
        );
    }

    _onRefresh = () => {
        // this.setState({ refreshing: true }, () => this.setState({ refreshing: false }))
    }

    _renderItem = ({ item }) => <Holding holding={item} />

    render() {
        const {holdings, navigation} = this.props;
        return(
         <View style={styles.container}> 
            {this.renderaddButton()}
            <FlatList
            data={holdings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh()}
                    />
                }
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    addButtonViewStyles: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
})


export default connect(null, { getCoinUSDPrice })(HoldingList);