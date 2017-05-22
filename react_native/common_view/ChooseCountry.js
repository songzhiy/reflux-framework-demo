/**
 * Created by songzhiyang on 2017/4/25.
 */

import React, {Component} from "react";
import AsyncStoreUtils from "../framework/utils/AsyncStoreUtils";
import Constants from "../utils/Constants";
import StartNewPage from "../rn_native/StartNewPage.android";
import ChooseListView from "./ChooseListView";
import LoadDataStore from "../store/LoadDataStore";
import BaseView from "../framework/view/BaseView";
import UIUtils from "../framework/utils/UIUtils";

export default class ChooseCountry extends BaseView {

    constructor(props) {
        super(props);
        this.setStore(LoadDataStore);
        this.jump2WeatherDetailActivity = this.jump2WeatherDetailActivity.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onDataChange = this._onDataChange.bind(this);
    }

    jump2WeatherDetailActivity(rowData) {
        UIUtils.showToast(rowData.name + ' -- ' + rowData.id + ' -- ' + rowData.weather_id);
        AsyncStoreUtils.setItem(Constants.CURRENT_COUNTRY_ID,rowData.id.toString()).done();
        AsyncStoreUtils.setItem(Constants.CURRENT_WEATHER_ID,rowData.weather_id.toString()).done();
        AsyncStoreUtils.setItem(Constants.CURRENT_COUNTRY_NAME,rowData.name).done();
        StartNewPage.startNewPage('szy.com.hotrntest.WeatherDetailActivity');
    }

    componentWillMount() {
        super.componentWillMount();
        this.registCallback('loadCountry',this._onDataChange);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unregistCallback('loadCountry');
    }

    fetchData() {
        LoadDataStore.loadDataAction.loadCountry(this.props.rowData);
    }

    _onDataChange(data) {
        console.log('chooseCountry');
        this.refs.listView.updateData(data.countryData);
    }

    render() {
        return(
            <ChooseListView ref="listView" title={"请选择区县"} rowData={this.props.rowData} jumpPage={this.jump2WeatherDetailActivity} fetchData={this.fetchData} data={[]}/>
        )
    }
}