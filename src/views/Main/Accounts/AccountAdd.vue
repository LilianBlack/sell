<template>
  <div class="add-account">
    <Pane>
      <!-- 标题 -->
      <div slot="title" class="title">添加账户</div>
      <!-- 表单 -->
      <el-form
        slot="content"
        :model="addForm"
        :rules="rules"
        status-icon
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="addForm.account" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="addForm.userGroup" placeholder="请选择用户名">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";
import { REG_ACC, REG_PWD } from "@/utils/reg";
// 引入local
import local from "@/utils/local";
// 引入ajax请求函数
import { addAcc } from "@/api/account";

export default {
  components: {
    Pane
  },
  data() {
    const chechAcc = (rule, val, callback) => {
      if (!val) {
        callback(new Error("用户名不能为空"));
      } else if (!REG_ACC.test(val)) {
        callback(new Error("用户名格式：中文，英文字母和数字  长度 4-10"));
      } else {
        callback();
      }
    };
    const chechPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("密码不能为空"));
      } else if (!REG_PWD.test(val)) {
        callback(new Error("密码格式：字母数字  长度 3-12位"));
      } else {
        callback();
      }
    };
    return {
      addForm: { account: "", password: "", userGroup: "" },
      rules: {
        //   自定义验证
        account: { required: true, validator: chechAcc, trigger: "blur" },
        password: { required: true, validator: chechPwd, trigger: "blur" },
        //  内置空验证
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 通过前端验证  发送ajax
          await addAcc(this.addForm);
          this.$router.push("/");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.add-account {
  margin-top: 30px;
  /deep/ .el-form-item {
    width: 400px;
    /deep/ .el-select {
      width: 100%;
    }
  }
}
</style>