import Taro from '@tarojs/taro';

import { qyWxLogin } from '@/utils/qwLogin';

var isFirst = false;

// 自定义拦截器 更改拦截参数 需要刷新页面
export const interceptor = function (chain) {
  const requestParams = chain.requestParams;
  const { method, data, url, showToast } = requestParams;

  // console.log(`请求参数：http ${method || 'GET'} --> ${url} data: `, data, requestParams);

  return chain
    .proceed(requestParams)
    .then((res) => {
      const { status, resultCode, message, exceptionMessage } = res.data;
      if (status == 'success') return res.data;
      return Promise.reject({ statusText: exceptionMessage || message || '失败', instatus: resultCode || '' });
    })
    .catch((err) => {
      const { status = '200', statusText = '', instatus = 'default', errMsg, ...restErr } = err || {};
      if (showToast) {
        Taro.showToast({ title: statusText || errMsg || '', icon: 'none', duration: 2000 });
        Taro.hideToast();
      }
      switch (status) {
        case '200': {
          //外层成功
          const errObj = { status, statusText, instatus, ...restErr };
          //内层后端返回错误处理
          switch (instatus) {
            case 'kickout':
              break;
            case 'loginfailure':
              if (!isFirst) {
                isFirst = true;
                qyWxLogin();
              }
              break;
            default:
              break;
          }
          return Promise.reject(errObj);
        }
        default:
          // 外层出错 直接处理
          return Promise.reject({ status, statusText, instatus, ...restErr });
      }
    });
};
