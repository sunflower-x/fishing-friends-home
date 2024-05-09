import { observable, action } from 'mobx';

class tabbarModel {
  tabbarShow = false;

  setTabbarVisible = (payload) => {
    this.tabbarShow = payload;
  };
}

export default tabbarModel;
