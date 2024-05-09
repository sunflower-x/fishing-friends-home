import { observable, action } from 'mobx';


class RoleModel {
  role = 'visitor'; //visitor staff manage
  userInfo= {};

  setRole = (payload= 'visitor') => {
    this.role = payload;
  };

  setUserInfo = (payload) => {
    this.userInfo = payload;
  };
}

export default RoleModel;
