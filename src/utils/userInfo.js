import { LocalDB, LocalKeys } from '@/utils/storage';
import staffHrModel from '@/stores/init';
import _ from '@/utils/lodash';

export const userResponse = (resultObject, success) => {
  const v = (object, key) => {
    const keys = (key || '').split('.');
    let value = object;
    for (const k of keys) {
      value = value && value[k];
    }
    return value;
  };
  const { key = '', atom = {}, auths = [], otherInfos = {}, ...restObj } = resultObject;
  // 保存登录凭证
  LocalDB.setStoreageSync(LocalKeys.APP_KEY, key);
  // 品牌ID
  const brandId = v(atom, 'entId') || '';
  // staffId
  const staffId = v(atom, 'staffId') || '';
  // userId
  const userId = v(atom, 'entAccountId') || '';
  // 员工手机号
  const mobilePhone = v(atom, 'mobilePhone') || '';
  // 员工头像
  const headerPicUrl = v(atom, 'headerPicUrl') || '';
  // 员工状态 1正常 -1停用
  const status = v(atom, 'status') || '';
  // 2为品牌商
  const opChannelLevel = v(atom, 'opChannelLevel') || '';
  // name
  const realName = v(atom, 'displayName') || '';
  // roleId
  const roleId = v(otherInfos, 'roleId') || '';
  // 店铺id
  const storageId = v(otherInfos, 'storageId') || '';
  const storageName = v(otherInfos, 'storageName') || '';
  const channelId = v(otherInfos, 'channelId') || '';
  // True-没有主系统付费记录，认为是试用的
  const isTempEnt = v(otherInfos, 'isTempEnt') === 'true';
  const user = {
    brandId,
    storageId,
    storageName,
    storeId: storageId,
    userId,
    mobilePhone,
    headerPicUrl,
    status,
    opChannelLevel,
    staffId,
    realName,
    roleId,
    channelId,
    isTempEnt,
    ...restObj,
    ext: {
      atom,
      auths,
      otherInfos
    }
  };
  // 保存用户信息
  LocalDB.setStoreageSync(LocalKeys.USER_INFO, user);
  staffHrModel.setHeaderPicUrl(user?.headerPicUrl);
  success(user);
};

export const getUserInfo = key => {
  const userInfo = LocalDB.getStoreageSync(LocalKeys.USER_INFO);
  if (!key) return userInfo;
  if (Array.isArray(key)) {
    return key.reduce((pre, cur) => {
      const curName = cur.split('.');
      return { ...pre, [curName[curName.length - 1]]: _.get(userInfo, cur) };
    }, {});
  } else {
    return _.get(userInfo, key);
  }
};

export const getMangeScope = (needChange = true, keyName = 'depIds') => {
  if (!needChange) return { [keyName]: staffHrModel.scopeContent || '[]' };
  if (![2, 3].includes(staffHrModel.manageScope)) return {};
  return { [keyName]: JSON.parse(staffHrModel.scopeContent || '[]').join(',') };
};
