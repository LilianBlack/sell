<template>
  <div class="modifyPwd">
    <!-- 标题 -->
    <div class="title">修改密码</div>
    <el-divider></el-divider>
    <!-- 表单 -->
    <el-form
      :model="modifyForm"
      :rules="rules"
      status-icon
      ref="modifyForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 原密码 -->
      <el-form-item label="原密码" prop="pass">
        <el-input type="password" v-model="modifyForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model="modifyForm.newPass" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="modifyForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('modifyForm')">提交</el-button>
        <el-button @click="resetForm('modifyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modifyForm: {},
      rules: {}
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.modifyPwd {
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
    }
  }
}
</style>