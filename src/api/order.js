// 订单管理

import req from '@/utils/request'

// 获取订单和查询 都可以用这个接口
// 获取订单列表  【分页的时候参数只给两个   做查询则写上全部参数即可】
export function getOrderInfo(params) {
    return req.get('/order/list', params)
}

//修改数据
export function editOrderInfo(params) {
    return req.post('/order/edit ', params)
}


// 获取订单详情
export function getDetailInfo(params) {
    return req.get('/order/detail', params)
}


// 首页报表接口
export function getHomeChartData() {
    return req.get('/order/totaldata')
}

// 订单报表接口
export function getOrderChartData(params) {
    return req.get('/order/ordertotal', params)
}