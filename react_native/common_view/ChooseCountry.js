/**
 * Created by songzhiyang on 2017/4/25.
 */

import React,{Component} from 'react';
import {
    ToastAndroid
} from 'react-native';
import AsyncStoreUtils from "../utils/AsyncStoreUtils";
import Constants from "../utils/Constants";
import StartNewPage from "../rn_native/StartNewPage.android";
import ServerFetchUtils from "../model/api/ServerFetchUtils";
import ServerApi from "../model/api/ServerApi";
import ChooseListView from "./ChooseListView";
import ListViewAction from "../action/ListViewAction";
import ListDataStore from "../store/ListDataStore";

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

    componentWillUnmount() {
        ListDataStore.getListDataStore().removeOnCountryChangeListener(this._onDataChange);
    }

    async fetchData() {
        ListDataStore.getListDataStore().addOnCountryChangeListener(this._onDataChange);
        let response = ListViewAction.action_load_data_countries(this.props.rowData);
    }

    _onDataChange() {
        let data = ListDataStore.getListDataStore().getAll();
        this.refs.listView.updateData(data);
    }

    render() {
        return(
            <ChooseListView ref="listView" title={"请选择区县"} rowData={this.props.rowData} jumpPage={this.jump2WeatherDetailActivity} fetchData={this.fetchData} data={[]}/>
        )
    }
}