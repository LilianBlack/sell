<template>
  <div class="modifyPwd">
    <Pane>
      <!-- 标题 -->
      <div slot="title" class="title">修改密码</div>
      <el-divider></el-divider>
      <!-- 表单 -->
      <el-form
        slot="content"
        :model="modifyForm"
        :rules="rules"
        status-icon
        ref="modifyForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 原密码 -->
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="text" v-model="modifyForm.oldPwd" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="modifyForm.newPwd" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="modifyForm.checkPwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('modifyForm')">提交</el-button>
          <el-button @click="resetForm('modifyForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";
import { REG_ACC, REG_PWD } from "@/utils/reg";
import { checkOldPwd, changePwd } from "@/api/account";
import local from "@/utils/local";

export default {
  components: {
    Pane
  },
  data() {
    //   验证原密码
    const validateOldPwd = async (rule, val, callback) => {
      if (!val) {
        callback(new Error("不能为空"));
      } else {
        let { code } = await checkOldPwd({
          oldPwd: val
        });
        if (code === "11") {
          callback(new Error("原密码不正确！"));
        } else if (code === "00") {
          callback();
        }
      }
    };
    // 验证新密码
    const checkNewPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("新密码不能为空"));
      } else if (!REG_PWD.test(val)) {
        callback(new Error("密码格式：字母数字  长度 3-12位"));
      } else {
        if (this.modifyForm.checkPwd) {
          this.$refs.modifyForm.validateField("checkPwd");
        }
        callback();
      }
    };
    // 验证新密码 一致性
    const checkCheckPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("新密码不能为空"));
      } else if (!REG_PWD.test(val)) {
        callback(new Error("密码格式：字母数字  长度 3-12位"));
      } else if (this.modifyForm.newPwd) {
        if (val != this.modifyForm.newPwd) {
          console.log("this.modifyForm.newPwd=== " + this.modifyForm.newPwd);
          callback(new Error("两次输入的新密码不一致"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      modifyForm: { oldPwd: "", newPwd: "", checkPwd: "" },
      rules: {
        oldPwd: { validator: validateOldPwd, trigger: "blur" },
        newPwd: { validator: checkNewPwd, trigger: "blur" },
        checkPwd: { validator: checkCheckPwd, trigger: "blur" }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.modifyForm.validate(async valid => {
        if (valid) {
          let { code } = await changePwd({
            newPwd: this.modifyForm.newPwd
          });
          console.log("code======", code);
          if (code === 0) {
            //   clear localstorage and redirect to /login
            local.clear();
            this.$router.push("/login");
          }
        } else {
          alert("不能提交修改请求");
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
.modifyPwd {
  margin-top: 30px;
  /deep/ .el-form-item {
    width: 400px;
  }
}
</style>