<template>
  <div class="main">
    <!-- 侧边菜单栏    aside 占据了 3 份-->
    <Aside />

    <!-- 右侧内容部分占据 21 份 -->
    <el-col :span="21" class="content">
      <!-- 面包屑 -->
      <BreadCrumb />

      <div class="content-body">
        <!-- 路由出口---加载不同内容    -->
        <router-view></router-view>
      </div>
    </el-col>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
import BreadCrumb from "./BreadCrumb.vue";
export default {
  components: {
    Aside,
    BreadCrumb
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  background: #eee;
  .content {
    height: 100%;
    overflow-y: scroll;
    .content-body {
      padding: 0 40px;
      overflow-y: scroll;
    }
  }
}
</style>