import { Component,useEffect,useState } from 'react'
import { View, Button, Text,Map } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import BaseModel from './model';

const baseModel = new BaseModel();
const {indexBase} =baseModel
const appid='wx383b938a22e63de6'
const secret='&grant_type=authorization_code'
const App = () => {
    const [code,setCode] = useState('')

    useEffect(() => {
        console.log(baseModel,'baseModel');
    })

    const handleLogin = () => {
        wx.login().then((res)=>{
            console.log(res,'res');
            setCode(res.code)
            wx.request({
                url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + 'da1ce8dc14bee03387ba12316f4ee2df' + "&js_code=" + res.code + secret,
                method: 'POST',
                data: {
                  code: res.code //登录凭证code
                },
                header: {
                  'content-type': 'application/json;charset=UTF-8'
                },
                success: (res) => {
                    console.log(res,'login');
                    //获取到sessionKey,openid,unionid...
                }
            })
            
        })
    }
    const handleCheckLogin = () => {
        wx.checkSession({
            success () {
              //session_key 未过期，并且在本生命周期一直有效
              console.log('未过期');
            },
            fail () {
              // session_key 已经失效，需要重新执行登录流程
              //重新登录，然后更新数据库和本地缓存
              wx.login({
                  success: (res) => {
                      wx.request({
                      url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code",
                      method: 'POST',
                      data: {
                            code: code //登录凭证code
                      },
                      header: {
                        'content-type': 'application/json;charset=UTF-8'
                      },
                      success: (res) => {
                          console.log(res,'res');
                      }
                  })
                  },
                  fail:(err)=>{
                      console.log(err);
                  }
              })
            }
          })
          
    }
    return <>
        <div>首页</div>
        <Button onClick={() => { indexBase.getUserInfo() }}>发送请求</Button>
        <Button onClick={handleLogin}>登录</Button>
        <Button onClick={handleCheckLogin}>检查登录状态是否过期</Button>
        <Map onClick={()=>{console.log(1111);}} />
    </>
}

export default App