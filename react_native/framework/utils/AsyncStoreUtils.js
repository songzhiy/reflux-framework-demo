/**
 * Created by songzhiyang on 2017/4/25.
 */

import {
    AsyncStorage,
} from 'react-native';

export default class AsyncStoreUtils {
    static async setItem(key, data) {
        AsyncStorage.setItem(key, data);
    }

    static async getItem(key) {
        try {
            let data = await AsyncStorage.getItem(key);
            return data;
        } catch (error) {
            console.log(error.message);
            return null;
        }

    }

}