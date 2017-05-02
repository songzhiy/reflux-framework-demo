/**
 * Created by songzhiyang on 2017/4/26.
 */

import React, {Component, PropTypes} from 'react';
import {
    View, Text,
} from 'react-native';
import {styles as StyleContainer} from "../styles/StyleContainer";

export default class ForecastItemText extends Component {
    render() {
        return (
            <View style={[StyleContainer.forecastItemTextStyle]}>
                <Text style={[StyleContainer.font14, StyleContainer.whiteFont]}>{this.props.date}</Text>
                <Text style={[StyleContainer.font14, StyleContainer.whiteFont, {
                    flexGrow: 4,
                    textAlign: 'center',
                }]}>{this.props.weather}</Text>
                <Text style={[StyleContainer.font14, StyleContainer.whiteFont, {
                    width:40,
                    textAlign: 'center',
                }]}>{this.props.highTemperature}</Text>
                <Text
                    style={[StyleContainer.font14, StyleContainer.whiteFont, {textAlign: 'right', width:30}]}>{this.props.lowTemperatrue}</Text>
            </View>
        );
    }
}

ForecastItemText.propTypes = {
    date: PropTypes.string,
    weather: PropTypes.string,
    highTemperature: PropTypes.string,
    lowTemperatrue: PropTypes.string,
};