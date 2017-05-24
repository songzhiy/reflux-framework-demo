/**
 * Created by songzhiyang on 2017/4/26.
 */

import {NativeModules} from 'react-native';

export default class StartNewPage {

    static startNewPage(className) {
        console.log(NativeModules.AndroidActivityStarter.test_constants);
        NativeModules.AndroidActivityStarter.startActivityFinishCurrent(className);
    }
}