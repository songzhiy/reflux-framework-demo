/**
 * Created by songzhiyang on 2017/5/18.
 */

import BaseStore from "../framework/store/BaseStore";
import SyncAction from "../framework/action/SyncAction";
import AsyncAction from "../framework/action/AsyncAction";
import ForecastBean from "../model/bean/ForecastBean";
import LoadDetailDataUsecase from "../usecase/LoadDetailDataUsecase";

class WheatherDetailStore extends BaseStore {
    actions = this.createActions([
        {
            openDrawer: new SyncAction(),
        },
        {
            loadBackgroundImage: Object.assign(new AsyncAction(), {
                preEmit: function () {
                    LoadDetailDataUsecase.loadBackgroundImage().then(this.completed).catch(this.failed);
                }
            })
        },
        {
            loadCurrentCountry:Object.assign(new AsyncAction(),{
                preEmit:function () {
                    LoadDetailDataUsecase.loadCurrentCounryName().then(this.completed).catch(this.failed);
                }
            })
        },
        {
            loadWheatherDetailData:Object.assign(new AsyncAction(),{
                preEmit:function () {
                    LoadDetailDataUsecase.loadDetailData().then(this.completed).catch(this.failed);
                }
            })
        },
        {
            loadAllDetailData:Object.assign(new AsyncAction(),{
                preEmit:function () {
                    LoadDetailDataUsecase.loadAllDetailData().then(this.completed).catch(this.failed);
                }
            })
        },
    ]);

    constructor() {
        super();
        this.state = {
            drawerOpening: false,
            backgroudImagePath: ' ',
            currentCountryName: ' ',
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
            backgroudImagePath:path,
        });
    }

    onLoadCurrentCountryCompleted(data) {
        this.setState({
            ...this.state,
            drawerOpening: false,
            currentCountryName:data,
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

    onLoadAllDetailDataCompleted(alldetailData) {
        let data = alldetailData.detailData;
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
            backgroudImagePath:alldetailData.backgroundImageUrl,
            currentCountryName:alldetailData.crrentCountryName,
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