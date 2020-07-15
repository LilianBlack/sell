import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import E404 from '@/views/404.vue'
import local from '@/utils/local'


// 解决重复跳转到自己警告让人难受的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};



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
        redirect: '/order/order-list',
        meta: { title: '订单管理' },
        children: [
            // 订单列表
            {
                path: '/order/order-list',
                name: "OrderList",
                component: () => import('@/views/Main/Order/OrderList.vue'),
                meta: { title: '订单列表' }
            },
            //    修改订单
            {
                path: '/order/order-edit',
                name: 'OrderEdit',
                component: () => import('@/views/Main/Order/OrderEdit.vue'),
                meta: { title: '修改订单' }
            }
        ]
    },
    // 商品管理
    {
        path: '/goods',
        component: Main,
        redirect: '/goods/goods-list',
        meta: { title: '商品管理' },
        children: [
            {
                path: '/goods/goods-add',
                component: () => import('@/views/Main/Goods/GoodsAdd.vue'),
                meta: { title: '添加商品' }
            },
            {
                path: '/goods/goods-cate',
                component: () => import('@/views/Main/Goods/GoodsCate.vue'),
                meta: { title: '商品分类' }
            },
            {
                path: '/goods/goods-list',
                component: () => import('@/views/Main/Goods/GoodsList.vue'),
                meta: { title: '商品列表' }
            }
        ]
    },
    // 店铺管理
    {
        path: '/shop',
        component: Main,
        meta: { title: '店铺管理' },
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
        redirect: '/accounts/accounts-list',
        meta: { title: '账户管理' },
        children: [
            // 账户列表
            {
                path: '/accounts/accounts-list',
                component: () => import('@/views/Main/Accounts/AccountsList.vue'),
                meta: { title: '账户列表' },
            },
            // 添加账号
            {
                path: '/accounts/account-add',
                component: () => import('@/views/Main/Accounts/AccountAdd.vue'),
                meta: { title: '添加账号' },
            },
            // 个人中心
            {
                path: '/accounts/personal',
                component: () => import('@/views/Main/Accounts/Personal.vue'),
                meta: { title: '个人中心' },
            },
            // 修改密码
            {
                path: '/accounts/pwd-modify',
                component: () => import('@/views/Main/Accounts/PwdModify.vue'),
                meta: { title: '修改密码' },
            }
        ]
    },
    // 销售统计
    {
        path: '/sale-statistics',
        component: Main,
        redirect: '/sale-statistics/goods-statistics',
        meta: { title: '销售统计' },
        children: [
            // 商品统计
            {
                path: '/sale-statistics/goods-statistics',
                component: () => import('@/views/Main/SaleStatistics/GoodsStatistics.vue'),
                meta: { title: '商品统计' },
            },
            // 订单统计
            {
                path: '/sale-statistics/order-statistics',
                component: () => import('@/views/Main/SaleStatistics/OrderStatistics.vue'),
                meta: { title: '订单统计' },
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


// 路由保卫
router.beforeEach((to, from, next) => {   //to, from是对象  有属性path
    let isLogin = local.get('t_k') ? true : false;  //通过查看本地是不是存在token 判断有没有登录
    if (isLogin) {   //登录了的
        next();
    } else {  //没有登陆
        if (to.path == '/login') { //要去登录--放行
            next();
        } else {   //不是去登录   重置到登录页
            next({ path: '/login' })  //传入登录页路径对象
        }

    }
})

export default router
