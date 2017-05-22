/**
 * Created by songzhiyang on 2017/5/22.
 */

import {
    ToastAndroid,
} from 'react-native';
import PixelratioUtils from "./PixelratioUtils";
import DimensionsUtils from "./DimensionsUtils";
export default class UIUtils {

    /**
     * 显示Toast 默认length为Short
     * @param message
     * @param length
     */
    static showToast(message,length = ToastAndroid.SHORT) {
        ToastAndroid.show(message,length);
    }

    /**
     * 获取当前屏幕的宽（pixel）
     * @returns {number}
     */
    static getWindowWidthPixel() {
        let pixelRatio = PixelratioUtils.getPixelratio();
        let width = DimensionsUtils.getWindowWidth();
        return width * pixelRatio;
    }

    /**
     * 获取当前屏幕的高（pixel）
     * @returns {number}
     */
    static getWindowHeightPixel() {
        let pixelRatio = PixelratioUtils.getPixelratio();
        let height = DimensionsUtils.getWindowHeight();
        return height * pixelRatio;
    }

    /**
     * 获取当前屏幕的宽高（pixel）
     * @returns {{width: number, height: number}}
     */
    static getWindowPixel() {
        let windowOptions = DimensionsUtils.getWindownOptions();
        let pixelRatio = PixelratioUtils.getPixelratio();
        let width = windowOptions.width * pixelRatio;
        let height = windowOptions.height * pixelRatio;
        return {
            width,
            height,
        }
    }

}