/**
 * 接口层  ajax函数
 */

//  引入工具函数
import req from '@/utils/request'

// 登陆请求 接口
export function checkLogin(params) {
    return req.post('/users/checkLogin', params);
}

// 增加用户的接口
export function addAcc(params) {
    return req.post('/users/add', params);
}

//获取用户列表
export function getAccountList(params) {
    return req.get('/users/list', params);
}

// 删除账户请求
export function delAccount(params) {
    return req.get('/users/del', params)
}

// 批量删除
export function batchDeleteAcc(params) {
    return req.get('/users/batchdel', params);
}

// 编辑用户信息
export function editAccountInfo(params) {
    return req.post('/users/edit', params);
}

// 个人中心  获取用户信息
export function getUserInfo() {
    return req.get('/users/info');
}

// 验证原密码
export function checkOldPwd(params) {
    return req.get('/users/checkoldpwd', params);
}

// 修改密码 
export function changePwd(params) {
    return req.post('/users/editpwd', params);
}


// // 上传头像
// export function uploadUserAvatar(params) {
//     return req.post('/users/avatar_upload', params)
// }


// 确认修改用户头像
export function editUserAvator(params) {
    return req.get('/users/avataredit', params);
}