/**
 * 封装的 通用 的 工具函数
 */

//  引入 axios   qs
import axios from 'axios';
import qs from 'qs';
import local from '@/utils/local'
import { Message } from 'element-ui';

// 服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.timeout = 5000;   //超时


// 请求拦截[发送前的拦截]
axios.interceptors.request.use((config) => {
    // console.log('查看请求拦截', config);
    // 取出本地存的token   放入请求头
    let token = local.get('t_k') || '';
    // console.log(token)
    if (token) {
        // token存在---在请求头携带token
        config.headers.Authorization = token;
    }
    return config;
})

// 响应拦截
axios.interceptors.response.use((response) => {
    // console.log('查看响应拦截： ', response);
    // 在响应拦截器中弹窗
    if (response.data.code != undefined && response.data.msg != undefined) {
        let { code, msg } = response.data;
        if (code === 0) {
            Message({ type: 'success', message: msg })
        } else if (code === 1) {
            Message.error(msg);
        }
    }
    return response;
})


// 通用的get请求和post请求
export default {   //暴露一个对象
    // get 请求
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then((response) => {
                    resolve(response.data)   //成功就返回得到的数据
                })
                .catch((err) => {
                    reject(err)    //失败  返回失败信息
                })
        })
    },
    // post  请求
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then((response) => {
                    resolve(response.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}