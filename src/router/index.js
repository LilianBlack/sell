import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import E404 from '@/views/404.vue'
import local from '@/utils/local'


// 解决重复跳转到自己 出现警告 的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};



Vue.use(VueRouter)


// 两个主入口的路由
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
            },
            {
                path: '/use-my-comp',
                component: () => import('@/views/Main/Home/UseMyComp.vue'),
            }
        ]
    }
]

// 所有路由
const allRoutes = [
    // 后台登录
    {
        path: '/login',
        component: Login,
        name: "Login",
        visible: false
    },
    // 后台页面
    // 首页
    {
        path: '/',
        component: Main,
        redirect: '/home',
        meta: { title: '网站首页', icon: 'el-icon-goods' },
        visible: true,
        children: [
            {
                path: '/home',
                meta: { title: '我的首页' },
                component: () => import('@/views/Main/Home/Home.vue'),
            }
        ]
    },
    // 订单管理
    {
        path: '/order',
        component: Main,
        redirect: '/order/order-list',
        meta: { title: '订单管理', icon: 'el-icon-document-copy' },
        visible: true,
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
        meta: { title: '商品管理', icon: 'el-icon-document-checked' },
        visible: true,
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
        meta: { title: '店铺管理', icon: 'el-icon-shopping-bag-1' },
        visible: true,
        children: [
            {
                path: '',
                meta: { title: '店铺管理' },
                component: () => import('@/views/Main/Shop/Shop.vue')
            }
        ]
    },
    // 账户管理
    {
        path: '/accounts',
        component: Main,
        redirect: '/accounts/accounts-list',
        meta: { title: '账户管理', role: ['super', 'normal'], icon: 'el-icon-user' },
        visible: true,
        children: [
            // 账户列表
            {
                path: '/accounts/accounts-list',
                component: () => import('@/views/Main/Accounts/AccountsList.vue'),
                meta: { title: '账户列表', role: ['super'] },
            },
            // 添加账号
            {
                path: '/accounts/account-add',
                component: () => import('@/views/Main/Accounts/AccountAdd.vue'),
                meta: { title: '添加账号', role: ['super'] },
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
        meta: { title: '销售统计', role: ['super'], icon: 'el-icon-moon-night' },
        visible: true,
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
        name: "E404",
        visible: false
    },
    {
        path: '*',
        component: E404,
        visible: false
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



/**
 * @description: 路由计算关键函数 通过meta的role属性  比对传入的role和路由对象，判断是否有权限
 * @param: route  传入的路由对象
 * @param: role   用户角色
 * @returns:  true 有权限   false没有权限  
 */
function hasPermission(route, role) {
    if (route.meta && route.meta.role) {
        return route.meta.role.includes(role);
    } else {
        return true;
    }
}

/**
 * @description  calcuRoutes   找出符合条件的路由 对于有子路由的-递归
 * @param:  所有的路由 allRoutes【注意： 一级路由对象内部可能还有对象】
 * @param:  当前用户的用户角色 role
 * @returns: 返回 存放了符合角色身份的路由的 数组
 */
function calcuRoutes(allRoutes, role) {
    let dynamicRoutes = allRoutes.filter((route) => {
        if (hasPermission(route, role)) {  // 返回true：有权限 父级路由没有配置role或者meta.role中包含了用户role
            if (route.children && route.children.length) {  // 存在子路由--递归
                route.children = calcuRoutes(route.children, role)   //重写子路由 
            }
            return true
        } else {  // 没有权限
            return false
        }
    })
    // console.log('dynamicRoutes', dynamicRoutes);
    return dynamicRoutes;
}

/**
 * @description:  判断 传入的一级路由是否在导航栏显示
 * @param:  route  传入的一级路由【只需要做一级，因为一个一级下的路由已经筛选过了】 
 * @returns:  true  显示   false 不显示
 */
function isVisible(route) {
    if (route.visible) {
        return true
    } else {
        return false
    }
}



/**
 * @description: 根据角色计算用户可见菜单
 * @param:  dynamicRoutes  计算出的动态路由
 * @param： role   用户角色
 * @returns  数组  存放的是该用户可见的菜单的 路由对象route
 */
function calcVisibleMenu(dynamicRoutes) {
    return dynamicRoutes.filter((route) => {
        if (isVisible(route)) {
            return true;
        } else {
            return false;
        }
    })
}


// 计算动态路由
export function createRoutes() {
    let role = local.get('role');  //拿出 role 值
    console.log('角色是: ', role);
    let dynamicRoutes = calcuRoutes(allRoutes, role)      //计算得出动态路由dynamicRoutes
    // console.log('计算得到的动态路由是： ', dynamicRoutes);

    // 挂载 动态路由
    router.addRoutes(dynamicRoutes) // router内置方法addRoutes

    // 得到对应角色可见的route对象
    let visibleMenu = calcVisibleMenu(dynamicRoutes);

    // 存入本地
    local.set('visibleMenu', visibleMenu);
}

createRoutes()

export default router
