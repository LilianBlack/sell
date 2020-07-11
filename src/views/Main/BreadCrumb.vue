<template>
  <div class="bread-crumb">
    <el-col :span="12">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="v in breadArr" :key="v.title" :to="{ path: v.path }">{{v.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="12" class="logined-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎你，唐美美
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>切换账号</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img :src="avatarImg" alt />
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarImg: require("@/assets/imgs/c2.jpg"),
      //   面包屑 数组
      breadArr: []
    };
  },
  created() {
    //   created期间 调用并执行计算面包屑函数
    this.calculateBreadCrumb();
  },
  watch: {
    //   监听地址变化   变化的时候就要计算一次面包屑数组
    "$route.path"() {
      this.calculateBreadCrumb();
    }
  },
  methods: {
    //   计算面包屑
    calculateBreadCrumb() {
      let arr = [{ title: "首页", path: "/home" }]; //初始值是首页
      //   遍历 $route.matched ， 将meta上面的 path和title放入数组中
      this.$route.matched.forEach(v => {
        // 确认 存在 meta 且 配置了 title 再进行存入
        if (v.meta && v.meta.title) {
          arr.push({
            title: v.meta.title,
            path: v.path
          });
        }
      });
      this.breadArr = arr; //将算出来的面包屑数组赋值给data中的
    }
  }
};
</script>

<style lang="less" scoped>
.bread-crumb {
  display: flex;
  justify-content: space-between;
  background: #fff;
  /deep/ .el-breadcrumb__inner {
    height: 50px;
    line-height: 50px;
    padding: 10px;
  }
  .logined-info {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 10px;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>