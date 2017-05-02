/**
 * Created by songzhiyang on 2017/4/28.
 */

import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";
import LoadDataUsecase from "../usecase/LoadDataUsecase";
import ListDataStore from "../store/ListDataStore";

const Dispatcher = require('flux').Dispatcher;

export default class AppDispatcher {

    static dispatcher = null;

    static getDispatcher() {
        if (this.dispatcher === null) {
            this.dispatcher = new Dispatcher();
        }
        return this.dispatcher;
    }

}

AppDispatcher.getDispatcher().register(
    function (action) {
        switch (action.actionType) {
            case 'loadDataProvince':
                ListDataStore.getListDataStore().loadProvinceData(action.rowData);
                break;
            case 'loadDataCities':
                ListDataStore.getListDataStore().loadCitiesData(action.rowData);
                break;
            case 'loadDataCountries':
                ListDataStore.getListDataStore().loadCountriesData(action.rowData);
                break;
        }
    }
);
