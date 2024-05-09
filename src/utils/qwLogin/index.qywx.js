import Taro, { getCurrentInstance } from '@tarojs/taro';
import { LocalDB, LocalKeys } from '@/utils/storage';
import staffHrModel from '@/stores/init';
import http from '../query/http';
import { userResponse } from '../userInfo';

// qywx 小程序
export const qyWxLogin = () => {
  return new Promise((resolve, reject) => {
    Taro.qy.login({
      success: res => {
        if (res.code) {
          http
            .get('wechat/miniappqywx/dj_qywx_xcx_login', { xcxCode: res.code, xcxType: 'smarthr' }, undefined, false)
            .then(resp => {
              userResponse(resp.resultObject || {}, () => {
                resolve(LocalDB.getStoreageSync(LocalKeys.USER_INFO));
                staffHrModel.getUserExInfo();
                updateLoginStatus();
              });
            })
            .catch(() => {
              if (LocalDB.getStoreageSync(LocalKeys.APP_KEY)) {
                resolve(LocalDB.getStoreageSync(LocalKeys.USER_INFO));
                updateLoginStatus();
                return;
              }
              reject();
            });
        }
      },
      fail: () => {
        if (LocalDB.getStoreageSync(LocalKeys.APP_KEY)) {
          resolve(LocalDB.getStoreageSync(LocalKeys.USER_INFO));
          updateLoginStatus();
          return;
        }
        reject();
      }
    });
  });
};

const updateLoginStatus = () => {
  // console.log('已有key值');
};
