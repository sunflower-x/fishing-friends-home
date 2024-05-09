import Taro from '@tarojs/taro';
import _ from '@/utils/lodash';

export const LocalKeys = {
  APP_KEY: 'appKey',
  USER_INFO: 'userInfo',
  ManageScope: 'manageScope',
  ScopeContent: 'scopeContent'
}

export const LocalDB = {
  cache: {},
  setStorage: (key, data) => {
    LocalDB.cache[key] = data;
    return Taro.setStorage({ key, data });
  },
  getStorage: (key) => {
    return Taro.getStorage({ key });
  },
  setStoreageSync: (key, data) => {
    LocalDB.cache[key] = data;
    return Taro.setStorageSync(key, data);
  },
  getStoreageSync: (key) => {
    if (!LocalDB.cache[key]) {
      LocalDB.cache[key] = Taro.getStorageSync(key);
    }
    return LocalDB.cache[key];
  },
  removeStorageSync: (key) => {
    LocalDB.cache[key] = undefined;
    return Taro.removeStorageSync(key);
  }
};

export default { LocalDB: LocalDB, LocalKeys:LocalKeys };
