/**
 * Created by songzhiyang on 2017/4/26.
 */

import React, {Component, PropTypes} from 'react';
import {
    View, Text, ScrollView, Image, RefreshControl, TouchableOpacity,
} from 'react-native';
import {styles as StyleContainer} from "../styles/StyleContainer";
import ForecastItemText from "./ForecastItemText";
import AirQualityItemText from "./AirQualityItemText";
import LifeSuggestionItemText from "./LifeSuggestionItemText";
import ServerFetchUtils from "../model/api/ServerFetchUtils";
import ServerApi from "../model/api/ServerApi";
import AsyncStoreUtils from "../utils/AsyncStoreUtils";
import Constants from "../utils/Constants";
import ForecastBean from "../model/bean/ForecastBean";

export default class WeatherDetailView extends Component {

    drawer = null;

    constructor(props) {
        super(props);
        this.state = {
            backgroudImagePath: 'http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg',
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
        this._getBackgroundImagePath = this._getBackgroundImagePath.bind(this);
        this._getWetherDetailData = this._getWetherDetailData.bind(this);
        this._getCunrrentCountry = this._getCunrrentCountry.bind(this);
        this._getRefreshControl = this._getRefreshControl.bind(this);
        this._onDrawerOpenPress = this._onDrawerOpenPress.bind(this);
    }

    async _getBackgroundImagePath() {
        let path = await ServerFetchUtils.fetchData(ServerApi.backgroundImage);
        this.setState({
            backgroudImagePath: path,
        });
    }

    async _getWetherDetailData() {
        this.setState({
            isRefreshing: true,
        });
        let weatherId = await AsyncStoreUtils.getItem(Constants.CURRENT_WEATHER_ID);
        let data = await ServerFetchUtils.fetchJsonData(ServerApi.getWeatherDetailData(weatherId));
        let heWeather = data.HeWeather;
        let detailData = heWeather[0];
        let basic = detailData.basic;
        let forecast = detailData.daily_forecast;
        let suggestion = detailData.suggestion;
        let now = detailData.now;
        let aqi = detailData.aqi;
        this.setState({
            updateTime: basic.update.loc.substring(11),
            nowTemperature: now.tmp + '℃',
            nowCondText: now.cond.txt,
            forecast: forecast,
            aqiCount: aqi === undefined ? '暂无数据' : aqi.city.aqi,
            pm25Count: aqi === undefined ? '暂无数据' : aqi.city.pm25,
            comfTxt: suggestion.comf.txt,
            carWashTxt: suggestion.cw.txt,
            sportTxt: suggestion.sport.txt,
            isRefreshing: false,
        });
    }

    async _getCunrrentCountry() {
        let currentCountyName = await AsyncStoreUtils.getItem(Constants.CURRENT_COUNTRY_NAME);
        this.setState({
            currentCountryName: currentCountyName,
        });
    }

    componentWillMount() {
        this._getBackgroundImagePath();
        this._getWetherDetailData().done();
        this._getCunrrentCountry();
    }

    _getRefreshControl() {
        return (
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._getWetherDetailData}/>
        );
    }

    _onDrawerOpenPress() {
        this.drawer.openDrawer();
    }

    setOutterDrawerView(drawer) {
        this.drawer = drawer;
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

WeatherDetailView.propTypes = {
    drawer: PropTypes.object,
};