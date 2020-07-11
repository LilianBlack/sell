<template>
  <div class="echarts-item">
    <div class="my-icon" :class="data.className"></div>
    <div class="my-icon-text">
      <p>{{data.theme}}</p>
      <p>{{data.num}}</p>
    </div>
  </div>
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
  height: 70px;
  .my-icon {
    font-size: 70px;
    flex: 0 0 80px;
  }
  .my-icon-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p:first-child {
      color: #ccc;
    }
    p:last-child {
      font-weight: 700;
      margin-top: 0px;
    }
  }
}
</style>