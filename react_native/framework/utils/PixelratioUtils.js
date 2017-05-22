/**
 * Created by songzhiyang on 2017/4/19.
 */

import {
    PixelRatio,
} from 'react-native';

/**
 * 获取当前设备的像素密度
 */
export default class PixelratioUtils {

    // PixelRatio.get() === 1
    // mdpi Android 设备 (160 dpi)
    // PixelRatio.get() === 1.5
    // hdpi Android 设备 (240 dpi)
    // PixelRatio.get() === 2
    // iPhone 4, 4S
    // iPhone 5, 5c, 5s
    // iPhone 6
    // xhdpi Android 设备 (320 dpi)
    // PixelRatio.get() === 3
    // iPhone 6 plus
    // xxhdpi Android 设备 (480 dpi)
    // PixelRatio.get() === 3.5
    // Nexus 6

    /**
     * 获取当前设备的像素密度
     * @returns {*|number}
     */
    static getPixelratio() {
        return PixelRatio.get();
    }

    /**
     * 将dp转换为px
     * @param dp
     * @returns {*|number}
     */
    static dp2px(dp) {
        return PixelRatio.getPixelSizeForLayoutSize(dp);
    }
}