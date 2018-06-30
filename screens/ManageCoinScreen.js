import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions , Image} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import CoinInfo from '../components/CoinInfo';
import Transactions from '../components/Transactions';

class ManageCoinScreen extends Component {
    static navigationOptions = ({ navigation }) => {
    const { holding, refresh } = navigation.state.params;
    let coin;
    holding ? coin  = holding.coin : coin = navigation.state.params.coin;
    refreshAndNavigate = () => {
        refresh();
        navigation.navigate('portfolio');        
    }

    renderTitle = () => {
        return(
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain'}}  source={{ uri: coin.ImageUrl }}/>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 20}}>  {coin.CoinName}</Text>
            </View> 
        );
    } 
        return {
            headerTitle: renderTitle(),
            headerLeft: <Feather name="arrow-left" size={25} color='#fff' onPress={() => refreshAndNavigate() } />,
            headerRight: <View />, //Needed to center for Android
            headerStyle: {
                backgroundColor: '#282E33',
                borderBottomWidth: 0,
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = { index: 0, routes: [ {key: 'general', title: 'General'}, {key: 'transactions', title: "Transactions"} ]}
    }

    render() {
        const { holding } = this.props.navigation.state.params;
        const { navigation, coin } = this.props;
        const GeneralScreen = () => (<CoinInfo />);
        const TransactionsScreen = () => (<Transactions navigation={navigation} />);
        return(
            <TabView
                style={styles.tabViewStyles}
                navigationState={this.state}
                renderScene={SceneMap({
                    general: GeneralScreen,
                    transactions: TransactionsScreen
                })}
                onIndexChange={index => this.setState({ index: index })}
                initialLayout={{width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{backgroundColor: '#282E33',}}
                        indicatorStyle={{backgroundColor: "#fff"}}
                        labelStyle={{fontWeight: 'bold', fontSize: 13}}
                        pressOpacity={1}
                    />
                }
            />
        );
    }
 }

 const styles = StyleSheet.create({
     tabViewStyles: {
         flex: 1,
         backgroundColor: '#202428',
     }
 })


 export default ManageCoinScreen;