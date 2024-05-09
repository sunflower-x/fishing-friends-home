export default defineAppConfig({
  pages: [
    'pages/index/index','pages/home/index','pages/explore/index'
  ],
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: '首页'
      },
      {
        pagePath: "pages/explore/index",
        text: '探索'
      },
      {
        pagePath: "pages/home/index",
        text: '我的'
      }

    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
