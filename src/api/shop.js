/**
 * 接口层  ajax函数
 */

//  引入工具函数
import req from '@/utils/request'

export function getShopData() {
    return req.get('/shop/info')
}


// 店铺 修改接口
export function editShop(params) {
    return req.post('/shop/edit', params);
}