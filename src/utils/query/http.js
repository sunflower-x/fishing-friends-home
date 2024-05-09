import { curry } from 'ramda';
import { publicBasicsHttp } from './httpBase';

export default {
  get: curry((url, data, baseDataKeys = undefined, rest) => {
    const { showLoading = true, showToast = true } = rest || {};
    const requestObject = { url, data, method: 'GET', showLoading, showToast };
    return publicBasicsHttp(requestObject, baseDataKeys, rest);
  }),
  post: curry((url, data, baseDataKeys = undefined, rest) => {
    const { showLoading = true, showToast = true } = rest || {};
    const requestObject = { url, data, method: 'POST', showLoading, showToast };
    return publicBasicsHttp(requestObject, baseDataKeys, rest);
  }),
};
