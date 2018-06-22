import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { getHistoricalBTCPrices } from '../actions';
import { VictoryCandlestick, VictoryAxis, VictoryChart, VictoryTheme } from 'victory-native';

class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = { allBtcPrices: [], refreshing: false }
    }

    componentDidMount(){
        console.log("StockChart mounted!")
        console.log(this.props);
        const { getHistoricalBTCPrices } = this.props;
        const { coin } = this.props.holding;
        getHistoricalBTCPrices(coin.Symbol);
    }

    componentDidUpdate() {
        console.log("It's upating", this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log("It's receiving Props");
        const { allBtcPrices } = nextProps;
        this.setState(({ allBtcPrices: allBtcPrices}))
    }

    // _onRefresh = () => {
    //     const { getHistoricalBTCPrices } = this.props;
    //     const { coin } = this.props.holding;
    //     this.setState({refreshing: true}, () => getHistoricalBTCPrices(coin.Symbol));
    //     this.setState({refreshing: false});
    // }


    render() {
        const { holding } = this.props;
        const { allBtcPrices } = this.state;
        if(!holding && allBtcPrices.length === 0)return <ActivityIndicator style={{flex: 1}} size="large" color="#fff" />; 
            const { CoinName, Symbol } = this.props.holding.coin;
            const { currentUSDPrice } = this.props.holding;
            return(
                <View style={styles.container}>
                <View style={styles.titleViewContainer}>
                    <Text style={styles.symbolTextSyles}>{Symbol}  ${currentUSDPrice.toFixed(2)}</Text>
                </View>    
                    <View style={styles.candleStickContainer}>
                    <VictoryChart
                        // refreshControl={
                        //     <RefreshControl 
                        //         refreshing={this.state.refreshing}
                        //         onRefresh={() => this._onRefresh()}
                        //     />}
                        width={350}
                        height={350}
                        domainPadding={{ x: 5 }}
                        scale={{ x: "time" }}
                        style={{marginLeft: 20}}
                    >
                    <VictoryAxis tickFormat={(t) => `${t.getMonth() + 1}/${t.getFullYear().toString().substr(-2)}`} 
                                style={{ 
                                    tickLabels: {fill: '#000', padding: 5, fontSize: 10},
                                    axis: {stroke: '#000'} 
                                    }}/>
                    <VictoryAxis dependentAxis 
                                style={{
                                    tickLabels: {fill: '#000', padding: 5, fontSize: 12},
                                    axis: {stroke: '#000'}
                                    }}/>
                        <VictoryCandlestick
                            candleColors={{ positive: "green", negative: "#c43a31" }}
                            //Bug on CryptoCompare Api where the first few data objects are off in open, close prices
                            data={allBtcPrices.slice(5)}
                        />
                    </VictoryChart>    
                    </View>   
                </View>    
            );
        }
    }


const mapStateToProps = (state) => {
    console.log(state);
    return {
        allBtcPrices: state.coins.allBtcPrices,
        holding: state.holdings.holding,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    candleStickContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 3,
        backgroundColor: '#5f6c7a'
    },
    symbolTextSyles: {
        fontSize: 30,
        color: "#fff",
        fontWeight: 'bold',
        padding: 20
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
  });


export default connect(mapStateToProps, { getHistoricalBTCPrices })(StockChart);