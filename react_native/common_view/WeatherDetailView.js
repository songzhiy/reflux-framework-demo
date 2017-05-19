/**
 * Created by songzhiyang on 2017/4/26.
 */

import React, {Component} from "react";
import {Image, RefreshControl, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles as StyleContainer} from "../styles/StyleContainer";
import ForecastItemText from "./ForecastItemText";
import AirQualityItemText from "./AirQualityItemText";
import LifeSuggestionItemText from "./LifeSuggestionItemText";
import ForecastBean from "../model/bean/ForecastBean";
import WheatherDetailStore from "../store/WheatherDetailStore";

export default class WeatherDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroudImagePath: ' ',
            currentCountryName: ' ',
            updateTime: ' ',
            nowTemperature: ' ',
            nowCondText: ' ',
            forecast: [new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean()],
            aqiCount: ' ',
            pm25Count: ' ',
            comfTxt: ' ',
            carWashTxt: ' ',
            sportTxt: ' ',
            isRefreshing: false,
        };
        this._updateView = this._updateView.bind(this);
        this._getRefreshControl = this._getRefreshControl.bind(this);
        this._onDrawerOpenPress = this._onDrawerOpenPress.bind(this);
        this._unregistRefluxCallback = this._unregistRefluxCallback.bind(this);
        this._registRefluxCallback = this._registRefluxCallback.bind(this);
    }

    _updateView(data) {
        this.setState(data);
    }

    componentWillUnmount() {
        this._unregistRefluxCallback();
    }

    componentWillMount() {
        this._registRefluxCallback();
        this.setState({
            isRefreshing: true,
        });
        WheatherDetailStore.actions.loadAllDetailData();
    }

    _getRefreshControl() {
        return (
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={()=>WheatherDetailStore.actions.loadWheatherDetailData()}/>
        );
    }

    _onDrawerOpenPress() {
        WheatherDetailStore.actions.openDrawer();
    }

    _unregistRefluxCallback() {
        WheatherDetailStore.unregistUpdateViewCallBack(this._updateView);
    }

    _registRefluxCallback() {
        WheatherDetailStore.registUpdateViewCallBack(this._updateView);
    }

    render() {
        return (
            <ScrollView refreshControl={this._getRefreshControl()}>
                <Image source={{uri: this.state.backgroudImagePath}}>
                    <View style={StyleContainer.weatherDetailHeaderContainer}>
                        <TouchableOpacity onPress={this._onDrawerOpenPress}>
                            <Image source={require('../image/ic_home.png')}
                                   style={{height: 40, width: 40, marginLeft: 5}}
                                   resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <Text style={[StyleContainer.font20, {
                            flexGrow: 8,
                            textAlign: 'center'
                        }, StyleContainer.whiteFont]}>{this.state.currentCountryName}</Text>
                        <Text
                            style={[StyleContainer.font14, {marginRight: 10}, StyleContainer.whiteFont]}>{this.state.updateTime}</Text>
                    </View>
                    <View>
                        <Text
                            style={[StyleContainer.temperatureCount, StyleContainer.whiteFont]}>{this.state.nowTemperature}</Text>
                    </View>
                    <View>
                        <Text style={[StyleContainer.font20, {
                            textAlign: 'right',
                            marginRight: 10
                        }, StyleContainer.whiteFont]}>{this.state.nowCondText}</Text>
                    </View>
                    <View style={[StyleContainer.forecastContainer]}>
                        <Text style={[StyleContainer.font20, StyleContainer.whiteFont]}>预报</Text>
                        <ForecastItemText date={this.state.forecast[0].date} weather={this.state.forecast[0].cond.txt_d}
                                          highTemperature={this.state.forecast[0].tmp.max}
                                          lowTemperatrue={this.state.forecast[0].tmp.min}/>
                        <ForecastItemText date={this.state.forecast[1].date} weather={this.state.forecast[1].cond.txt_d}
                                          highTemperature={this.state.forecast[1].tmp.max}
                                          lowTemperatrue={this.state.forecast[1].tmp.min}/>
                        <ForecastItemText date={this.state.forecast[2].date} weather={this.state.forecast[2].cond.txt_d}
                                          highTemperature={this.state.forecast[2].tmp.max}
                                          lowTemperatrue={this.state.forecast[2].tmp.min}/>
                        <ForecastItemText date={this.state.forecast[3].date} weather={this.state.forecast[3].cond.txt_d}
                                          highTemperature={this.state.forecast[3].tmp.max}
                                          lowTemperatrue={this.state.forecast[3].tmp.min}/>
                        <ForecastItemText date={this.state.forecast[4].date} weather={this.state.forecast[4].cond.txt_d}
                                          highTemperature={this.state.forecast[4].tmp.max}
                                          lowTemperatrue={this.state.forecast[4].tmp.min}/>
                        <ForecastItemText date={this.state.forecast[5].date} weather={this.state.forecast[5].cond.txt_d}
                                          highTemperature={this.state.forecast[5].tmp.max}
                                          lowTemperatrue={this.state.forecast[5].tmp.min}/>
                        <ForecastItemText date={this.state.forecast[6].date} weather={this.state.forecast[6].cond.txt_d}
                                          highTemperature={this.state.forecast[6].tmp.max}
                                          lowTemperatrue={this.state.forecast[6].tmp.min}/>
                    </View>
                    <View style={[StyleContainer.forecastContainer]}>
                        <Text style={[StyleContainer.font20, StyleContainer.whiteFont]}>空气质量</Text>
                        <View style={{flexDirection: 'row'}}>
                            <AirQualityItemText count={this.state.aqiCount} name='AQI指数'/>
                            <AirQualityItemText count={this.state.pm25Count} name='PM2.5指数'/>
                        </View>
                    </View>
                    <View style={[StyleContainer.forecastContainer]}>
                        <Text style={[StyleContainer.font20, StyleContainer.whiteFont]}>生活建议</Text>
                        <LifeSuggestionItemText name="舒适度" suggestion={this.state.comfTxt}/>
                        <LifeSuggestionItemText name="洗车指数" suggestion={this.state.carWashTxt}/>
                        <LifeSuggestionItemText name="运动建议" suggestion={this.state.sportTxt}/>
                    </View>
                </Image>
            </ScrollView>
        )
    }
}