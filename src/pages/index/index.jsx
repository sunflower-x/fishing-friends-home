import { Component, useEffect, useState } from "react";
import { View, Text, Map } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import BaseModel from "./model";
import { Tabs, Tab, Swiper, SwiperItem,Image,Icon  } from "@antmjs/vantui";
import "./index.scss";

const baseModel = new BaseModel();
const { indexBase } = baseModel;
const appid = "wx383b938a22e63de6";
const secret = "&grant_type=authorization_code";
const App = () => {
  const [code, setCode] = useState("");
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
     <Swiper
        height={200}
        paginationColor="#426543"
        autoPlay="3000"
        initPage={0}
        paginationVisible
      >
        {images.map((item, index) => (
          <SwiperItem key={`swiper#demo1${index}`}>
            <Image src={item} fit="cover" width="100%" height={`200px`} />
          </SwiperItem>
        ))}
      </Swiper>
      <Tabs  animated swipeable>
        <Tab title="钓点">
          <div className="tab-wrapper">
            <div className="card">
              {/* 头部 */}
              <div className="card-header">
                <div>标题</div>
                <div>钓点详情 <Icon name="arrow" size="14px" className="icon"/></div>
              </div>
              {/* 地点 */}
              <div className="card-location">
                <div><Icon name="location" size="18px" className="icon"/>江西省乐平市瑞昌市小雨村</div><span>(300m)</span>
              </div>
              {/* 内容 */}
              <div className="card-content">
                <div className="localtion-wrapper">
                  <div className="location-intro">这个位置非常不错，666，8888，939393991929929293333333333333333333333333333333333333333333333333333333333331111</div>
                  <div>发布人：</div>
                  <div>发布时间：</div>
                </div>
                <Image src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" style={{width:'100px',height:'100px'}} fit="cover" alt="图片" />
              </div>
              {/* 底部 */}
            </div>
          </div>
        </Tab>
        <Tab title="天气">
          <div className="tab-wrapper"></div>
        </Tab>
        <Tab title="科普">
          <div className="tab-wrapper"></div>
        </Tab>
        <Tab title="钓友">
          <div className="tab-wrapper"></div>
        </Tab>
      </Tabs>
      {/* <Button onClick={() => { indexBase.getUserInfo() }}>发送请求</Button>
        <Button onClick={handleLogin}>登录</Button>
        <Button onClick={handleCheckLogin}>检查登录状态是否过期</Button> */}
      {/* <Map
        style={{ width: "100%", height: "300px" }}
        scale={10}
        longitude={120.29977798461914}
        latitude={30.27289990234375}
        showLocation={true}
        showScale={true}
        onClick={() => {
          console.log(1111);
        }}
      /> */}
    </>
  );
};

export default App;
