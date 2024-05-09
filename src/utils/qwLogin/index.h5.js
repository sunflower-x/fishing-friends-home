import Taro, { getCurrentInstance } from '@tarojs/taro';
import staffHrModel from '@/stores/init';

// qywx Jssdk
export const qyWxLogin = () => {
  staffHrModel.setAppInit(true);
  return;
  const initRouter = getCurrentInstance()?.router;
  const { auth_code, expires_in, state } = initRouter || {};
  setTimeout(() => {
    const search = new URL(location.href);
    const code = search.searchParams.get('code');
    console.log('searchCode', code);
    // Taro.showModal({
    //   content: `${code}`,
    // });
  }, 1000);
  console.log(auth_code, expires_in, state, initRouter, location, 'initRouter');
};
