/**
 * Created by songzhiyang on 2017/5/18.
 */

import BaseStore from "../framework/store/BaseStore";
import SyncAction from "../framework/action/SyncAction";
import AsyncAction from "../framework/action/AsyncAction";
import ServerFetchUtils from "../model/api/ServerFetchUtils";
import ServerApi from "../model/api/ServerApi";
import AsyncStoreUtils from "../utils/AsyncStoreUtils";
import Constants from "../utils/Constants";
import ForecastBean from "../model/bean/ForecastBean";

class WheatherDetailStore extends BaseStore {
    actions = this.createActions([
        {
            openDrawer: new SyncAction(),
        },
        {
            loadBackgroundImage: Object.assign(new AsyncAction(), {
                preEmit: function () {
                    ServerFetchUtils.fetchData(ServerApi.backgroundImage).then(this.completed).catch(this.failed);
                }
            })
        },
        {
            loadCurrentCountry:Object.assign(new AsyncAction(),{
                preEmit:function () {
                    AsyncStoreUtils.getItem(Constants.CURRENT_COUNTRY_NAME).then(this.completed).catch(this.failed);
                }
            })
        },
        {
            loadWheatherDetailData:Object.assign(new AsyncAction(),{
                preEmit:function () {
                    AsyncStoreUtils.getItem(Constants.CURRENT_WEATHER_ID).then((whetherId) => {
                        ServerFetchUtils.fetchJsonData(ServerApi.getWeatherDetailData(whetherId)).then(this.completed).catch(this.failed);
                    }).catch((erroro) => console.log(error.message));
                }
            })
        }
    ]);

    constructor() {
        super();
        this.state = {
            drawerOpening: false,
            backgroundImagePath:'',
            currentCountyName:'',
            updateTime: ' ',
            nowTemperature: ' ',
            nowCondText: ' ',
            forecast: [new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean(), new ForecastBean()],
            aqiCount: ' ',
            pm25Count: ' ',
            comfTxt: ' ',
            carWashTxt: ' ',
            sportTxt: ' ',
            isRefreshing: false,
        }
    }

    onOpenDrawer() {
        this.setState({
            ...this.state,
            drawerOpening: true,
        });
    }

    onLoadBackgroundImageCompleted(path) {
        this.setState({
            ...this.state,
            drawerOpening: false,
            backgroundImagePath:path,
        });
    }

    onLoadCurrentCountryCompleted(data) {
        this.setState({
            ...this.state,
            drawerOpening: false,
            currentCountyName:data,
        });
    }

    onLoadWheatherDetailDataCompleted(data) {
        let heWeather = data.HeWeather;
        let detailData = heWeather[0];
        let basic = detailData.basic;
        let forecast = detailData.daily_forecast;
        let suggestion = detailData.suggestion;
        let now = detailData.now;
        let aqi = detailData.aqi;
        this.setState({
            ...this.state,
            drawerOpening: false,
            updateTime: basic.update.loc.substring(11),
            nowTemperature: now.tmp + '℃',
            nowCondText: now.cond.txt,
            forecast: forecast,
            aqiCount: aqi === undefined ? '暂无数据' : aqi.city.aqi,
            pm25Count: aqi === undefined ? '暂无数据' : aqi.city.pm25,
            comfTxt: suggestion.comf.txt,
            carWashTxt: suggestion.cw.txt,
            sportTxt: suggestion.sport.txt,
            isRefreshing: false,
        });
    }
}

export default wheatherDetailStore = new WheatherDetailStore();