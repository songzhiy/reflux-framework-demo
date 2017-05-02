/**
 * Created by songzhiyang on 2017/4/25.
 */

export default class ServerApi {

    static _currentCities = '';

    static chinaProvinces = "http://guolin.tech/api/china";

    static backgroundImage = "http://guolin.tech/api/bing_pic";

    static getCities(id) {
        ServerApi._currentCities = ServerApi.chinaProvinces + "/" + id;
        return ServerApi.chinaProvinces + "/" + id;
    }

    static getCountries(countryId) {
        return  ServerApi._currentCities + "/" + countryId;
    }

    static getWeatherDetailData(cityId) {
        let url = "http://guolin.tech/api/weather?cityid="+cityId+"&key=bc0418b57b2d4918819d3974ac1285d9";
        return url;
    }
}