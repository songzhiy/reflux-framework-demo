/**
 * Created by songzhiyang on 2017/5/24.
 */

export default class DefaultConfig {

    static getDefaultConfig(request) {
        DefaultConfig.getDefaultHeaders(request);
        DefaultConfig.getDefaultTimeOut(request);
    }

    static getDefaultTimeOut(request) {
        request.timeout = 20000;
    }

    static getDefaultHeaders(request) {
        request.setRequestHeader('Accept','application/json');
        request.setRequestHeader('Content-Type','application/json');
    }
}