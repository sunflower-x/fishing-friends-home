export const grobalServerName = ''; //prod正式 test测试 gray灰度 //这里会替换所有的

// const serverURL = 'https://webapp-test.m-test.dianplus.cn/'; // 观星测试环境
// const serverURL = 'https://mock.apifox.cn/m1/1507578-0-default/'; //mock
// const serverURL = 'https://webapp.m.dianplus.cn/'; // 正式环境
// const serverURL = 'https://webapp-pre.m.dianplus.cn/'; // 灰度环境

export const serverURLObj = {
  test: {
    // https://webapp-test.m-test.dianplus.cn
    NODE_SERVER: '"http://localhost:9090"',
    NODE_URL: '"https://hr-test.dianplus.cn/common/scanTest/index.html"',
    // NODE_URL_MID: '"module=-1"', //&backRoute=hr2.3&webRoute=hr2.3
    NODE_URL_MID: '"module=-1&webRoute=hr4.1.27&backRoute=hr4.1.27"',
    NODE_SERVER_NOJSON: 'https://webapp-test.m-test.dianplus.cn/',
    ESIGN_URL_PRE: '"brt7438909911"'
  },
  gray: {
    NODE_SERVER: '"http://localhost:9090"',
    NODE_URL: '"https://hr.dianplus.cn/common/scanGray/index.html"',
    NODE_URL_MID: '"module=-1&backRoute=vpc-gray&webRoute=vpc-gray"',
    NODE_SERVER_NOJSON: 'https://webapp.m.dianplus.cn/',
    ESIGN_URL_PRE: '"brt7438909911"'
  },
  prod: {
    NODE_SERVER: '"http://localhost:9090"',
    NODE_URL: '"https://hr.dianplus.cn/common/scan/index.html"',
    NODE_URL_MID: '"module=-1"',
    NODE_SERVER_NOJSON: 'https://webapp.m.dianplus.cn/',
    ESIGN_URL_PRE: '"brt7438909911"'
  },
  mock: {
    NODE_SERVER: '"https://mock.apifox.cn/m1/1507578-0-default/"',
    NODE_URL: '"https://hr-test.dianplus.cn/common/scanTest/index.html"',
    NODE_URL_MID: '"module=-1"',
    NODE_SERVER_NOJSON: 'https://mock.apifox.cn/m1/1507578-0-default/'
  }
};
