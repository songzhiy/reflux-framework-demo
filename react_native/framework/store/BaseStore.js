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
        this.listenToMany(this.actions);
        return this.actions;
    }

    /**
     * 注册view层的callback
     * @param callback view层的回调函数
     */
    registUpdateViewCallBack(callback) {
        let unbindListener = this.listen(callback);
        this.unbindCallBackMap.set(callback,unbindListener);
        console.log(this.unbindCallBackMap);
    }

    /**
     * 解绑view层的callback
     * @param callback view层的回调函数
     */
    unregistUpdateViewCallBack(callback) {
        if (this.unbindCallBackMap !== null && this.unbindCallBackMap !== undefined) {
            if(this.unbindCallBackMap.has(callback)) {
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