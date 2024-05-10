import Taro from '@tarojs/taro';
import { LocalDB, LocalKeys } from '@/utils/storage';
import staffHrModel from '@/stores/init';

import _ from '../lodash'
import { escapeUndefined } from '../utils';
import { interceptor } from './interceptor';
import { getServerHost } from './serverUrl';
import { qyWxLogin } from '../qwLogin';

Taro.addInterceptor(interceptor);

let isAppIniting = false;
const queryStore = [];

export const publicBasicsHttp = (requestObject, baseDataKeys = [], isNeedLogin = true) => {
  const { url, data, method, showLoading, showToast } = requestObject;
  return new Promise(async (resolve, reject) => {
    const { staffId } = getBaseDataKeys(['staffId']);
    const { deptId } = getBaseDataKeys(['ext.otherInfos.deptId']);
    let config = {};
    config.data = escapeUndefined({ ...getBaseDataKeys(['ext.atom.entId', 'brandId'].concat(baseDataKeys)), ...data });
    config.method = method || 'GET';
    config.url = `${getServerHost()}${url}`;
    config.header = Object.assign({}, config.header, {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json;charset=UTF-8',
    });
    config.showToast = showToast;
    if (staffId) {
      Object.assign(config.header, { staffId });
    }
    if (deptId) {
      Object.assign(config.header, { depId: deptId });
    }
    // 灰度路由
    // Object.assign(config.header, { 'Back-Route': 'vpc-gray' });
    // Object.assign(config.header, { 'Back-Route': 'hr4.1.3' });
    
    if (isNeedLogin && !(isAppIniting || staffHrModel.isAppInit)) {
      isAppIniting = true;
      await qyWxLogin();
      isAppIniting = false;
    }

    if (isAppIniting && isNeedLogin) {
      queryStore.push({ config, resolve, reject });
      return;
    }

    if (isAppIniting && isNeedLogin) {
      queryStore.push({ config, resolve, reject });
      return;
    }

    if (showLoading) {
      Taro.hideLoading();
      Taro.showLoading({
        title: '加载中···',
        mask:true
      });
    }

    const TaroQuery = (configObj, resolveFun, rejectFun) => {
      const appkey = LocalDB.getStoreageSync(LocalKeys.APP_KEY);
      if (appkey) {
        Object.assign(configObj.header, { Appkey: appkey });
      }
      return Taro.request(configObj)
        .then((response) => {
          if (showLoading) Taro.hideLoading();
          resolveFun(response);
        })
        .catch((err) => {
          if (showLoading) Taro.hideLoading();
          if (err.instatus === '320002' && err.status == '200') return rejectFun(err);
          if(showToast){

            Taro.showToast({
              title: err.statusText,
              icon: 'none',
              duration: 1000
            })
            Taro.hideToast();
          }
          // if (err.status != 200) return;
          rejectFun(err);
        });
    };

    const loopQuery = (queryArr) => {
      if (!queryArr?.length) return;
      const item = queryArr.shift();
      TaroQuery(item.config, item.resolve, item.reject);
      loopQuery(queryArr);
    };

    TaroQuery(config, resolve, reject).then(() => {
      loopQuery(queryStore);
    });
  });
};

export const getBaseDataKeys = (baseDataKeys) => {
  if (!Array.isArray(baseDataKeys) || !baseDataKeys) return {};
  const userInfo = LocalDB.getStoreageSync(LocalKeys.USER_INFO);
  return baseDataKeys.reduce((pre, cur) => {
    switch (cur) {
      case 'opChannelId':
        cur = 'channelId';
        break;
      default:
        break;
    }
    const curName = cur?.split('.');
    return { ...pre, [curName[curName?.length - 1]]: _.get(userInfo, cur) || undefined };
  }, {});
};
