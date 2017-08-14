/**
 * Created by songzhiyang on 2017/5/16.
 */

import LoadDataUsecase from "../usecase/LoadDataUsecase";
import BaseStore from "../framework/store/BaseStore";
import AsyncAction from "../framework/action/AsyncAction";

class LoadDataStore extends BaseStore {

    loadDataAction = this.createActions([{//总actionName:loadDataAction
        loadProvince: Object.assign(new AsyncAction(), {//子actionName:loadProvince
            preEmit: function (rowData) {
                LoadDataUsecase.loadProvinceDataByCallback().then(this.completed).catch(this.failed);
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
        loadCity: Object.assign(new AsyncAction(), {//子actionName:loadCity
            preEmit: function (rowData) {
                LoadDataUsecase.loadCitiesData(rowData).then(this.completed).catch(this.failed);
            }
        })
    }, {
        loadCountry: Object.assign(new AsyncAction(), {//子actionName:loadCountry
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
            currentActionName:'loadProvince',
            provinceData: data,
        });
    }

    onLoadProvinceFailed(error) {
        console.log('onLoadProvinceFailed -- ' + error);
    }

    onLoadCityCompleted(data) {
        this.setState({
            ...this.state,
            currentActionName:'loadCity',
            cityData: data,
        });
    }

    onLoadCityFailed(error) {
        console.log('onLoadCityFailed -- ' + error);
    }

    onLoadCountryCompleted(data) {
        this.setState({
            ...this.state,
            currentActionName:'loadCountry',
            countryData: data,
        });
    }

    onLoadCountryFailed(error) {
        console.log('onLoadCountryFailed -- ' + error);
    }
}

export default loadDataStore = new LoadDataStore();