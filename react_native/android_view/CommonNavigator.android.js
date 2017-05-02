/**
 * Created by songzhiyang on 2017/4/25.
 */

import React, {Component} from 'react';
import {
    Navigator, View, Text, BackAndroid
} from 'react-native';
import ChooseProvince from "../common_view/ChooseProvince";

export default class CommonNavigator extends Component {

    constructor(props) {
        super(props);
        this._popNavigator = this._popNavigator.bind(this);
    }

    _renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passParams}/>
    }

    _configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress',this._popNavigator);
    }

    _popNavigator() {
        if (this.refs.navigator.getCurrentRoutes() !== null && this.refs.navigator.getCurrentRoutes().length > 1) {
            this.refs.navigator.pop();
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',this._popNavigator);
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                initialRoute={{component: ChooseProvince}}
                configureScene={(route, routeStack) => this._configureScene(route, routeStack)}
                renderScene={(route, navigator) => this._renderScene(route, navigator)}/>
        );
    }
}