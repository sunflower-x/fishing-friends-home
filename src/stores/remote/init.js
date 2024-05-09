import http from '@/utils/query/http';

export default {
  getUserQywxConfig: (data = {}, baseKeys, ...rest) => {
    return http.post('hr/qywxauth/get_qywx_config', { ...data }, baseKeys, ...rest);
  }
};
