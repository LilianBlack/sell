<template>
  <div class="goods-statistics">
    <div class="search">
      <!-- 搜索表单 -->
      <el-form :inline="true" class="demo-form-inline" label-width="50">
        <el-form-item label="商品统计">
          <el-date-picker
            v-model="searchDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd  HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-button @click="search" type="primary">查询</el-button>
        <el-button @click="reset" type="success">重置</el-button>
      </el-form>
    </div>

    <!-- 使用组件 生成报表 -->
    <div>
      <LineChart :diliverOption="diliverOption" class="my-echarts"></LineChart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart.vue";
import { getOrderChartData } from "@/api/order";
import moment from "moment";

export default {
  components: { LineChart },

  data() {
    return {
      searchDate: [],
      diliverOption: {
        title: "商品统计",
        legend: ["订单金额"],
        xAxis: [],
        series: []
      }
    };
  },

  created() {
    //   生命周期函数中实例化echarts对象
    this.getEchartData();
  },
  methods: {
    // 提交搜索   发送ajax
    search() {
      this.getEchartData();
    },

    // 点击重置
    reset() {
      this.searchDate = [];
      this.getEchartData(); //清空后重新获取数据
    },

    async getEchartData() {
      console.log(this.searchDate);

      let { data } = await getOrderChartData({
        date:
          this.searchDate === null
            ? JSON.stringify([])
            : JSON.stringify(this.searchDate)
      });

      this.diliverOption.xAxis = data.map(v => {
        return moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
      });

      //   this.diliverOption.series = data.map(v => {
      //     return {
      //       name: "订单金额",
      //       type: "line", //图像类型
      //       data: v.orderAmount
      //     };
      //   });

      this.diliverOption.series = {
        name: "订单金额",
        type: "line", //图像类型
        data: data.map(v => v.orderAmount)
      };

      //   console.log(" this.diliverOption.xAxis", this.diliverOption.xAxis);
      console.log(" this.diliverOption.series ", this.diliverOption.series);
    }
  }
};
</script>

<style lang="less" scoped>
.goods-statistics {
  margin-top: 20px;
}
</style>