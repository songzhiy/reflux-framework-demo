/**
 * Created by songzhiyang on 2017/4/25.
 */

import React,{Component} from 'react';
import ChooseCountry from "./ChooseCountry";
import ServerFetchUtils from "../model/api/ServerFetchUtils";
import ServerApi from "../model/api/ServerApi";
import ChooseListView from "./ChooseListView";
import ListViewAction from "../action/ListViewAction";
import ListDataStore from "../store/ListDataStore";

export default class ChooseCity extends Component {

    constructor(props) {
        super(props);
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
        ListDataStore.getListDataStore().removeOnCityChangeListener(this._onDataChange);
    }

    _onDataChange() {
        let data = ListDataStore.getListDataStore().getAll();
        this.refs.listView.updateData(data);
    }

    async fetchData() {
        ListDataStore.getListDataStore().addOnCityChangeListener(this._onDataChange);
        let repsonse = await ListViewAction.action_load_data_cities(this.props.rowData);
    }

    render() {
        return(
            <ChooseListView ref="listView" title={"请选择城市"} jumpPage={this.jump2Country} fetchData={this.fetchData} data={[]}/>
        )
    }
}