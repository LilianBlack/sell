<template>
  <div class="main">
    <!-- 主页 -->
    <Echarts />
  </div>
</template>

<script>
import Echarts from "./Echarts";

export default {
  components: {
    Echarts
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
</style>