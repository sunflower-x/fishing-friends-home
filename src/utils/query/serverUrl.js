import Taro from '@tarojs/taro';

export function getServerHost() {
  return Taro.getStorageSync('app_server_host') || process.env.NODE_SERVER;
}

export function getServerBackRoute() {
  return Taro.getStorageSync('app_server_back_route') || null;
}

export function setServerHost(serverHost) {
  return Taro.setStorageSync('app_server_host', serverHost);
}

export function setServerBackRoute(backRoute) {
  return Taro.setStorageSync('app_server_back_route', backRoute);
}
