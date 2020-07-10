<template>
  <div class="my-echarts-box">
    <ul class="my-echarts-menu">
      <EchartsItem v-for="(v,i) in eTheme" :key="i" :data="v"></EchartsItem>
    </ul>
    <div ref="chart" class="my-echarts"></div>
  </div>
</template>

<script>
import EchartsItem from "./EchartsItem.vue";

export default {
  components: {
    EchartsItem
  },
  mounted() {
    // ounted生命周期函数中实例化echarts对象
    this.getEchartData();
  },
  data() {
    return {
      eTheme: [
        { className: "el-icon-document", theme: "总订单", num: "104,200" },
        { className: "el-icon-coin", theme: "总销售额", num: "104,200" },
        { className: "el-icon-tickets", theme: "今日订单数", num: "104,200" },
        { className: "el-icon-trophy", theme: "今日销售额", num: "104,200" }
      ]
    };
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          title: {
            text: "折线图堆叠"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: "联盟广告",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: "视频广告",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: "直接访问",
              type: "line",
              stack: "总量",
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: "搜索引擎",
              type: "line",
              stack: "总量",
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function() {
          myChart.resize();
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-echarts-menu {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  /deep/ .echarts-item {
    &:first-child {
      .my-icon {
        color: cornflowerblue;
      }
    }
    &:nth-child(2) {
      .my-icon {
        color: crimson;
      }
    }
    &:nth-child(3) {
      .my-icon {
        color: cornflowerblue;
      }
    }
    &:nth-child(4) {
      .my-icon {
        color: darkcyan;
      }
    }
  }
}
.my-echarts {
  background: #fff;
  height: 400px;
  margin-top: 40px;
}
</style>