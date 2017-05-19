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
            currentActionName:'openDrawer',
            drawerOpening: true,
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
            currentActionName:'loadAllDetailData',
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