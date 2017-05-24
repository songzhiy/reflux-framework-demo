/**
 * Created by songzhiyang on 2017/4/28.
 */

import ServerFetch from "../framework/net/fetchNet/ServerFetch";
import ServerFetchUtils from "../framework/net/ajaxNet/ServerFetchUtils";
import ServerApi from "../model/api/ServerApi";


export default class LoadDataUsecase {
    static async loadProvinceData() {
        let response = await ServerFetch.fetchGetData(ServerApi.chinaProvinces);
        return response;
    }

    static loadProvinceDataByCallback() {
        return new Promise(function (resolve,reject) {
            ServerFetchUtils.fetchGetData(ServerApi.chinaProvinces,function (response) {
                console.log(response);
                resolve(response);
            },function (error) {
                console.log(error);
                reject(error);
            });
        });
    }

    static async loadCitiesData(rowData) {
        let response = await ServerFetch.fetchGetData(ServerApi.getCities(rowData.id));
        return response;
    }

    static async loadCountriesData(rowData) {
        let response = await ServerFetch.fetchGetData(ServerApi.getCountries(rowData.id));
        return response;
    }
}