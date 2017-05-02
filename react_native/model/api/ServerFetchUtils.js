/**
 * Created by songzhiyang on 2017/4/25.
 */
import React from 'react';

export default class ServerFetchUtils {

    static async fetchJsonData(url) {
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async fetchData(url) {
        try {
            let response = await fetch(url);
            return response.text();
        } catch (error) {
            console.log(error.message);
        }
    }
}