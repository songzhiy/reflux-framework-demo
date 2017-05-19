/**
 * Created by songzhiyang on 2017/4/25.
 */

import React, {Component} from "react";
import ChooseCity from "./ChooseCity";
import ChooseListView from "./ChooseListView";
import LoadDataStore from "../store/LoadDataStore";
import BaseView from "../framework/view/BaseView";

export default class ChooseProvince extends BaseView {

    constructor(props) {
        super(props);
        this.setStore(LoadDataStore);
        this.jump2City = this.jump2City.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onDataChange = this._onDataChange.bind(this);
    }

    componentWillMount() {
        super.componentWillMount();
        this.registCallback('loadProvince',this._onDataChange);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unregistCallback('loadProvince');
    }

    _onDataChange(data) {
        console.log('chooseProvince');
        this.refs.listView.updateData(data.provinceData);
    }

    fetchData() {
        LoadDataStore.loadDataAction.loadProvince(this.props.rowData);
    }

    jump2City(rowData) {
        this.props.navigator.push({
            component:ChooseCity,
            passParams:{
                rowData:rowData,
            },
        });
    }

    render() {
        return(
            <ChooseListView ref="listView" title={"请选择省份"} jumpPage={this.jump2City} fetchData={this.fetchData} data={[]}/>
        )
    }
}