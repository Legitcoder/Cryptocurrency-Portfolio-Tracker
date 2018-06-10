import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Holding from './Holding';
import AddButton from '../common/AddButton';
import { updateCoinsCurrentUsdPrices } from '../actions';

class HoldingList extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing: false };
    }

    componentDidMount() {
        const { updateCoinsCurrentUsdPrices } = this.props;
        updateCoinsCurrentUsdPrices();
    }

    renderaddButton = () => {
        const { navigation } = this.props;
        return(
            <View style={styles.addButtonViewStyles}>
                <AddButton activeOpacity={0.7} propsButtonStyle={{opacity: 0.7, margin: 8, marginRight: 25 }} onPress={() => navigation.navigate('addtoporfolio')}/>  
            </View>    
        );
    }

    _onRefresh = () => {
        const { updateCoinsCurrentUsdPrices } = this.props;
        this.setState({ refreshing: true}, () => updateCoinsCurrentUsdPrices() );
        this.setState({ refreshing: false});
    }

    _renderItem = ({ item }) => {
        const { navigation } = this.props;
        return <Holding holding={item} navigation={navigation} />
    }

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
                        onRefresh={() => this._onRefresh()}
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


export default connect(null,  { updateCoinsCurrentUsdPrices })(HoldingList);