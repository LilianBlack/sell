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
      <template v-for="menu in visibleMenu">
        <!-- 只有或者只显示一级菜单的 -->
        <el-menu-item
          v-if="menu.children && menu.children.length == 1 || menu.path=='/order'"
          :key="menu.path"
          :index="menu.children && menu.children.length && menu.children[0].path!=='' ? menu.children[0].path : menu.path "
        >
          <i :class="menu.meta.icon"></i>
          <span slot="title">{{menu.meta.title}}</span>
        </el-menu-item>

        <!-- 有二级菜单的 -->
        <el-submenu v-else :key="menu.path" :index="menu.path">
          <template slot="title">
            <i :class="menu.meta.icon"></i>
            <span>{{menu.meta.title}}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path"
          >{{item.meta.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-col>
</template>
    </el-menu>
  </el-col>
</template>

<script>
import local from "@/utils/local";

export default {
  data() {
    return {
      visibleMenu: []
    };
  },

  computed: {
    //   通过当前页面的地址激活对应地址的导航
    currActiveFun() {
      // 如果是订单编辑页面    则将订单列表的路由赋值给 导航的默认激活属性 default-active
      if (this.$route.path === "/order/order-edit") return "/order/order-list";
      //   if (this.$route.path.includes("home")) return "/home";
      return this.$route.path;
    }
  },

  created() {
    // 从本地取出当前用户角色对应的导航
    this.visibleMenu = local.get("visibleMenu");
    // console.log(this.visibleMenu);
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