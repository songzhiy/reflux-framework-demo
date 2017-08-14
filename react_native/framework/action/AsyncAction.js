/**
 * Created by songzhiyang on 2017/5/17.
 */

export default class AsyncAction {
    actionName = '';//单个的actionName没什么用
    sync = false;//是否是同步操作
    asyncResult = true;//是否开启默认的子action 默认包含completed/failed两个子action
    preEmit = function (data) {//在执行action之前的准备工作
        return data;
    };
    shouldEmit = function (data) {//是否真正执行action的判断操作，其参数为preEmit的返回值
        return true;
    };
    children = [];//用于创建子action，自定义子action时用到
}