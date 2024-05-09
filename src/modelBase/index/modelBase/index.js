// import remote from "../modelRemote/remote";
import Remote from '../modelRemote/remote';

import { makeAutoObservable } from 'mobx';

class ModelBase {
    constructor() {
        makeAutoObservable(this);
    }
    userInfo = null

    // 获取用户信息
    getUserInfo =  () => {
        console.log(Remote,'Remote');
        return Remote.getUserInfo({id:111}).then((res) => {
            console.log(res,'res');
        })
    }
}

export default ModelBase
