/**
 * Created by songzhiyang on 2017/5/17.
 */

import Reflux from 'reflux';

export default class BaseStore extends Reflux.Store {

    actions = null;
    unbindCallBackMap = new Map();

    constructor() {
        super();
    }

    /**
     * 创建一系列的actions
     * @param actions 要创建的action数组
     */
    createActions(actions) {
        this.actions = Reflux.createActions(actions);
        //todo 这里本来是想对回调函数进行一下二次封装  这里先暂时不处理 后面再考虑下
        // for (let i=0;i<actions.length;i++) {
        //     let values = Object.values(actions[i]);
        //     let action = values[0];//获取真正的action
        //     let actionValues = Object.keys(action);//获取action的属性key
        //     //寻找匹配的onxxxCompleted方法和onxxxFailed方法
        //     for (let j=0;j<actionValues.length;j++) {
        //         let actionValue = actionValues[j];
        //         if (/^on\w+Completed$/.test(actionValue)) {
        //             if(Reflect.has(action,actionValue)) {
        //                 let completeFunction = Reflect.get(action,actionValue);
        //                 Object.assign(this,{completeFunction});
        //             }
        //         }
        //     }
        //     this.listenTo(action,)
        // }
        this.listenToMany(this.actions);
        return this.actions;
    }

    /**
     * 注册view层的callback
     * @param callback view层的回调函数
     */
    registUpdateViewCallBack(callback) {
        let unbindListener = this.listen(callback);
        this.unbindCallBackMap.set(callback, unbindListener);
        console.log(this.unbindCallBackMap);
    }

    /**
     * 解绑view层的callback
     * @param callback view层的回调函数
     */
    unregistUpdateViewCallBack(callback) {
        if (this.unbindCallBackMap !== null && this.unbindCallBackMap !== undefined) {
            if (this.unbindCallBackMap.has(callback)) {
                let unbindListener = this.unbindCallBackMap.get(callback);
                if (unbindListener !== null && unbindListener !== undefined) {
                    unbindListener();
                }
                this.unbindCallBackMap.delete(callback);
                console.log(this.unbindCallBackMap);
            }
        }
    }
}