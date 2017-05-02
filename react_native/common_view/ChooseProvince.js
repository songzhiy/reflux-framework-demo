/**
 * Created by songzhiyang on 2017/4/25.
 */

import React,{Component,PropTypes} from 'react';
import {
    View,
} from 'react-native';
import ChooseCity from "./ChooseCity";
import ChooseListView from "./ChooseListView";
import ListViewAction from "../action/ListViewAction";
import ListDataStore from "../store/ListDataStore";

export default class ChooseProvince extends Component {

    constructor(props) {
        super(props);
        this.jump2City = this.jump2City.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onDataChange = this._onDataChange.bind(this);
    }

    componentDidMount() {
        console.log('outer componentDidMount');
    }

    componentWillUnmount() {
        console.log('outer componentWillUnmount');
        ListDataStore.getListDataStore().removeOnProvinceChangeListener(this._onDataChange);
    }

    _onDataChange() {
        let data = ListDataStore.getListDataStore().getAll();
        this.refs.listView.updateData(data);
    }

    fetchData() {
        ListDataStore.getListDataStore().addOnProvinceChangeListener(this._onDataChange);
        ListViewAction.action_load_data_province(this.props.rowData);
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