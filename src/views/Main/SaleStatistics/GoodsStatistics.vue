<template>
  <div class="goods-statistics">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item class="start-time" label="时间范围">
          <el-input prefix-icon="el-icon-alarm-clock" v-model="formInline.user" placeholder="开始日期"></el-input>
        </el-form-item>
        <el-form-item class="end-time" label="至">
          <el-input v-model="formInline.region" placeholder="结束日期"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div ref="chart" class="my-echarts"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      startTime: "",
      endTime: "",
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  mounted() {
    // ounted生命周期函数中实例化echarts对象
    this.getEchartData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
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
.goods-statistics {
  margin-top: 20px;
  /deep/ .el-form {
    /deep/ .el-form-item {
      label {
      }
    }
  }
  .my-echarts {
    background: #fff;
    height: 400px;
    margin-top: 40px;
  }
}
</style>