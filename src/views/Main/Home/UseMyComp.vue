<template>
  <div>
    <h1>使用自己封装的 类 elementUI --- 弹出对话框组件</h1>
    <p>练习的技术：父传子 子传父 匿名插槽 具名插槽 作用域插槽</p>
    <el-button @click="isVisibleFlag = true" type="primary">点我弹出对话框</el-button>

    <!-- 使用组件 -->
    <MyMsgBox title="我是父亲use" v-show="isVisibleFlag" @handleCloseBox="isVisibleFlag =false">
      <span>在这里使用了比较简单的一个组件，还有更多复杂的</span>
      <p>采集一下菜鸡的信息</p>
      <el-form>
        <el-form-item label="姓名">
          <input type="text" />
        </el-form-item>

        <el-form-item label="电话">
          <input type="text" />
        </el-form-item>

        <el-form-item label="住址">
          <input type="text" />
        </el-form-item>

        <el-form-item label="爱好">
          <input type="text" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isVisibleFlag = false">取 消</el-button>
        <el-button type="primary" @click="isVisibleFlag = false">确 定</el-button>
      </span>
    </MyMsgBox>
  </div>
</template>

<script>
import MyMsgBox from "@/components/MyComponent/MyMsgBox.vue";
export default {
  components: {
    MyMsgBox
  },
  data() {
    return {
      isVisibleFlag: true
    };
  }
};
</script>

<style lang="less" scoped>
</style>