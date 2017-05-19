/**
 * Created by songzhiyang on 2017/4/25.
 */

import React, {Component} from "react";
import ChooseCountry from "./ChooseCountry";
import ChooseListView from "./ChooseListView";
import LoadDataStore from "../store/LoadDataStore";
import BaseView from "../framework/view/BaseView";

export default class ChooseCity extends BaseView {

    constructor(props) {
        super(props);
        this.setStore(LoadDataStore);
        this.jump2Country = this.jump2Country.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onDataChange = this._onDataChange.bind(this);
    }

    jump2Country(rowData) {
        this.props.navigator.push({
            component:ChooseCountry,
            passParams:{
                rowData:rowData,
            },
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unregistCallback('loadCity');
    }

    componentWillMount() {
        super.componentWillMount();
        this.registCallback('loadCity',this._onDataChange);
    }

    _onDataChange(data) {
        console.log('chooseCity');
        this.refs.listView.updateData(data.cityData);
    }

    fetchData() {
        LoadDataStore.loadDataAction.loadCity(this.props.rowData);
    }

    render() {
        return(
            <ChooseListView ref="listView" title={"请选择城市"} jumpPage={this.jump2Country} fetchData={this.fetchData} data={[]}/>
        )
    }
}