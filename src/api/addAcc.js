/*
*  新增用户的接口
*/

// 引入工具函数
import req from '@/utils/request';

export function addAcc(params) {
    return req.post('/users/add', params);
}