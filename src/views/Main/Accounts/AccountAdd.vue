<template>
  <div class="add-account">
    <!-- 标题 -->
    <div class="title">添加账户</div>
    <el-divider></el-divider>
    <!-- 表单 -->
    <el-form
      :model="addForm"
      :rules="rules"
      status-icon
      ref="addForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 账号 -->
      <el-form-item label="账号" prop="acc">
        <el-input type="text" v-model="addForm.acc" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="addForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-select v-model="addForm.region" placeholder="请选择用户名">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addForm: {},
      rules: {}
    };
  },
  methods: {
    submitForm() {},
    resetForm() {}
  }
};
</script>

<style lang="less" scoped>
.add-account {
  margin-top: 30px;
  background: #fff;
  .title {
    padding-left: 30px;
    padding-top: 24px;
  }
  .el-form {
    padding-bottom: 30px;
    .el-form-item {
      width: 400px;
      /deep/ .el-select {
        width: 100%;
      }
    }
  }
}
</style>