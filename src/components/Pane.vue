<template>
  <div class="pane">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <slot name="title">卡片名称</slot>
      </div>
      <slot name="content"></slot>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.pane {
  width: 100%;
  height: 100%;
  //   overflow-y: scroll;
}
</style>