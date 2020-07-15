<template>
  <el-col :span="3" class="aside">
    <!-- 头像 -->
    <div class="avatar">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <h5>外卖商家中心</h5>
    </div>

    <!-- 导航菜单 -->
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="currActiveFun"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <!-- 后台首页 -->
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 订单管理 -->
      <el-menu-item index="/order/order-list">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <!-- 商品管理 -->
      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
        <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
        <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
      </el-submenu>

      <!-- 店铺管理 -->
      <el-menu-item index="/shop">
        <i class="el-icon-menu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <!-- 账号管理 -->
      <el-submenu index="/accounts">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/accounts/accounts-list">账号列表</el-menu-item>
        <el-menu-item index="/accounts/account-add">添加账号</el-menu-item>
        <el-menu-item index="/accounts/pwd-modify">修改密码</el-menu-item>
        <el-menu-item index="/accounts/personal">个人中心</el-menu-item>
      </el-submenu>

      <!-- 销售统计 -->
      <el-submenu index="/sale-statistics">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/sale-statistics/goods-statistics">商品统计</el-menu-item>
        <el-menu-item index="/sale-statistics/order-statistics">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  components: {},
  methods: {},
  computed: {
    currActiveFun() {
      // 如果是订单编辑页面    则将订单列表的路由赋值给 导航的默认激活属性 default-active
      if (this.$route.path === "/order/order-edit") return "/order/order-list";
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped >
.aside {
  height: 100%;
  background: #304156;
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    h5 {
      margin-left: 10px;
      color: #fff;
    }
  }
  /deep/ .el-menu-vertical-demo {
    border-right: none;
    /deep/ .el-menu-item {
      min-width: 0;
    }
  }
}
</style>