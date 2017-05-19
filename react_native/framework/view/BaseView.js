/**
 * Created by songzhiyang on 2017/5/19.
 */

import {Component} from 'react';

export default class BaseView extends Component {

    store = null;
    actionName2Callback = new Map();

    constructor(props) {
        super(props);
        this._callbackDispatcher = this._callbackDispatcher.bind(this);
    }

    setStore(subStore) {
        this.store = subStore;
    }

    componentWillMount() {
        if (this.store !== null) {
            console.log('regist callback dispatcher');
            this.store.registUpdateViewCallBack(this._callbackDispatcher);
        }
    }

    componentWillUnmount() {
        if (this.store !== null) {
            console.log('unregist callback dispatcher');
            this.store.unregistUpdateViewCallBack(this._callbackDispatcher);
            this.store = null;
        }
    }

    /**
     * 所有回调的分发器
     * @private
     */
    _callbackDispatcher(data) {
        let currentActionName = data.currentActionName;
        if (this.actionName2Callback.has(currentActionName)) {
            let callback = this.actionName2Callback.get(currentActionName);
            callback(data);
        }
    }

    registCallback(actionName,callback) {
        console.log('registCallback -- ' + actionName);
        this.actionName2Callback.set(actionName,callback);
    }

    unregistCallback(actionName) {
        console.log('unregistCallback -- ' + actionName);
        this.actionName2Callback.delete(actionName);
    }

}