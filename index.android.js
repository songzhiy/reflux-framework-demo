/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
} from 'react-native';

import codePush from 'react-native-code-push'
import CommonNavigator from "./react_native/android_view/CommonNavigator.android";
import WeatherDetailContainer from "./react_native/common_view/WeatherDetailContainer";
import UIUtils from "./react_native/framework/utils/UIUtils";

export default class HelloWorld extends Component {

    componentDidMount() {
        UIUtils.showToast('准备下载');
        codePush.sync();
    }

    render() {
        return (
            <CommonNavigator />
        );
    }
}

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
AppRegistry.registerComponent('WeatherDetailContainer', () => WeatherDetailContainer);
