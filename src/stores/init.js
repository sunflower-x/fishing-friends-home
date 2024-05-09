import { makeAutoObservable } from 'mobx';
import { getUserInfo } from '@/utils/userInfo';
import { LocalDB, LocalKeys } from '@/utils/storage';

import Remote from './remote/init';


class StaffHrModel {
  constructor() {
    makeAutoObservable(this);
  }
  // 管理范围权限 1:全部,2:所属组织,3:部门组织,4:无
  manageScope = 4; //visitor staff manage
  scopeContent;
  salPerPwd= '0';
  headerPicUrl;
  isAppInit = false;

  getUserExInfo = (payload = {}) => {
    Remote.getUserQywxConfig({ ...payload }, ['staffId'], false).then(res => {
      const { deptId: depId } = getUserInfo(['ext.otherInfos.deptId']);
      const { hrQywxAuthAtom, salPerPwd } = res.resultObject || {};
      const { manageScope = 4, scopeContent } = hrQywxAuthAtom || {};
      LocalDB.setStoreageSync(LocalKeys.ManageScope, manageScope);
      LocalDB.setStoreageSync(LocalKeys.ScopeContent, scopeContent);
      this.salPerPwd = salPerPwd;
      this.manageScope = manageScope;
      this.scopeContent = manageScope == 2 ? JSON.stringify([depId]) : scopeContent || '[]';
      this.isAppInit = true;
    });
  };
  setSalPerPwd = payload => {
    this.salPerPwd = payload ? '1' : '0';
  };
  setHeaderPicUrl = payload => {
    this.headerPicUrl = payload;
  };

  setAppInit = payload => {
    this.isAppInit = payload;
  };
}
const staffHrModel = new StaffHrModel();

export default staffHrModel;
