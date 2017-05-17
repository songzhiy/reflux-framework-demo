/**
 * Created by songzhiyang on 2017/4/25.
 */

import React, {Component} from "react";
import {ToastAndroid} from "react-native";
import AsyncStoreUtils from "../utils/AsyncStoreUtils";
import Constants from "../utils/Constants";
import StartNewPage from "../rn_native/StartNewPage.android";
import ChooseListView from "./ChooseListView";
import LoadDataStore from "../store/LoadDataStore";

export default class ChooseCountry extends Component {

    constructor(props) {
        super(props);
        this.jump2WeatherDetailActivity = this.jump2WeatherDetailActivity.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onDataChange = this._onDataChange.bind(this);
    }

    jump2WeatherDetailActivity(rowData) {
        ToastAndroid.show(rowData.name + ' -- ' + rowData.id + ' -- ' + rowData.weather_id,ToastAndroid.SHORT);
        AsyncStoreUtils.setItem(Constants.CURRENT_COUNTRY_ID,rowData.id.toString()).done();
        AsyncStoreUtils.setItem(Constants.CURRENT_WEATHER_ID,rowData.weather_id.toString()).done();
        AsyncStoreUtils.setItem(Constants.CURRENT_COUNTRY_NAME,rowData.name).done();
        StartNewPage.startNewPage('szy.com.hotrntest.WeatherDetailActivity');
    }

    componentWillMount() {
        LoadDataStore.registUpdateViewCallBack(this._onDataChange);
    }

    componentWillUnmount() {
        LoadDataStore.unregistUpdateViewCallBack(this._onDataChange);
    }

    fetchData() {
        LoadDataStore.loadDataAction.loadCountry(this.props.rowData);
    }

    _onDataChange(data) {
        this.refs.listView.updateData(data.countryData);
    }

    render() {
        return(
            <ChooseListView ref="listView" title={"请选择区县"} rowData={this.props.rowData} jumpPage={this.jump2WeatherDetailActivity} fetchData={this.fetchData} data={[]}/>
        )
    }
}