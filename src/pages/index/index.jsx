import { Component, useEffect, useState } from "react";
import { View, Text, Map } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import BaseModel from "./model";
// import { Tabs, Tab, Swiper, SwiperItem,Image,Icon,Button  } from "@antmjs/vantui";
import { Tabs,Button,Image } from 'antd-mobile'
import { RightOutline,LocationFill } from 'antd-mobile-icons'
import "./index.scss";

const baseModel = new BaseModel();
const { indexBase } = baseModel;
const appid = "wx383b938a22e63de6";
const secret = "&grant_type=authorization_code";
const App = () => {
  // const [code, setCode] = useState("");
  const images = [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-6.jpeg',
  ]

  useEffect(() => {
    console.log(baseModel, "baseModel");
  });

  const handleLogin = () => {
    wx.login().then((res) => {
      console.log(res, "res");
      setCode(res.code);
      wx.request({
        url:
          "https://api.weixin.qq.com/sns/jscode2session?appid=" +
          appid +
          "&secret=" +
          "da1ce8dc14bee03387ba12316f4ee2df" +
          "&js_code=" +
          res.code +
          secret,
        method: "POST",
        data: {
          code: res.code, //登录凭证code
        },
        header: {
          "content-type": "application/json;charset=UTF-8",
        },
        success: (res) => {
          console.log(res, "login");
          //获取到sessionKey,openid,unionid...
        },
      });
    });
  };
  const handleCheckLogin = () => {
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("未过期");
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        //重新登录，然后更新数据库和本地缓存
        wx.login({
          success: (res) => {
            wx.request({
              url:
                "https://api.weixin.qq.com/sns/jscode2session?appid=" +
                appid +
                "&secret=" +
                secret +
                "&js_code=" +
                code +
                "&grant_type=authorization_code",
              method: "POST",
              data: {
                code: code, //登录凭证code
              },
              header: {
                "content-type": "application/json;charset=UTF-8",
              },
              success: (res) => {
                console.log(res, "res");
              },
            });
          },
          fail: (err) => {
            console.log(err);
          },
        });
      },
    });
  };
  return (
    <>
      <Tabs defaultActiveKey='vegetables'>
          <Tabs.Tab title='水果' key='fruits'>
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title='蔬菜' key='vegetables'>
            西红柿
          </Tabs.Tab>
          {/* <Tabs.Tab title='动物' key='animals'>
            蚂蚁
          </Tabs.Tab> */}
        </Tabs>
    </>
  );
};

export default App;
