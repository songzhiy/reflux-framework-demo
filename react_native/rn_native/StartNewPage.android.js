/**
 * Created by songzhiyang on 2017/4/26.
 */

import {NativeModules} from 'react-native';

export default class StartNewPage {

    static startNewPage(className) {
        NativeModules.AndroidActivityStarter.startActivityFinishCurrent(className);
    }
}