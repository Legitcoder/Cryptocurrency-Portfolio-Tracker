import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { getHistoricalBTCPrices, getUSDCoinInfo } from '../actions';
import { VictoryCandlestick, VictoryAxis, VictoryChart, VictoryTheme } from 'victory-native';

class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing: false }
    }

    componentDidMount(){
        const { getHistoricalBTCPrices, getUSDCoinInfo } = this.props;
        const { coin } = this.props.holding;
        getHistoricalBTCPrices(coin.Symbol);
        getUSDCoinInfo(coin.Symbol);
    }

    _onRefresh = () => {
        const { getHistoricalBTCPrices } = this.props;
        const { coin } = this.props.holding;
        this.setState({refreshing: true}, () => getHistoricalBTCPrices(coin.Symbol));
        this.setState({refreshing: false});
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    //Modularize as own component in the future. Call it CoinStats and import it 
    // to CoinInfo Component and place under StockChart
    renderCoinStats = () => {
        const { MKTCAP, VOLUME24HOUR, SUPPLY, HIGH24HOUR, LOW24HOUR } = this.props.priceInfo;
        const { Symbol } = this.props.holding.coin;
        return(
            <View style={styles.coinStatsContainer}>
                <View style={styles.coinStatsInnerContainer}>
                    <View style={styles.leftSideContainer}>
                        <Text style={styles.coinStatsTitleTextStyles}>Market Cap</Text>
                        <Text style={styles.coinStatsTextStyles}>${this.numberWithCommas(MKTCAP.toFixed(0))}</Text>
                        <Text style={[styles.coinStatsTitleTextStyles, {marginTop: 10}]}>High(24HR)</Text>
                        <Text style={[styles.coinStatsTextStyles]}>${HIGH24HOUR.toFixed(2)}</Text>
                    </View>
                    <View style={styles.rightSideContainer}>
                        <Text style={styles.coinStatsTitleTextStyles}>Supply</Text>
                        <Text style={styles.coinStatsTextStyles}>{this.numberWithCommas(SUPPLY.toFixed(0))} {Symbol}</Text>
                        <Text style={[styles.coinStatsTitleTextStyles, {marginTop: 10}]}>LOW(24HR)</Text>
                        <Text style={[styles.coinStatsTextStyles]}>${LOW24HOUR.toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        );
    }



    render() {
        const { holding, allBtcPrices, priceInfo } = this.props;
        if(!holding || !allBtcPrices || !priceInfo)return <ActivityIndicator style={{flex: 1}} size="large" color="#fff" />; 
            const { CoinName, Symbol } = this.props.holding.coin;
            const { currentUSDPrice } = this.props.holding;
            return(
                <ScrollView contentContainerStyle={styles.container}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                        />
                    }
                >
                <View style={styles.titleViewContainer}>
                    <Text style={styles.symbolTextSyles}>{Symbol}  ${currentUSDPrice.toFixed(2)}</Text>
                </View>    
                    <View style={styles.candleStickContainer}> 
                    <VictoryChart
                        domainPadding={{ x: 5 }}
                        scale={{ x: "time" }}
                        style={{flex: 1}}
                        width={350}
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
                            animate={{
                                duration: 200,
                                onLoad: { duration: 1000 }
                              }}
                        />
                    </VictoryChart>    
                    </View>  
                    {this.renderCoinStats()}   
                </ScrollView> 
            );
        }
    }


const mapStateToProps = (state) => {
    return {
        allBtcPrices: state.coins.allBtcPrices,
        holding: state.holdings.holding,
        priceInfo: state.coins.priceInfo,
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#202428',
    },
    candleStickContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 3,
        backgroundColor: '#5f6c7a',
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
    },
    coinStatsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15

    },
    coinStatsInnerContainer: {
        backgroundColor: '#2b3136',
        flexDirection: 'row',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    coinStatsTextStyles: {
        fontSize: 15,
        color: '#fff',
        margin: 5
    },
    coinStatsTitleTextStyles: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    leftSideContainer: {
        flex: 1,
        //backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightSideContainer: {
        flex: 1,
        //backgroundColor: 'orangered',
        justifyContent: 'center', 
        alignItems: 'center',
    }
  });


export default connect(mapStateToProps, { getHistoricalBTCPrices, getUSDCoinInfo })(StockChart);