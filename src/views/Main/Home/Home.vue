<template>
  <div class="main">
    <!-- 卡片 -->
    <div class="my-echarts-menu" @click="goToMyComp">
      <el-col class="my-echarts-item" :span="6" v-for="(v,i) in eTheme" :key="i">
        <Card :data="v"></Card>
      </el-col>
    </div>

    <!-- 调用线性报表组件 -->
    <LineChart :diliverOption="diliverOption" />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import { getHomeChartData } from "@/api/order";

export default {
  components: {
    LineChart,
    Card
  },

  data() {
    return {
      // 卡片数据  num 从后台传回的数据获得
      eTheme: [
        { className: "el-icon-document", theme: "总订单", num: "" },
        { className: "el-icon-coin", theme: "总销售额", num: "" },
        { className: "el-icon-tickets", theme: "今日订单数", num: "" },
        { className: "el-icon-trophy", theme: "今日销售额", num: "" }
      ],
      //   传给报表的数据
      diliverOption: {
        title: "自定义",
        legend: ["订单", "销售额"],
        xAxisData: [],
        series: []
      }
    };
  },
  methods: {
    goToMyComp() {
      this.$router.push("/use-my-comp");
    }
  },

  async mounted() {
    let {
      xData,
      orderData,
      amountData,
      //   下面是卡片数据
      totalOrder,
      totalAmount,
      todayOrder,
      totayAmount
    } = await getHomeChartData();

    let arr = [totalOrder, totalAmount, todayOrder, totayAmount];
    //   赋值给卡片
    this.eTheme.forEach((v, i) => {
      v.num = arr[i];
    });

    // 赋值给 传给子代 的数据
    this.diliverOption.xAxisData = xData;
    // 核心数据
    this.diliverOption.series = [
      {
        name: "订单",
        type: "line",
        data: orderData
      },
      {
        name: "销售额",
        type: "line",
        data: amountData
      }
    ];
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