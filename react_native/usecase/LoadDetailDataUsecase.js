/**
 * Created by songzhiyang on 2017/5/19.
 */

import ServerFetchUtils from "../framework/net/fetchNet/ServerFetch";
import ServerApi from "../model/api/ServerApi";
import AsyncStoreUtils from "../framework/utils/AsyncStoreUtils";
import Constants from "../utils/Constants";

export default class LoadDetailDataUsecase {

    static async loadBackgroundImage() {
        let url = await ServerFetchUtils.fetchData(ServerApi.backgroundImage);
        return url;
    }

    static async loadCurrentCounryName() {
        let currentCountryName = await AsyncStoreUtils.getItem(Constants.CURRENT_COUNTRY_NAME);
        return currentCountryName;
    }

    static async loadDetailData() {
        let currentCountryId = await AsyncStoreUtils.getItem(Constants.CURRENT_WEATHER_ID);
        let detailData = await ServerFetchUtils.fetchGetData(ServerApi.getWeatherDetailData(currentCountryId))
        return detailData;
    }

    static async loadAllDetailData() {
        let backgroundImageUrl = await LoadDetailDataUsecase.loadBackgroundImage();
        let crrentCountryName = await LoadDetailDataUsecase.loadCurrentCounryName();
        let detailData = await LoadDetailDataUsecase.loadDetailData();
        return {backgroundImageUrl,crrentCountryName,detailData};
    }

}