<template>
  <el-col class="echarts-item" :span="5">
    <div class="my-icon" :class="data.className"></div>
    <div class="my-icon-text">
      <p>{{data.theme}}</p>
      <p>{{data.num}}</p>
    </div>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      //   currIcon: ""
    };
  },
  props: ["data"],
  mounted() {
    // this.currIcon = this.props.className;
  }
};
</script>

<style lang="less" scoped>
.echarts-item {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  height: 110px;
  .my-icon {
    font-size: 70px;
  }
  .my-icon-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p:first-child {
      color: #ccc;
    }
    p:last-child {
      font-weight: 700;
      margin-top: 10px;
    }
  }
}
</style>