import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions , Image} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import CoinInfo from '../components/CoinInfo';
import Transactions from '../components/Transactions';

const GeneralScreen = () => (
    <CoinInfo />
  );
const TransactionsScreen = () => (
    <Transactions />
  );

class ManageCoinScreen extends Component {
    static navigationOptions = ({ navigation }) => {
    const { coin, refresh } = navigation.state.params;

    refreshAndNavigate = () => {
        refresh();
        navigation.navigate('portfolio');        
    }

    renderTitle = () => {
        return(
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
            <Image style={{width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain'}}  source={{ uri: coin.ImageUrl }}/>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 20}}>  {coin.CoinName}</Text>
            </View> 
        );
    } 
        return {
            title: renderTitle(),
            headerLeft: <Feather name="arrow-left" size={25} color='#fff' onPress={() => refreshAndNavigate() } />,
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0,
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = { index: 0, routes: [ {key: 'general', title: 'General'}, {key: 'transactions', title: "Transactions"} ]}
    }

    render() {
        return(
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    general: GeneralScreen,
                    transactions: TransactionsScreen
                })}
                onIndexChange={index => this.setState({ index: index })}
                initialLayout={{width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            />
        );
    }
 }


 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#202428',
         justifyContent: 'flex-start'
     }
 })


 export default ManageCoinScreen;