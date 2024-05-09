import { serverURLObj } from './env';

export const serverName = 'test'; //prod正式 test测试 gray灰度

const { NODE_SERVER_NOJSON, ...restServerUrlObj } = serverURLObj[serverName] || {};

module.exports = {
  env: {
    NODE_ENV: '"development"',
    ...restServerUrlObj,
    NODE_SERVER: process.env.TARO_ENV === 'h5' ? '"/api/"' : restServerUrlObj.NODE_SERVER
  },
  defineConstants: {},
  mini: {},
  h5: {
    publicPath: '/',
    devServer: {
      port: 3609,
      proxy: {
        '/api/': {
          target: NODE_SERVER_NOJSON + '/',
          pathRewrite: {
            '^/api/': '' // 所以带有/api/请求的链接一律替换为空并追加域名请求
          },
          changeOrigin: true
        }
      }
    }
  }
};
