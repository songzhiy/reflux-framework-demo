/**
 * Created by songzhiyang on 2017/4/26.
 */

import React, {Component, PropTypes} from 'react';
import {
    View, Text,
} from 'react-native';
import {styles as StyleContainer} from "../styles/StyleContainer";

export default class LifeSuggestionItemText extends Component {
    render() {
        return (
            <View>
                <Text style={[{marginTop: 15}, StyleContainer.whiteFont]}>{this.props.name}
                    : {this.props.suggestion}</Text>
            </View>
        );
    }
}

LifeSuggestionItemText.propTypes = {
    name: PropTypes.string,
    suggestion: PropTypes.string,
};