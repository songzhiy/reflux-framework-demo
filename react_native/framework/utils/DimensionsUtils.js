/**
 * Created by songzhiyang on 2017/4/19.
 */

import {
    Dimensions
} from 'react-native';

class WindowOptions {
    width = 0;
    height = 0;
}

/**
 * 该Utils是获取设备默认的Dimensions，并没有乘以pixelRatio
 * 即该Utils获取的为基准宽高 并没有乘以像素密度
 */
export default class DimensionsUtils {

    /**
     * 获取设备的宽 通常为360 当乘以像素密度后 才是通常说的 1080/720
     */
    static getWindowWidth() {
        let windowOptions = Dimensions.get('window');
        return windowOptions.width;
    }

    /**
     * 获取设备的高 通常为640 当乘以像素密度后 才是通常说的 1920/1280
     */
    static getWindowHeight() {
        let windowOptions = Dimensions.get('window');
        return windowOptions.height;
    }

    /**
     * 获取设备的宽高属性 通常为640 * 480 当乘以像素密度后 才是1920 * 1080（pixelRatio = 3） 1280 * 720 (pixelRatio = 2)
     * @returns {Object}
     */
    static getWindownOptions() {
        let windowOptions = Dimensions.get('window');
        return windowOptions;
    }
}