/**
 * Created by songzhiyang on 2017/4/25.
 */

import React, {Component} from "react";
import ChooseCity from "./ChooseCity";
import ChooseListView from "./ChooseListView";
import LoadDataStore from "../store/LoadDataStore";

export default class ChooseProvince extends Component {

    constructor(props) {
        super(props);
        this.jump2City = this.jump2City.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onDataChange = this._onDataChange.bind(this);
    }

    componentWillMount() {
        LoadDataStore.registUpdateViewCallBack(this._onDataChange);
    }

    componentWillUnmount() {
        LoadDataStore.unregistUpdateViewCallBack(this._onDataChange);
    }

    _onDataChange(data) {
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