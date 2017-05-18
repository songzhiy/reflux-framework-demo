/**
 * Created by songzhiyang on 2017/5/16.
 */

import LoadDataUsecase from "../usecase/LoadDataUsecase";
import BaseStore from "../framework/store/BaseStore";
import AsyncAction from "../framework/action/AsyncAction";

class LoadDataStore extends BaseStore {

    loadDataAction = this.createActions([{
        loadProvince: Object.assign(new AsyncAction(), {
            preEmit: function (rowData) {
                LoadDataUsecase.loadProvinceData(rowData).then(this.completed).catch(this.failed);
            },
            //目前这个没有用
            shouldEmit: function (data) {
                if (data === undefined || data === null) {
                    return false;
                }
                return true;
            },
        })
    }, {
        loadCity: Object.assign(new AsyncAction(), {
            preEmit: function (rowData) {
                LoadDataUsecase.loadCitiesData(rowData).then(this.completed).catch(this.failed);
            }
        })
    }, {
        loadCountry: Object.assign(new AsyncAction(), {
            preEmit: function (rowData) {
                LoadDataUsecase.loadCountriesData(rowData).then(this.completed).catch(this.failed);
            }
        })
    }]);

    constructor() {
        super();
        this.state = {
            provinceData: [],
            cityData: [],
            countryData: [],
        };
    }

    onLoadProvinceCompleted(data) {
        this.setState({
            provinceData: data,
        });
    }

    onLoadProvinceFailed(error) {
        console.log('onLoadProvinceFailed -- ' + error.message);
    }

    onLoadCityCompleted(data) {
        this.setState({
            ...this.state,
            cityData: data,
        });
    }

    onLoadCityFailed(error) {
        console.log('onLoadCityFailed -- ' + error.message);
    }

    onLoadCountryCompleted(data) {
        this.setState({
            ...this.state,
            countryData: data,
        });
    }

    onLoadCountryFailed(error) {
        console.log('onLoadCountryFailed -- ' + error.message);
    }
}

export default loadDataStore = new LoadDataStore();