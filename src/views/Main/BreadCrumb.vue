<template>
  <div class="bread-crumb">
    <el-col :span="12">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="v in breadArr" :key="v.title" :to="{ path: v.path }">{{v.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="12" class="logined-info">
      <!--  @command="handleCommand" 点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎你，
          <span>{{account}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img :src="imgUrl" alt />
    </el-col>
  </div>
</template>

<script>
import local from "@/utils/local";
import { getUserInfo } from "@/api/account";

export default {
  data() {
    return {
      //   面包屑 数组
      breadArr: [],
      account: "", //登录时的用户名,
      imgUrl: "" //头像的名字
    };
  },

  watch: {
    //   监听地址变化   变化的时候就要计算一次面包屑数组
    "$route.path"() {
      this.calculateBreadCrumb();
    }
  },

  methods: {
    //   获取用户数据，渲染头部用户信息
    // 获取数据
    async fetchData() {
      let res = await getUserInfo(); // 获取数据 赋值给user

      console.log("面包屑的", res);

      // 赋值渲染头像 和 账号
      this.imgUrl = res.imgUrl;
      this.account = res.account;

      // 把当前用户数据存入本地
      local.set("user", res);
    },

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
    },

    // 退出登录
    handleCommand(cmd) {
      //cmd自动传入
      if (cmd === "personal") {
        this.$router.push("/accounts/personal");
      } else if (cmd === "logout") {
        this.$message({ message: "答应我，下次还要来", type: "info" });
        local.clear();
        this.$router.push("/login");
        location.reload(); //每次退出就刷新一次   解决用户权限不刷新则维持上一个用户权限的问题
      }
    }
  },

  created() {
    //   获取用户数据，渲染头部用户信息
    this.fetchData();

    //   created期间 调用并执行计算面包屑函数
    this.calculateBreadCrumb();
    // this.account = local.get("account");

    this.$bus.$on("update_avatar", () => {
      this.fetchData();
    });
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
    width: 320px;
    height: 50px;
    display: flex;
    margin-right: 10px;
    justify-content: flex-end;
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