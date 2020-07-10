<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" v-for="v in breadArr" :key="v">{{v}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="logined-info">
      <span>欢迎你，唐美美</span>
      <img :src="avatarImg" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarImg: require("@/assets/imgs/bb.jpg"),
      breadArr: ["首页", "账号管理", "添加账号"]
    };
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