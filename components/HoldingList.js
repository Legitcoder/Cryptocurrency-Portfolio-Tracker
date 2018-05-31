import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import Holding from './Holding';
import AddButton from '../common/AddButton';



class HoldingList extends Component {
    renderaddButton() {
        const { navigation } = this.props;
        return(
            <View style={styles.addButtonViewStyles}>
                <AddButton propsButtonStyle={{opacity: 0.5, margin: 8, marginRight: 25 }} onPress={() => navigation.navigate('addtoporfolio')}/>  
            </View>    
        );
    }

    render() {
        const {holdings, navigation} = this.props;
        return(
         <View style={styles.container}> 
            {this.renderaddButton()}
            <ScrollView contentContainerStyle={styles.container}>
                <Holding holdings={holdings} />
                <Holding holdings={holdings}/>
                <Holding holdings={holdings}/>
                <Holding holdings={holdings}/>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    addButtonViewStyles: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    }
})


export default HoldingList;