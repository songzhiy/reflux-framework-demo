/**
 * Created by songzhiyang on 2017/5/23.
 */

import {
    Vibration,AppState,
} from 'react-native';

/**
 * 提供日常所需的app状态相关的工具类
 */
export default class AppUtils {

    /**
     * 设备震动
     * 需要权限<uses-permission android:name="android.permission.VIBRATE"/>
     * @param time 震动时间
     */
    static vibrateDeviceDefault(time) {
        Vibration.vibrate(time);
    }

    /**
     * 以某种方式震动设备 默认使用vibrateDeviceDefault()方法即可
     * @param pattern 参数为一个不定长的数组。
     * 在Andriod上，数组第一个元素表示开始震动前的等待时间，
     * 然后是震动持续时长和等待时长的交替，
     * 例如[0, 500, 1000, 500]表示立刻开始震动500ms，
     * 然后等待1000ms，再震动500ms；
     * 但在iOS上震动时长是固定的，
     * 所以从数组第二个元素开始都是表示震动的间隔时长
     * @param repeat 参数为布尔类型，表示是否持续循环震动。
     * 为true时只有调用cancel才会停止。
     */
    static vibrateDevice(pattern,repeat) {
        Vibration.vibrate(pattern,repeat);
    }

    /**
     * 循环震动时的关闭方法
     */
    static vibrateDeviceCancel() {
        Vibration.cancel();
    }

    /**
     * 判断当前RN是否在前台
     * @returns {boolean}
     */
    static appIsForeground() {
        let state = AppState.currentState;
        return state === 'active';
    }

    /**
     * 判断当前RN是否在后台
     * @returns {boolean}
     */
    static appIsBackground() {
        let state = AppState.currentState;
        return state === 'background';
    }
}