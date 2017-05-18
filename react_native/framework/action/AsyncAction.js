/**
 * Created by songzhiyang on 2017/5/17.
 */

export default class AsyncAction {
    sync = false;
    asyncResult = true;
    preEmit = function (data) {
        return data;
    };
    shouldEmit = function (data) {
        return true;
    };
}