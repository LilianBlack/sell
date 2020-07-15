/*
*商品管理  api
*/
import req from '@/utils/request'

// 商品分类
// 获取分类
export function getGoodsCate(params) {
    return req.get('/goods/catelist', params);
}

// 修改分类
export function editCate(params) {
    return req.post('/goods/editcate', params);
}


// 删除分类
export function deleteCate(params) {
    return req.get('/goods/delcate', params);
}

// 增加分类
export function addCate(params) {
    return req.post('/goods/addcate', params);
}


//查询分类名称
export function getCateName() {
    return req.get('/goods/categories')
}


// 获取商品列表
export function getGoodsList(params) {
    return req.get('/goods/list', params);
}

// 删除商品
export function delGood(params) {
    return req.get('/goods/del', params);
}

// 修改商品
export function editGood(params) {
    return req.post('/goods/edit', params);
}

// 增加商品
export function addGood(params) {
    return req.post('/goods/add', params)
}