/**
 * Created by songzhiyang on 2017/4/25.
 */
import React from 'react';
import PostConfig from "./PostConfig";
import GetConfig from "./GetConfig";
import BaseUrl from "./BaseUrl";

export default class ServerFetch {

    static async fetchPostData(url, data) {
        let config = Object.assign(PostConfig,{
            body:Json.stringify(data),
        });
        try {
            let response = await fetch(`${BaseUrl}${url}`,config);
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async fetchGetData(url) {
        try {
            let response = await fetch(`${BaseUrl}${url}`,GetConfig);
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async fetchData(url) {
        try {
            let response = await fetch(url,GetConfig);
            return response.text();
        } catch (error) {
            console.log(error.message);
        }
    }
}