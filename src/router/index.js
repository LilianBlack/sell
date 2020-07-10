import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import E404 from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
    // 后台登录
    {
        path: '/login',
        component: Login,
        name: "Login"
    },
    // 后台页面
    // 首页
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/Main/Home/Home.vue'),
            }
        ]
    },
    // 订单管理
    {
        path: '/order',
        component: Main,
        children: [
            // 订单列表
            {
                path: '/order/order-list',
                component: () => import('@/views/Main/Order/OrderList.vue')
            },
            //    修改订单
            {
                path: '/order/order-edit',
                component: () => import('@/views/Main/Order/OrderEdit.vue')
            }
        ]
    },
    // 商品管理
    {
        path: '/goods',
        component: Main,
        children: [
            {
                path: '/goods/goods-add',
                component: () => import('@/views/Main/Goods/GoodsAdd.vue')
            },
            {
                path: '/goods/goods-cate',
                component: () => import('@/views/Main/Goods/GoodsCate.vue')
            },
            {
                path: '/goods/goods-list',
                component: () => import('@/views/Main/Goods/GoodsList.vue')
            }
        ]
    },
    // 店铺管理
    {
        path: '/shop',
        component: Main,
        children: [
            {
                path: '',
                component: () => import('@/views/Main/Shop/Shop.vue')
            }
        ]
    },
    // 账户管理
    {
        path: '/accounts',
        component: Main,
        children: [
            // 账户列表
            {
                path: '/accounts/accounts-list',
                component: () => import('@/views/Main/Accounts/AccountsList.vue')
            },
            // 添加账号
            {
                path: '/accounts/account-add',
                component: () => import('@/views/Main/Accounts/AccountAdd.vue')
            },
            // 个人中心
            {
                path: '/accounts/personal',
                component: () => import('@/views/Main/Accounts/Personal.vue')
            },
            // 修改密码
            {
                path: '/accounts/pwd-modify',
                component: () => import('@/views/Main/Accounts/PwdModify.vue')
            }
        ]
    },
    // 销售统计
    {
        path: '/sale-statistics',
        component: Main,
        children: [
            // 商品统计
            {
                path: '/sale-statistics/goods-statistics',
                component: () => import('@/views/Main/SaleStatistics/GoodsStatistics.vue')
            },
            // 订单统计
            {
                path: '/sale-statistics/order-statistics',
                component: () => import('@/views/Main/SaleStatistics/OrderStatistics.vue')
            }
        ]
    },
    {
        path: '/404',
        component: E404,
        name: "E404"
    },
    {
        path: '*',
        component: E404,
    }
]

const router = new VueRouter({
    routes
})

export default router
