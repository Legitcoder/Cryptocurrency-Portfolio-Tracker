import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getHistoricalBTCPrices } from '../actions';
import { VictoryCandlestick, VictoryAxis, VictoryChart, VictoryTheme } from 'victory-native';

class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = { allBtcPrices: [] }
    }

    componentDidMount(){
        const { getHistoricalBTCPrices } = this.props;
        const { coin } = this.props.holding;
        getHistoricalBTCPrices(coin.Symbol);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const { allBtcPrices } = nextProps;
        this.setState(({ allBtcPrices: allBtcPrices}))
    }

    render() {
        const { allBtcPrices } = this.state;
        const { CoinName, Symbol } = this.props.holding.coin;
        const { currentUSDPrice } = this.props.holding;
        console.log(currentUSDPrice);
        if(allBtcPrices.length !== 0) {
            return(
                <View style={styles.container}>
                <View>
                    <Text style={styles.symbolTextSyles}>{Symbol}  ${currentUSDPrice}</Text>
                </View>    
                    <View style={styles.candleStickContainer}>
                    <VictoryChart
                    width={350}
                    height={400}
                        domainPadding={{ x: 5 }}
                        scale={{ x: "time" }}
                        style={{marginLeft: 20}}
                    >
                    <VictoryAxis tickFormat={(t) => `${t.getMonth() + 1}/${t.getFullYear().toString().substr(-2)}`} 
                                style={{ 
                                    tickLabels: {fill: '#000', padding: 5},
                                    axis: {stroke: '#000'} 
                                    }}/>
                    <VictoryAxis dependentAxis 
                                style={{
                                    tickLabels: {fill: '#000', padding: 5},
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
        return <ActivityIndicator style={{flex: 1}} size="large" color="#fff" />; 
    }
}

const mapStateToProps = (state) => {
    return {
        allBtcPrices: state.coins.allBtcPrices,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 0.5
    },
    candleStickContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 3,
        margin: 10,
        backgroundColor: '#fff'
    },
    symbolTextSyles: {
        fontSize: 30,
        color: "#fff",
        fontWeight: 'bold'
    }
  });


export default connect(mapStateToProps, { getHistoricalBTCPrices })(StockChart);