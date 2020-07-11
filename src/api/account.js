/**
 * 接口层  ajax函数
 */

//  引入工具函数
import req from '@/utils/request'

// 登陆请求
export function checkLogin(params) {
    return req.post('/users/checkLogin', params);
}