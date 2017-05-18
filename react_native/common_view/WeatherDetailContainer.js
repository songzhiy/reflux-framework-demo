/**
 * Created by songzhiyang on 2017/4/26.
 */

import React, {Component} from 'react';
import {
    DrawerLayoutAndroid, BackAndroid,
    Text, View,
} from 'react-native';
import WeatherDetailView from "./WeatherDetailView";
import CommonNavigator from "../android_view/CommonNavigator";
import WheatherDetailStore from "../store/WheatherDetailStore";

export default class WeatherDetailContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpening: false,
        };
        this._onPressBackPress = this._onPressBackPress.bind(this);
        this._openDrawer = this._openDrawer.bind(this);
    }

    _onPressBackPress() {
        if (this.state.drawerOpening) {
            this.refs.drawer.closeDrawer();
            return true;
        }
        return false;
    }

    componentWillMount() {
        WheatherDetailStore.registUpdateViewCallBack(this._openDrawer);
        BackAndroid.addEventListener("hardwareBackPress", this._onPressBackPress);
    }

    componentWillUnmount() {
        WheatherDetailStore.unregistUpdateViewCallBack(this._openDrawer);
        BackAndroid.removeEventListener("hardwareBackPress", this._onPressBackPress);
    }

    _onDrawerOpening() {
        this.setState({
            drawerOpening: true,
        });
    }

    _onDrawerClosing() {
        this.setState({
            drawerOpening: false,
        });
    }

    _openDrawer(data) {
        if (data.drawerOpening) {
            this.refs.drawer.openDrawer();
        }
    }

    render() {
        let navigationView = (
            <CommonNavigator/>
        );

        return (
            <DrawerLayoutAndroid ref="drawer" drawerWidth={300} drawerPosition={DrawerLayoutAndroid.positions.Left}
                                 renderNavigationView={() => navigationView}
                                 onDrawerOpen={() => this._onDrawerOpening()}
                                 onDrawerClose={() => this._onDrawerClosing()}>
                <View>
                    <WeatherDetailView ref="weatherDetailView"/>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}