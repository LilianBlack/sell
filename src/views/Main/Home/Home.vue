<template>
  <div class="main">
    <!-- 卡片 -->
    <div class="my-echarts-menu">
      <el-col class="my-echarts-item" :span="6" v-for="(v,i) in eTheme" :key="i">
        <Card :data="v"></Card>
      </el-col>
    </div>

    <!-- 主页 -->
    <Echarts />
  </div>
</template>

<script>
import Echarts from "./Echarts";
import Card from "@/components/Card.vue";

export default {
  components: {
    Echarts,
    Card
  },
  data() {
    return {
      eTheme: [
        { className: "el-icon-document", theme: "总订单", num: "1200" },
        { className: "el-icon-coin", theme: "总销售额", num: "104,200" },
        { className: "el-icon-tickets", theme: "今日订单数", num: "200" },
        { className: "el-icon-trophy", theme: "今日销售额", num: "1,200" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .my-echarts-menu {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .my-echarts-item {
      margin: 0 20px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }

    /deep/ .el-icon-document {
      color: cornflowerblue;
    }
    /deep/ .el-icon-coin {
      color: crimson;
    }
    /deep/ .el-icon-tickets {
      color: cornflowerblue;
    }
    /deep/ .el-icon-trophy {
      color: darkcyan;
    }
  }
}
</style>