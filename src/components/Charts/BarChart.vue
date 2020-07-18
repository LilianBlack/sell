<template>
  <div ref="barChart" class="my-chart"></div>
</template>

<script>
import echarts from "echarts";

export default {
  watch: {
    //   观察传入的数据diliverOption的变化  一旦变化就出发内部的方法
    diliverOption: {
      //   immediate: true,
      //   深度监听
      deep: true,
      handler(newValue, oldValue) {
        this.configOption(newValue);
      }
    }
  },

  mounted() {
    this.configOption(this.diliverOption); //调用方法，配置option
  },

  //   接收父传过来的数据
  props: {
    diliverOption: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  methods: {
    //   配置文件    生成报表
    configOption(diliverOption) {
      // 获取节点看是否存在, 创建好才开始初始化
      if (this.$refs.barChart) {
        let myChart = echarts.init(this.$refs.barChart); //初始化容器
        //   配置
        let option = {
          color: ["#3398DB"],
          // 标题
          title: {
            text: diliverOption.title
          },

          //   工具提示
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },

          //   图例
          legend: {
            data: diliverOption.legend
          },

          //   绘图网格
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true //为true则 grid区域决定的是包括了坐标轴标签在内的所有内容所形成的矩形的位置
          },

          //   工具盒子
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },

          //   X轴
          xAxis: {
            type: "category",
            boundaryGap: true, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
            // boundaryGap 适用于柱状图   不然会出现标签溢出的问题
            //   折线图 需要将这个属性值改为 false   从Y轴开始绘制
            data: diliverOption.xAxis,
            axisTick: {
              alignWithLabel: true //在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐[刻度在变化]
            }
          },

          //   Y轴
          yAxis: {
            type: "value"
          },

          //   核心数据
          series: diliverOption.series
        };

        myChart.setOption(option); // 使用配置 生成报表
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-chart {
  height: 500px;
  background: #fff;
  margin-top: 30px;
}
</style>