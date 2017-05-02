/**
 * Created by songzhiyang on 2017/4/26.
 */

import React, {Component, PropTypes} from 'react';
import {
    View, Text,
} from 'react-native';
import {styles as StyleContainer} from "../styles/StyleContainer";

export default class AirQualityItemText extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', flexGrow: 1}}>
                <Text style={[{
                    fontSize: 30,
                    paddingTop: 15,
                    paddingBottom: 15
                }, StyleContainer.whiteFont]}>{this.props.count}</Text>
                <Text style={[StyleContainer.font14, StyleContainer.whiteFont]}>{this.props.name}</Text>
            </View>
        );
    }
}

AirQualityItemText.propTypes = {
    name: PropTypes.string,
    count: PropTypes.string,
};