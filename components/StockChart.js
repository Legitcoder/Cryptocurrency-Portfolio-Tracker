import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getHistoricalBTCPrices } from '../actions';
import { VictoryCandlestick } from 'victory-native';

class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = { allBtcPrices: [] }
    }

    componentDidMount(){
        const { getHistoricalBTCPrices, coin } = this.props;
        getHistoricalBTCPrices(coin.Symbol);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const { allBtcPrices } = nextProps;
        this.setState(({ allBtcPrices: allBtcPrices}))
    }

    render() {
        const { allBtcPrices } = this.state;
        console.log(allBtcPrices);
        if(allBtcPrices.length !== 0) {
            return(
                <View style={styles.container}>
                   <VictoryCandlestick
                    candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                    data={allBtcPrices.slice(10,-1)}
                   />
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
      alignItems: 'center'
    },
  });


export default connect(mapStateToProps, { getHistoricalBTCPrices })(StockChart);