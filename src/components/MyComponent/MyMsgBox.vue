<template>
  <div class="box" @click="closeByOther">
    <div class="content">
      <div class="header">
        <!-- 父传子 -->
        <span>{{title}}</span>

        <!-- 关闭---子传父 -->
        <span class="closeBox" @click="emitCloseMsg">X</span>
      </div>

      <div class="main">
        <!-- 匿名插槽   用在使用的时候自定义插入内容 -->
        <slot />
      </div>

      <div class="footer">
        <!-- 具名插槽 -->
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "标题"
    }
  },
  methods: {
    emitCloseMsg() {
      this.$emit("handleCloseBox");
    },

    closeByOther(e) {
      if (e.target.className == "box") {
        this.$emit("handleCloseBox");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 500px;
    min-height: 400px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .header {
      flex: 0 0 40px;
      border-bottom: 2px solid #ccc;
      display: flex;
      justify-content: space-between;
      .closeBox {
        font-size: 24px;
      }
    }
    .main {
      flex: 1;
    }
    .footer {
      flex: 0 0 40px;
      display: flex;
      border-top: 2px solid #ccc;
      padding: 10px 0;
    }
  }
}
</style>