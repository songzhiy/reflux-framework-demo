/**
 * Created by songzhiyang on 2017/4/28.
 */

import ServerFetchUtils from "../model/api/ServerFetchUtils";
import ServerApi from "../model/api/ServerApi";


export default class LoadDataUsecase {
    static async loadProvinceData(rowData) {
        let response = await ServerFetchUtils.fetchJsonData(ServerApi.chinaProvinces);
        return response;
    }

    static async loadCitiesData(rowData) {
        let response = await ServerFetchUtils.fetchJsonData(ServerApi.getCities(rowData.id));
        return response;
    }

    static async loadCountriesData(rowData) {
        let response = await ServerFetchUtils.fetchJsonData(ServerApi.getCountries(rowData.id));
        return response;
    }
}