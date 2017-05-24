/**
 * Created by songzhiyang on 2017/5/24.
 */

import BaseUrl from "./BaseUrl";
import DefaultConfig from "./DefaultConfig";
export default class ServerFetchUtils {

    static fetchGetData(url,success,failed) {
        ServerFetchUtils.ajaxJsonData('GET',url,null,success,failed);
    }

    static fetchPostData(url,data,success,failed) {
        ServerFetchUtils.ajaxJsonData('POST',url,data,success,failed);
    }

    static ajaxJsonData(method, url, data = null, success, failed) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    success(JSON.parse(request.responseText));
                } else {
                    failed(request.responseText);
                }
            }
        };
        request.open(method,`${BaseUrl}${url}`,true);
        DefaultConfig.getDefaultConfig(request);
        data === null ? request.send() : request.send(JSON.stringify(data));
    }

}