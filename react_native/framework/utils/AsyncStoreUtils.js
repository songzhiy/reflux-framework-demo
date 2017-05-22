/**
 * Created by songzhiyang on 2017/4/25.
 */

import {
    AsyncStorage,
} from 'react-native';

export default class AsyncStoreUtils {
    /**
     * 存储数据  类似于sp的set方法
     * @param key 存储的键
     * @param data 存储的对象
     * @returns {Promise.<void>}
     */
    static async setItem(key, data) {
        AsyncStorage.setItem(key, data);
    }

    /**
     * 获取key对应的存储数据  类似与sp的get方法
     * @param key 要查询的key
     * @returns {Promise.<*>}
     */
    static async getItem(key) {
        try {
            let data = await AsyncStorage.getItem(key);
            return data;
        } catch (error) {
            console.log(error.message);
            return null;
        }

    }

    /**
     * 删除某个key对应的数据
     * @param key
     * @returns {Promise.<void>}
     */
    static async removeItem(key) {
        AsyncStorage.removeItem(key);
    }

    /**
     * 获取所有的存储key
     * @returns {Promise}
     */
    static async getAllKeys() {
        return await AsyncStorage.getAllKeys();
    }

}