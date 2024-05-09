import { TaroAdapter } from "axios-taro-adapter";
import axios from "axios";
const API_URL = "https://api.xxxx.com/";

const http = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    adapter: TaroAdapter, // 添加这一行替换默认的适配器
});


// 请求拦截器
http.interceptors.request.use(
    (config) => {
        Taro.showLoading({
            title: '加载中',
            mask: true //使用蒙层
        })
        // let token = Taro.getStorageSync('token')
        // if (typeof token == undefined) {
        //     token = '';
        // }
        // config.headers = {
        //     'Content-Type': 'application/json;charset=utf-8',
        //     Authorization: token,
        // }
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        Taro.hideLoading()
        if (response.data.isError) {
            shwoErrorToast(response.data.error.message)
        } else {
            return response;
        }
    }, (error) => {
        if (error.response) {
            Taro.hideLoading()
            console.log('err', error)

            let res = error.response.data
            switch (res.code) {
                case 400:
                    shwoErrorToast(res.message || '非法请求')
                    break
                case 401:
                    shwoErrorToast('登录过期')// 可以尝试无感登陆或者跳转到登陆页
                    break
                case 403:
                    shwoErrorToast(res.message || '非法请求')
                    break
                case 404:
                    shwoErrorToast(res.message || '非法请求')
                    break
                case 500:
                case 502:
                    shwoErrorToast(res.message || '服务器开小差啦')
                    break
                default:
                    shwoErrorToast(res.message || res.statusText)
            }
        } else {
            console.log(error)
            shwoErrorToast('请检查网络连接状态')
        }
        return Promise.reject(error)
    }
)

export default http