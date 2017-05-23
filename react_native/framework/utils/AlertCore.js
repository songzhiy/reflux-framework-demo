/**
 * Created by songzhiyang on 2017/5/22.
 */

import {Alert} from 'react-native';

export default class AlertCore {

    /**
     * 弹出一个alert 类似于dialog
     * @param content alert内容
     * @param title alert标题
     * @param buttons 需要显示的按钮（最多三个） 需遵循以下结构
     *
     * class button {
        text = ' ';
        onPress = {};
       }
     */
    static showAlert(title, content, buttons) {
        Alert.alert(title, content, buttons);
    }

    /**
     * 带一个按钮的alert
     * @param content 要提示的内容
     * @param title  要提示的title
     * @param buttonTxt alert上显示的按钮
     * @param pressCallback 点击按钮后的处理回调
     */
    static showAlertOneButton(content, title, buttonTxt, pressCallback) {
        Alert.alert(title, content, [{
            text: buttonTxt,
            onPress: pressCallback,
        }]);
    }

    /**
     * 弹出带两个按钮的alert
     * @param content alert的内容
     * @param title alert的标题
     * @param leftButtonTxt alert的第一个按钮
     * @param rightButtonTxt alert的第二个按钮
     * @param leftButtonCallback alert第一按钮响应事件
     * @param rightButtonCallback alert第二个按钮响应事件
     */
    static showAlertTwoButton(content, title, leftButtonTxt, leftButtonCallback, rightButtonTxt, rightButtonCallback) {
        Alert.alert(title, content, [{
            text: leftButtonTxt,
            onPress: leftButtonCallback,
        }, {
            text: rightButtonTxt,
            onPress: rightButtonCallback,
        }]);
    }

    /**
     * 显示三个按钮的alert
     * @param content
     * @param title
     * @param leftButtonTxt
     * @param leftButtonCallback
     * @param middleButtonTxt
     * @param middleButtonCallback
     * @param rightButtonTxt
     * @param rightButtonCallback
     */
    static showAlertThreeButton(content, title, leftButtonTxt, leftButtonCallback, middleButtonTxt, middleButtonCallback,rightButtonTxt,rightButtonCallback) {
        Alert.alert(title, content, [{
            text: leftButtonTxt,
            onPress: leftButtonCallback,
        }, {
            text: middleButtonTxt,
            onPress: middleButtonCallback,
        },{
            text:rightButtonTxt,
            onPress:rightButtonCallback,
        }]);
    }
}